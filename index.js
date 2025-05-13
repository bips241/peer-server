const { PeerServer } = require('peer');
const express = require('express');
const app = express();

// Setting the port dynamically or defaulting to 10000
const PORT = process.env.PORT || 10000;

// Basic route to check if the server is running
app.get('/', (req, res) => res.send("PeerJS Server Running"));

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Initialize the PeerJS server on the existing Express server
const peerServer = PeerServer({
  server,
  path: '/peerjs',  // This is the path for PeerJS connections
  // You can add more options if needed (like settings for authentication, etc.)
  debug: true,  // Enable debug mode to check what's going wrong if there are issues
  allow_discovery: true,  // Allow others to discover this PeerJS server
});

// Optional: Add logging to monitor any issues or errors
peerServer.on('connection', (client) => {
  console.log('New Peer connected:', client.id);
});

peerServer.on('disconnect', (client) => {
  console.log('Peer disconnected:', client.id);
});
