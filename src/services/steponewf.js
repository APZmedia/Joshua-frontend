class StepOneWF {
    constructor(serverAddress) {
      this.serverAddress = serverAddress;
      this.clientId = this.generateUUID();
      this.socket = null;
    }
  
    // UUID Generator
    generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
      );
    }
  
    // WebSocket connection
    connectWebSocket(onMessage, onError) {
      const wsUrl = `ws://${this.serverAddress}/ws?clientId=${this.clientId}`;
      this.socket = new WebSocket(wsUrl);
  
      this.socket.onopen = () => {
        console.log('Connected to WebSocket:', wsUrl);
      };
  
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        onMessage(data);
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (onError) onError(error);
      };
    }
  
    // Close WebSocket connection
    closeWebSocket() {
      if (this.socket) {
        this.socket.close();
        console.log('WebSocket connection closed');
      }
    }
  
    // Queue a prompt/workflow
    async queuePrompt(prompt) {
      const data = {
        prompt,
        client_id: this.clientId,
      };
  
      const response = await fetch(`http://${this.serverAddress}/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to queue prompt: ${response.statusText}`);
      }
  
      return await response.json(); // Return the response, possibly including the prompt_id
    }
  
    // Retrieve history for a specific prompt
    async getHistory(promptId) {
      const response = await fetch(`http://${this.serverAddress}/history/${promptId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch history for prompt ID ${promptId}: ${response.statusText}`);
      }
  
      return await response.json();
    }
  
    // Retrieve an image based on filename and subfolder
    async getImage(filename, subfolder) {
      const params = new URLSearchParams({ filename, subfolder, type: 'output' });
      const response = await fetch(`http://${this.serverAddress}/view?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      return URL.createObjectURL(blob); // Convert the blob to a URL for rendering
    }
  
    // Upload an image to the server
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch(`http://${this.serverAddress}/upload/image`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }
  
      return await response.json(); // Return the response of the uploaded image
    }
  
    // Upload a mask and merge with an existing image
    async uploadMask(file, imageFilename) {
      const formData = new FormData();
      formData.append('mask', file);
      formData.append('imageFilename', imageFilename);
  
      const response = await fetch(`http://${this.serverAddress}/upload/mask`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to upload mask: ${response.statusText}`);
      }
  
      return await response.json(); // Return the response of the mask upload
    }
  }
  
  export default StepOneWF;
  