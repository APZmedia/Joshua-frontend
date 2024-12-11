import { v4 as uuidv4 } from 'uuid';

export default class WorkflowService {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
    this.clientId = uuidv4(); // Generating a unique client ID
    this.socket = null;
  }

  // Queue a prompt by sending a POST request to the server
  async queuePrompt(prompt) {
    const payload = {
      prompt: prompt,
      client_id: this.clientId,
    };

    console.log('Queueing prompt:', payload);

    try {
      const response = await fetch(`http://${this.serverAddress}/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to queue prompt: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Queued prompt successfully:', data);
      return data.prompt_id;
    } catch (error) {
      console.error('Error in queueing prompt:', error);
      throw error;
    }
  }

  // WebSocket connection to track the execution of the prompt
  connectWebSocket(onMessage, onError) {
    const wsUrl = `ws://${this.serverAddress}/ws?clientId=${this.clientId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket:', wsUrl);
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message received:', message);

      if (onMessage) {
        onMessage(message);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) {
        onError(error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  // Fetch the prompt history by prompt ID
  async getHistory(promptId) {
    try {
      const response = await fetch(`http://${this.serverAddress}/history/${promptId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch history: ${response.statusText}`);
      }

      const history = await response.json();
      console.log('Fetched history:', history);
      return history[promptId];
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  }

  // Download the image by filename and other parameters
  async getImage(filename, subfolder, folderType) {
    const params = new URLSearchParams({
      filename: filename,
      subfolder: subfolder,
      type: folderType,
    }).toString();

    try {
      const response = await fetch(`http://${this.serverAddress}/view?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      console.log('Downloaded image:', imageUrl);
      return imageUrl; // You can use this URL in your app to display the image
    } catch (error) {
      console.error('Error downloading image:', error);
      throw error;
    }
  }

  // Upload a file (image) to the server
  async uploadFile(file, subfolder = '', overwrite = false) {
    const formData = new FormData();
    formData.append('image', file);
    
    if (overwrite) {
      formData.append('overwrite', 'true');
    }
    if (subfolder) {
      formData.append('subfolder', subfolder);
    }

    try {
      const response = await fetch(`http://${this.serverAddress}/upload/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Uploaded image:', data);

      let path = data.name;
      if (data.subfolder && data.subfolder !== '') {
        path = `${data.subfolder}/${data.name}`;
      }

      return path; // Return the path of the uploaded image
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Close the WebSocket connection
  closeWebSocket() {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket closed');
    }
  }
}
