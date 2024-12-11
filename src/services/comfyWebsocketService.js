export default class ComfyWebsocketService {
    constructor(serverAddress, clientId) {
      this.serverAddress = serverAddress;
      this.clientId = clientId || this.generateUUID();
      this.socket = null;
      this.reconnectTimeout = null;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.isConnected = false;
    }
  
    // Generate a unique client ID
    generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
      );
    }
  
    // Connect to WebSocket and handle messages
    connectWebSocket(onMessage, onError) {
      const wsUrl = `ws://${this.serverAddress}/ws?clientId=${this.clientId}`;
      console.log(`Connecting to WebSocket at ${wsUrl}...`);
  
      this.socket = new WebSocket(wsUrl);
  
      // WebSocket lifecycle event handlers
      this.socket.onopen = () => this.handleOpen();
      this.socket.onmessage = (event) => this.handleMessage(event, onMessage);
      this.socket.onerror = (error) => this.handleError(error, onError, onMessage);
      this.socket.onclose = () => this.handleClose(onMessage, onError);
    }
  
    // Handle WebSocket connection open
    handleOpen() {
      console.log('WebSocket connected successfully.');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    }
  
    // Handle incoming WebSocket messages
    handleMessage(event, onMessage) {
      const data = JSON.parse(event.data);
    
      // Log all received messages for inspection
      console.log('Raw WebSocket message received:', event.data);
    
      // Filter out 'crystools.monitor' messages
      if (data.type === 'crystools.monitor') {
        return; // Ignore system monitoring messages
      }
    
      // Log the message before passing it to onMessage
      console.log('WebSocket message processed:', data);
    
      onMessage(data); // Pass the relevant message back to the component
    }
    
  
    // Handle WebSocket errors
    handleError(error, onError, onMessage) {
      console.error('WebSocket error:', error);
  
      if (onError) {
        onError(error);
      }
  
      if (!this.isConnected) {
        console.warn('Connection failed. Attempting to reconnect...');
        this.reconnect(onMessage, onError); // Pass onMessage here
      }
    }
  
    // Handle WebSocket closure
    handleClose(onMessage, onError) {
      console.warn('WebSocket connection closed.');
      this.isConnected = false;
  
      this.reconnect(onMessage, onError); // Ensure onMessage is passed in here
    }
  
    // Reconnect WebSocket if disconnected
    reconnect(onMessage, onError) {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnect attempts reached. Giving up.');
        return; // Stop attempting to reconnect after max attempts
      }
  
      if (this.reconnectTimeout) {
        return; // Prevent multiple reconnection attempts
      }
  
      this.reconnectTimeout = setTimeout(() => {
        this.reconnectAttempts += 1;
        console.log(`Reconnecting to WebSocket... Attempt ${this.reconnectAttempts}`);
  
        this.connectWebSocket(onMessage, onError); // Pass onMessage here
        this.reconnectTimeout = null; // Reset timeout after reconnect attempt
      }, this.getReconnectDelay());
    }
  
    // Get delay for reconnect attempts
    getReconnectDelay() {
      return Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Max delay of 30 seconds
    }
  
    // Close WebSocket connection manually
    closeWebSocket() {
      if (this.socket) {
        this.socket.close();
        console.log('WebSocket connection closed manually.');
      }
    }
  }
  