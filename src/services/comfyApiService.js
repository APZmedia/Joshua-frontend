// comfyApiService.js
export default class APIService {
    constructor(serverAddress) {
      this.serverAddress = serverAddress;
    }
  
    // Queue a modified workflow
    async queueWorkflow(workflow, clientId) {
      const data = {
        prompt: workflow, // The workflow object to be queued
        client_id: clientId,
      };
  
      try {
        const response = await fetch(`http://${this.serverAddress}/prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response from server:', errorText);
          throw new Error(`Failed to queue workflow: ${response.statusText} - ${errorText}`);
        }
  
        const result = await response.json();
        console.log('Workflow successfully queued:', result);
        return result;
  
      } catch (error) {
        console.error('Error in queueWorkflow:', error);
        throw error;
      }
    }
  
    // Upload an image
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await fetch(`http://${this.serverAddress}/upload/image`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response from server:', errorText);
          throw new Error(`Failed to upload image: ${response.statusText} - ${errorText}`);
        }
  
        const result = await response.json();
        console.log('Image successfully uploaded:', result);
        return result;
  
      } catch (error) {
        console.error('Error in uploadImage:', error);
        throw error;
      }
    }
  }
  