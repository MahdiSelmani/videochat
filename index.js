const express = require('express');
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
const path = require('path');

const __dirname1 = path.resolve() ;
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname1, '/client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname1, 'client/build/index.html'))
})
} else {
app.get('/', (req,res) => {
res.send('API is running successfully')
});
}





app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
