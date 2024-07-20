import { resolve } from 'node:path';

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        __CWD__: JSON.stringify(process.cwd()),
    },
    resolve: {
        alias: {
            '@homework-task': resolve(__dirname, 'src'),
        },
    },
});
