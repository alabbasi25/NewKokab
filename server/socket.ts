import { Server, Socket } from 'socket.io';
import { getState, userStatus } from './state.ts';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('user:online', (userId) => {
      if (userStatus[userId]) {
        userStatus[userId].status = 'online';
        userStatus[userId].lastActive = Date.now();
        io.emit('user:status_update', userStatus);
      }
    });

    socket.on('chat:message', (msg) => {
      socket.broadcast.emit('chat:message', msg);
    });

    socket.on('chat:typing', (data) => {
      socket.broadcast.emit('chat:typing', data);
    });

    socket.on('chat:reaction', (data) => {
      socket.broadcast.emit('chat:reaction', data);
    });

    socket.on('sync:action', (data) => {
      socket.broadcast.emit('sync:event', data);
    });

    socket.on('system:nudge', (data) => {
      socket.broadcast.emit('system:nudge', data);
    });

    socket.on('system:haptic', (data) => {
      socket.broadcast.emit('system:haptic', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
