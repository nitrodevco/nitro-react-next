export default {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        'postcss-url': {
            url: 'inline',
            maxSize: 10 * 1024
        }
    }
}
