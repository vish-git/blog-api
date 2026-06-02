module.exports = function commentSocket(io) {
  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('joinPost', (postId) => {
      if (!postId) return;
      socket.join(postId);
      console.log(`Socket ${socket.id} joined post ${postId}`);
    });

    socket.on('leavePost', (postId) => {
      socket.leave(postId);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });
  });
};
