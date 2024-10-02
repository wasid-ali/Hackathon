from google.cloud import storage
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain_google_vertexai import VertexAI
import tempfile
import json


def csv_agent_function(request, headers):
    # Parse the request body
    try:
        request_json = request.get_json(silent=True)
        if not request_json or 'question' not in request_json:
            return json.dumps({"error": "No question provided in the request body"}), 400, headers
        question = request_json['question']
    except Exception as e:
        return json.dumps({"error": f"Error parsing request: {str(e)}"}), 400, headers

    # Set up GCS client
    storage_client = storage.Client()

    # Get the CSV file from GCS
    bucket_name = "consumer-dataset"
    blob_name = "smartphones 1.csv"
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    # Download the CSV content
    csv_content = blob.download_as_text()
    
    # Create a temporary file to store the CSV content
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.csv', delete=False) as temp_file:
        temp_file.write(csv_content)
        temp_file_path = temp_file.name

    # Initialize VertexAI
    llm = VertexAI(model_name="gemini-1.5-pro")

    # Create CSV agent
    agent = create_csv_agent(llm, temp_file_path, verbose=True, allow_dangerous_code=True)

    # Run the query
    try:
        result = agent.run(question)
        return json.dumps({"result": result}), 200, headers
    except Exception as e:
        return json.dumps({"error": f"Error processing question: {str(e)}"}), 500, headers
    finally:
        # Clean up the temporary file
        import os
        os.unlink(temp_file_path)