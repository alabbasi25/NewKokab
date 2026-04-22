import { Server } from 'socket.io';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('sync-state', (data) => {
      socket.broadcast.emit('state-updated', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
