module.exports = {
    entry: './js/entry.js',
    output: {
        path: __dirname + '/app/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
