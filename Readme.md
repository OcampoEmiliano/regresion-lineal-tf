# Modelo Secuencial Regresion Lineal

## Descripción

Esta aplicación web demuestra cómo entrenar un modelo de machine learning simple utilizando TensorFlow.js para aprender la relación lineal `y = 2x+6`. El modelo es entrenado con 9 valores de muestra comenzando desde x = -6 y, una vez entrenado, muestra el valor de las perdidas con cada epoch y luego predice con el modelo secuencial simple y los valores entrenados y

## Características

- Entrenamiento de un modelo neuronal secuencial con TensorFlow.js
- Visualización del proceso de entrenamiento a través de logs
- Predicción de valores Y a partir de valores X proporcionados por el usuario
- Interfaz minimalista enfocada en los resultados numéricos y grafico de perdidas

## Requisitos técnicos

- Navegador web moderno con soporte para JavaScript
- Conexión a internet (para cargar la biblioteca TensorFlow.js)


## Cómo usar la aplicación

1. **Abrir la aplicación**
   - Abre el archivo `index.html` en un navegador web moderno

2. **Entrenar el modelo**
   - Haz clic en el botón "Iniciar Entrenamiento"
   - Espera a que el entrenamiento se complete (350 épocas)
   - Verás un mensaje "¡El modelo está listo para ser utilizado!" cuando finalice

3. **Realizar predicciones**
   - Ingresa un valor numérico para X en el campo de entrada
   - Haz clic en "Predecir"
   - El resultado mostrará el valor predicho

## Detalles técnicos

### Modelo de machine learning

- El modelo utiliza TensorFlow.js para crear una red neuronal secuencial
- Arquitectura: Una capa densa (fully connected) con una unidad
- Función de pérdida: Mean Squared Error (MSE)
- Optimizador: Stochastic Gradient Descent (SGD)
- Número de épocas: 350

### Datos de entrenamiento

- Conjunto de datos: 9 muestras comenzando desde x = -6
- Forma de los tensores: [9, 1]
- Relación objetivo: y = 2x+6

## Ejemplos de uso

1. **Entrenamiento**:
   - Al hacer clic en "Iniciar Entrenamiento", el modelo aprende la relación lineal
   - Puedes ver el progreso y la reducción del error en el log de entrenamiento

2. **Predicción**:
   - Entrada: x = 10
   - Salida esperada: y = 26 (según la fórmula 2x+6)
   - El modelo entrenado debería predecir un valor muy cercano a 26

## Limitaciones

- El modelo está diseñado específicamente para aprender relaciones lineales
- La precisión puede variar según la inicialización aleatoria de los pesos
- Para funciones más complejas, se necesitaría una arquitectura de red más sofisticada

## Posibles mejoras

- Añadir visualización gráfica de los datos y predicciones
- Permitir al usuario definir su propia función para entrenar
- Implementar configuración ajustable para hiperparámetros (tasa de aprendizaje, épocas, etc.)
- Añadir más capas al modelo para aprender relaciones no lineales

## Créditos

Esta aplicación utiliza:
- [TensorFlow.js](https://www.tensorflow.org/js) - Biblioteca de machine learning para JavaScript