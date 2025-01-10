import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tsConfig from './tsconfig.json';

function getPathsFromTsConfig() {
    const aliases = {};

    for (const [key, value] of Object.entries(tsConfig.compilerOptions.paths))
    {
        const cleanKey = key.replace('/*', '');
        const cleanValue = value[0].replace('/*', '');
        const resolvedPath = resolve(__dirname, cleanValue);

        aliases[cleanKey] = resolvedPath;
    }

    return aliases;
}

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
        target: 'esnext',
        assetsInlineLimit: 102400,
        chunkSizeWarningLimit: 200000,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash][extname]',
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
