export const users = [];
export const messages = [];
export const registerChatHandlers = (io, socket) => {
    socket.on("new_user", (user) => {
        const userWithSocketId = { ...user, socketId: socket.id };
        users.push(userWithSocketId);
        io.emit("update_users", users);
    });
    socket.on("chat message", (message) => {
        socket.broadcast.emit("chat message", message);
    });
    socket.on("send_message", (content) => {
        const user = users.find((user) => user.id === socket.id);
        if (user) {
            const message = {
                sender: user,
                content,
                timestamp: new Date(),
            };
            messages.push(message);
            io.emit("new_message", message);
        }
    });
    socket.on("user_logout", (nickName) => {
        const index = users.findIndex((user) => user.nickName === nickName);
        if (index !== -1) {
            users.splice(index, 1);
            io.emit("update_users", users);
        }
    });
};
//# sourceMappingURL=ChatController.js.map