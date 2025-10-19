// Karma configuration
module.exports = function(config) {
  config.set({
    // Base path que será usado para resolver todos los patterns (ej: files, exclude)
    basePath: '',

    // Frameworks a usar
    // Disponibles frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],

    // Lista de archivos / patterns a cargar en el browser
    files: [
      // Setup file para configurar el entorno de testing
      'src/test/setup.js',
      // Todos los archivos de test
      'src/**/*.spec.js',
      'src/**/*.test.js'
    ],

    // Lista de archivos / patterns a excluir
    exclude: [
      'node_modules/**/*'
    ],

    // Preprocess de archivos antes de servirlos al browser
    // Disponibles preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'sourcemap']
    },

    // Configuración de Webpack para Karma
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { node: 'current' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    // Test results reporter a usar
    // Posibles valores: 'dots', 'progress'
    // Disponibles reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],

    // Puerto del servidor web
    port: 9876,

    // Habilitar / deshabilitar colores en la salida (reporters y logs)
    colors: true,

    // Nivel de logging
    // Posibles valores: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Habilitar / deshabilitar watching de archivos y ejecución de tests cuando los archivos cambien
    autoWatch: true,

    // Iniciar estos browsers
    // Disponibles browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['jsdom'],

    // Configuración de jsdom
    jsdomLauncher: {
      jsdom: {
        url: 'http://localhost/',
        options: {
          resources: 'usable',
          runScripts: 'dangerously'
        }
      }
    },

    // Continuous Integration mode
    // Si es true, Karma captura browsers, ejecuta tests y sale
    singleRun: false,

    // Concurrency level
    // Cuántos browsers pueden ser iniciados simultáneamente
    concurrency: Infinity,

    // Configuración de cliente
    client: {
      jasmine: {
        random: false,
        stopOnFailure: false
      }
    }
  })
}