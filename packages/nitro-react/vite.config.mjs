import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default {
    plugins: [
        react({
            babel: {
                compact: false,
                plugins: [
                    ['babel-plugin-react-compiler', {
                        target: '19'
                    }]
                ]
            }
        })
    ],
    build: {
        target: 'esnext',
        assetsInlineLimit: 102400,
        chunkSizeWarningLimit: 200000,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash][extname]',
                manualChunks: id => {
                    if(id.includes('nitro-renderer')) return 'nitro-renderer';

                    if (id.includes('node_modules')) return 'vendor';
                }
            }
        }
    }
}
