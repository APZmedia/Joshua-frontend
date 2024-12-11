// comfyWorkflowEditor.js
export default class ComfyWorkflowEditor {
    constructor(workflowUrl) {
      this.workflowUrl = workflowUrl;
      this.workflow = null;
    }
  
    // Load the workflow from a JSON file or endpoint
    async loadWorkflow() {
      try {
        console.log(`Loading workflow from: ${this.workflowUrl}`);
        
        const response = await fetch(this.workflowUrl);
  
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`Failed to load workflow: ${response.statusText}`);
        }
  
        // Log the content type to check if we are getting a JSON response
        console.log('Response Content-Type:', response.headers.get('content-type'));
  
        // Attempt to parse the response as JSON
        const workflow = await response.json();
        this.workflow = workflow;
  
        // Log the JSON contents for debugging
        console.log('Workflow JSON contents:', workflow);
  
        return this.workflow;
      } catch (error) {
        console.error('Error loading workflow:', error);
        throw error; // Rethrow the error so it can be handled by the caller
      }
    }
  
    // Modify specific parts of the workflow based on input fields
    modifyWorkflow(fields) {
      if (!this.workflow) {
        throw new Error('Workflow has not been loaded.');
      }
  
      // Loop through the fields and modify the workflow dynamically
      for (const field of fields) {
        const { path, value } = field;
        const keys = path.split('.');
        let obj = this.workflow;
  
        // Traverse the workflow object to the path where the field should be updated
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
      }
  
      return this.workflow;
    }
  }
  