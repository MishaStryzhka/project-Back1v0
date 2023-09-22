const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const { DB_HOST, PORT = 4000 } = process.env;
mongoose.set('strictQuery', true);

io.on('connection', (socket) => {
  // console.log('Socket.IO connection is ready');
  socket.on('send-message', (data) => {
    // console.log('message received', data);
    socket.broadcast.emit('message-from-server', data);
  });

  socket.on('disconnect', (socket) => {
    console.log('User left');
  });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');

    httpServer.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
