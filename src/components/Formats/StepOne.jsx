import React, { useEffect, useState } from "react";
import ComfyWorkflowEditor from "../../services/comfyWorkflowEditor"; // Updated path to comfyWorkflowEditor.js
import ComfyWebsocketService from "../../services/comfyWebsocketService"; // Updated path to comfyWebsocketService.js
import ComfyApiService from "../../services/comfyApiService"; // Updated path to comfyApiService.js
import { useNavigate } from "react-router-dom"; // For navigation between steps
import { motion } from "framer-motion";

const StepOne = () => {
  const [workflowEditor] = useState(
    new ComfyWorkflowEditor("/wf/mvp-car-step01-analysis.json")
  ); // Load the workflow from JSON
  const [webSocketService] = useState(
    new ComfyWebsocketService("127.0.0.1:8188")
  );
  const [apiService] = useState(new ComfyApiService("127.0.0.1:8188"));
  const [prompt, setPrompt] = useState("");
  const [resultAnalysis, setResultAnalysis] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false); // New state variable
  const navigate = useNavigate(); // For navigating to the next step

  useEffect(() => {
    // Connect to WebSocket on mount
    webSocketService.connectWebSocket(
      (message) => {
        console.log("Processing WebSocket message:", message);

        // Handle specific workflow-related messages (e.g., executed)
        if (
          message.type === "executed" &&
          message.data &&
          message.data.output?.string
        ) {
          setIsProcessing(false);
          const analysisText = message.data.output.string[0]; // Extract the analysis string
          setResultAnalysis(analysisText); // Set the resulting analysis in the state
          console.log("Execution complete. Resulting Analysis:", analysisText);

          // Move to the next step after processing (pass the resultAnalysis)
          navigate("/format/carousel/step/2", {
            state: { resultAnalysis: analysisText },
          });
        } else {
          console.log("Unhandled message type or data:", message);
        }
      },
      (error) => {
        console.error("WebSocket error:", error);
        setIsProcessing(false);
      }
    );

    return () => {
      webSocketService.closeWebSocket();
    };
  }, [webSocketService, navigate]);

  const handleAnalyze = async () => {
    setLoading(true); // Set loading to true when button is pressed
    setIsProcessing(true);
    
    try {
      // Load the workflow from the workflow editor
      const workflow = await workflowEditor.loadWorkflow();
      // Modify the workflow with the prompt entered by the user
      const modifiedWorkflow = workflowEditor.modifyWorkflow([
        { path: "1.inputs.String", value: prompt }, // Update prompt text
        { path: "3.inputs.seed", value: Math.floor(Math.random() * 9999999999) }, // Add random seed
      ]);
      await apiService.queueWorkflow(modifiedWorkflow, webSocketService.clientId);
      console.log('Modified workflow sent for processing:', modifiedWorkflow);
    } catch (error) {
      console.error("Error during analysis:", error);
      setIsProcessing(false);
    } finally {
      setLoading(false); // Set loading to false when analysis is complete
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Input News</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter the news content for analysis..."
        className="border p-2 w-full h-40 mb-4"
      />

      <button
        onClick={handleAnalyze}
        className={`bg-blue-500 text-white py-2 px-4 mt-4 ${
          isProcessing ? "opacity-50" : ""
        }`}
        disabled={isProcessing || !prompt}
      >
        {isProcessing ? "Analyzing..." : "Analyze"}
      </button>

      {loading ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold"
        >
          Loading...
        </motion.p>
      ) : (
        <p>{resultAnalysis}</p>
      )}
      {resultAnalysis && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Resulting Analysis:</h3>
          <pre className="whitespace-pre-wrap border p-4">{resultAnalysis}</pre>
        </div>
      )}
    </div>
  );
};

export default StepOne;
