import 'dotenv/config';
import { defineConfig } from 'vite';
import chatHandler from './api/chat.js';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  plugins: [
    {
      name: 'api-chat-middleware',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {};
              } catch {
                req.body = {};
              }

              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return res;
              };

              try {
                await chatHandler(req, res);
              } catch (err) {
                console.error('Error en /api/chat local:', err);
                if (!res.writableEnded) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Error interno en el servidor.' }));
                }
              }
            });
          } else if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.statusCode = 204;
            res.end();
          } else {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Método no permitido. Solo se acepta POST.' }));
          }
        });
      },
    },
  ],
});
