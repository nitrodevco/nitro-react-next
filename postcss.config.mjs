export default {
    plugins: {
        '@tailwindcss/postcss': {},
        'postcss-url': {
            url: 'inline',
            maxSize: 10 * 1024
        }
    }
}
