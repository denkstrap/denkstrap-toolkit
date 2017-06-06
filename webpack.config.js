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
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|test|__*\.js)/,
                    loader: 'babel-loader'
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
