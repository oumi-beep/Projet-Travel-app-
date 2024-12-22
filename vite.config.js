import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: "/travel_app_projet/",
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
    },
    preview: {
        proxy: {
            '/api': {
                target: 'http://localhost:2001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
});
