
const socketio = require("socket.io");

let dal, app, server, io;
const configure = (obj) => {
	dal = obj.dal;
	app = obj.app;
	server = require("http").createServer(app);
	io = socketio(server);

	io.on("connection", (socket) => {
		socket.on("old room", (room) => {
			socket.leave(room);
		});
		socket.on("new room", (room) => {
			socket.join(room);
		});

		socket.on("message", (msg) => {
			//console.log(msg);
		});
		socket.on("chatMessage", (msg) => {
			dal.createMessage(msg.channel_id, msg.author_id, msg.body)
				.then(msgInDb => {
					//console.log(msgInDb);
					io.to(msg.channel_id).emit("message", msgInDb);
				})
				.catch(console.error);
		});
	});
	return {server, io};
};


module.exports = configure;
