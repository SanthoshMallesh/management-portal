module.exports = {
    Plugin: [
        require('autoprefixer'),
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-css-variables'),
        require('cssnano'),
    ]
}