import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

import { getState, updateState } from './server/state.ts';
import { setupSocketHandlers } from './server/socket.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" }
  });

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/state', (req, res) => {
    res.json(getState());
  });

  app.post('/api/state', (req, res) => {
    const newState = updateState(req.body);
    res.json(newState);
  });

  const APP_URL = process.env.APP_URL || 'http://localhost:3000';

  app.get('/api/auth/google/url', (req, res) => {
    const params = new URLSearchParams({
      client_id: process.env.VITE_GOOGLE_CLIENT_ID || 'dummy_id',
      redirect_uri: `${APP_URL}/auth/callback`,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read',
      access_type: 'offline',
      prompt: 'consent'
    });
    res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  });

  app.get('/api/fitness/sync', (req, res) => {
    const steps = 6000 + Math.floor(Math.random() * 4000);
    const calories = 300 + Math.floor(Math.random() * 400);
    res.json({ steps, calories });
  });

  setupSocketHandlers(io);

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Kokab Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
