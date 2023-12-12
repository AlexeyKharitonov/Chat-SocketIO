export const users = [];
export const messages = [];
export const registerChatHandlers = (io, socket) => {
    console.log(`Пользователь подключен: ${socket.id}`);
    socket.on("new_user", (name) => {
        const user = { id: socket.id, name };
        users.push(user);
        console.log(`Новый пользователь: ${name}`);
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
    socket.on("disconnect", () => {
        console.log(`Пользователь отключен: ${socket.id}`);
        const index = users.findIndex((user) => user.id === socket.id);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });
};
//# sourceMappingURL=ChatController.js.map