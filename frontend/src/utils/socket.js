import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
	transports: ["polling", "websocket"],
	autoConnect: false,
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionAttempts: 5,
	timeout: 10000,
	upgrade: true // Cho phép upgrade lên websocket sau
});

export default socket;
