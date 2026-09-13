module.exports = function(config) {
    config.set({
        // Base path para resolver patrones
        basePath: '',

        // Frameworks a utilizar
        frameworks: ['jasmine', 'webpack'],

        // Archivos a cargar
        files: [
            'src/**/*.test.jsx',
            'src/**/*.test.js'
        ],

        // Preprocesamiento de archivos
        preprocessors: {
            'src/**/*.test.jsx': ['webpack', 'coverage'],
            'src/**/*.test.js': ['webpack', 'coverage']
        },

        // Configuración de webpack
        webpack: {
            mode: 'development',
            module: {
                rules: [{
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {
                                        targets: {
                                            node: 'current'
                                        }
                                    }],
                                    ['@babel/preset-react', {
                                        runtime: 'automatic'
                                    }]
                                ]
                            }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|svg)$/,
                        type: 'asset/resource'
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx'],
                fallback: {
                    path: false,
                    fs: false
                }
            }
        },

        // Reporteros para los resultados
        reporters: ['progress', 'coverage'],

        // Configuración del reporte de cobertura
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcov', subdir: 'lcov' },
                { type: 'text-summary' }
            ]
        },

        // Puerto del servidor web
        port: 9876,

        // Habilitar colores en la salida
        colors: true,

        // Nivel de logging
        logLevel: config.LOG_INFO,

        // Observar cambios en archivos
        autoWatch: true,

        // Navegadores a utilizar
        browsers: ['jsdom'],

        // Modo de Integración Continua
        singleRun: false,

        // Nivel de concurrencia
        concurrency: Infinity
    })
};