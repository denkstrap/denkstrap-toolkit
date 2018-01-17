const path = require( 'path' );
const glob = require( 'glob' );

module.exports = (config) => {
    return {
        entry: () => {
            return new Promise((resolve) => {
                glob(
                    '**/*.js',
                    {
                        cwd: './src'
                    },
                    ( err, files ) => {
                        const entry = {};
                        files.forEach((file) => {
                            entry[file.match(/^(.+)\.js$/)[1]] = './src/' + file;
                        });
                        resolve(entry);
                    }
                );
            });
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|test|__*\.js)/,
                    use: [
                        "babel-loader"//,
                        // "eslint-loader"
                    ]
                }
            ]
        },
        output: {
            path: path.resolve( __dirname, 'dist' ),
            filename: '[name].js',
            libraryTarget: 'umd'
        }
    };
};


// TODO
// not working : message wds disconnect in browser console
// module.exports = (config) => {
//     return {
//         // This schema works with webpack
//         // https://webpack.js.org/configuration/entry-context/#entry
//         // but is not validating with web-dev-server
//         // message occuring: Webpack has been initialised using a configuration object that
//         // does not match the API schema.
//
//         // entry: () => {
//         //     return new Promise((resolve) => {
//         //         glob(
//         //             '**/*.js',
//         //             {
//         //                 cwd: './src'
//         //             },
//         //             ( err, files ) => {
//         //                 const entry = {};
//         //                 files.forEach((file) => {
//         //                     entry[file.match(/^(.+)\.js$/)[1]] = './src/' + file;
//         //                 });
//         //                 resolve(entry);
//         //             }
//         //         );
//         //     });
//         // },
//
//         entry: {
//             'validation.service': './src/validation/validation.service.js',
//             'validation.service.ext': './src/validation/validation.service.ext.js',
//             'cache.service': './src/cache/cache.service.js',
//             'formValidation': './src/validation/formValidation/formValidation.js'
//         },
//
//         devServer: {
//             // The webpack-dev-server will serve the files in the current directory, unless you configure a specific content base.
//             contentBase: path.join(__dirname, "/"),
//             inline: true,
//             port: 8080
//         },
//
//         module: {
//             rules: [
//                 {
//                     test: /\.js$/,
//                     exclude: /(node_modules|test|__*\.js)/,
//                     use: [
//                         "babel-loader"//,
//                         // "eslint-loader"
//                     ]
//                 }
//             ]
//         },
//         output: {
//             path: path.resolve( __dirname, 'dist' ),
//             // This modified bundle is served from memory at the relative path specified in publicPath
//             publicPath: "/dist/validation/formValidation",
//             filename: '[name].js',
//             libraryTarget: 'umd'
//         }
//     };
// };