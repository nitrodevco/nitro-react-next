import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default {
    plugins: [
        react({
            babel: {
                plugins: [
                    ['babel-plugin-react-compiler', {
                        target: '19'
                    }]
                ]
            }
        })
    ],
    build: {
        assetsInlineLimit: 102400,
        chunkSizeWarningLimit: 200000,
        rollupOptions: {
            output: {
                assetFileNames: 'src/assets/[name].[ext]',
                manualChunks: id => {
                    if (id.includes('node_modules')) {
                        if (id.includes('@nitrots/nitro-renderer')) return 'nitro-renderer';

                        return 'vendor';
                    }
                }
            }
        }
    }
}
