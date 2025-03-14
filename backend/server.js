const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3001; 
const mongoose = require("mongoose");
const {initializeSocket} = require("./socket");

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); 
});