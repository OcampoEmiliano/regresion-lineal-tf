        // Variables globales
        let modelo;
        let valoresPerdida = [];
        let perdidaInicial = 0;
        let perdidaFinal = 0;
        
        // Función para entrenar el modelo
        async function entrenarModelo() {
            // Mostrar mensaje de entrenamiento
            document.getElementById('estadoModelo').textContent = 'Estado: Entrenando...';
            document.getElementById('resultados').innerHTML = '';
            
            // Limpiar datos de pérdida anteriores
            valoresPerdida = [];
            
            // Convertir datos a tensores
            const xs = tf.tensor2d([-6, -5, -4, -3, -2, -1, 0, 1, 2], [9, 1]);
            const ys = tf.tensor2d([-6 * 2 + 6, -5 * 2 + 6, -4 * 2 + 6, -3 * 2 + 6, -2 * 2 + 6, -1 * 2 + 6, 0 * 2 + 6, 1 * 2 + 6, 2 * 2 + 6], [9, 1]);

            
            // Crear modelo secuencial
            modelo = tf.sequential();
            modelo.add(tf.layers.dense({units: 1, inputShape: [1]}));
            
            // Compilar modelo
            modelo.compile({
                loss: 'meanSquaredError',
                optimizer: 'sgd'
            });
            
            // Entrenar modelo
            await modelo.fit(xs, ys, {
                epochs: 350,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        valoresPerdida.push(logs.loss);
                        if (epoch === 0) {
                            perdidaInicial = logs.loss;
                        }
                        if (epoch === 349) {
                            perdidaFinal = logs.loss;
                        }
                    }
                }
            });
            
            // Actualizar gráfica de pérdida
            actualizarGraficaPerdida();
            
            // Mostrar estado del modelo
            document.getElementById('estadoModelo').textContent = 'Estado: Modelo entrenado correctamente';
            
            // Habilitar botón de predicción
            document.getElementById('predecirBtn').disabled = false;
        }
        
        // Función para actualizar la gráfica de pérdida
        function actualizarGraficaPerdida() {
            // Crear array de epochs
            const epochs = Array.from({length: valoresPerdida.length}, (_, i) => i);
            
            // Configurar datos para la gráfica
            const trace = {
                x: epochs,
                y: valoresPerdida,
                type: 'scatter',
                mode: 'lines',
                name: 'Pérdida (Loss)',
                line: {
                    color: '#4ecdc4',
                    width: 2
                }
            };
            
            // Configurar layout
            const layout = {
                title: '',
                xaxis: {
                    title: 'Época',
                    gridcolor: '#e5e5e5'
                },
                yaxis: {
                    title: 'Valor de Pérdida',
                    gridcolor: '#e5e5e5'
                },
                plot_bgcolor: 'white',
                paper_bgcolor: 'white',
                margin: {
                    l: 50,
                    r: 10,
                    b: 50,
                    t: 10,
                    pad: 4
                }
            };
            
            // Crear gráfica
            Plotly.newPlot('perdidaChart', [trace], layout);
            
            // Calcular reducción de pérdida
            const reduccionPorcentaje = ((perdidaInicial - perdidaFinal) / perdidaInicial * 100).toFixed(2);
            
            // Mostrar información de pérdida
            document.getElementById('infoLoss').innerHTML = `
                <p>Pérdida inicial: ${perdidaInicial.toFixed(4)}, Pérdida final: ${perdidaFinal.toFixed(4)} (Reducción: ${reduccionPorcentaje}%)</p>
            `;
        }
        
        // Función para hacer predicciones
        async function predecir() {
            // Verificar si el modelo está entrenado
            if (!modelo) {
                alert('Primero debes entrenar el modelo');
                return;
            }
            
            // Obtener valores de entrada
            const inputValues = document.getElementById('valoresX').value;
            const valores = inputValues.split(',').map(val => parseFloat(val.trim()));
            
            // Verificar valores
            if (valores.some(isNaN)) {
                alert('Por favor ingresa valores numéricos válidos separados por comas');
                return;
            }
            
            // Realizar predicción
            const inputTensor = tf.tensor1d(valores);
            const predicciones = modelo.predict(inputTensor);
            const resultados = await predicciones.data();
            
            // Mostrar resultados
            let resultadosHTML = '<ul>';
            valores.forEach((val, index) => {
                resultadosHTML += `<li class="result-item">Para x = ${val}: y = ${resultados[index].toFixed(2)}</li>`;
            });
            resultadosHTML += '</ul>';
            
            document.getElementById('resultados').innerHTML = resultadosHTML;
        }
        
        // Agregar eventos a los botones
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('entrenarBtn').addEventListener('click', entrenarModelo);
            document.getElementById('predecirBtn').addEventListener('click', predecir);
        });
