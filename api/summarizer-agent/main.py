from autogen import ConversableAgent, UserProxyAgent
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID, uuid4

app = FastAPI()

# CORS configuration: Allow requests from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# LLM configuration (replace with your specific model configuration)
llm_config = {
    "model": "llama3-70b-8192",  # Replace with your specific model name
    "api_key": "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",  # Replace with your actual API key
    "api_type": "groq"
}

# Store conversation history in memory (for simplicity in this example)
conversation_history = []

class UserInput(BaseModel):
    id: Optional[UUID] = None
    text: str
    summary: Optional[str] = None


# Endpoint to generate a summary based on the input text
@app.post("/summarize", response_model=UserInput)
async def generate_summary(input: UserInput):
    input.id = uuid4()

    # Add the new text to the conversation history
    conversation_history.append({"role": "user", "content": input.text})

    # Initialize UserProxyAgent
    proxy = UserProxyAgent(
        name="proxy",
        system_message=(
            "You are a summarizer AI. Your task is to take user input and generate a concise, accurate summary."
        ),
        llm_config=llm_config,
        code_execution_config=False,
        human_input_mode="NEVER"
    )

    # Initialize ConversableAgent
    generator = ConversableAgent(
        name="generator",
        system_message=(
            "You are a summarizer AI. Your task is to process the user's input and return a concise, coherent, and accurate summary."
        ),
        llm_config=llm_config,
        code_execution_config=False,
        human_input_mode="NEVER",
    )

    # Generate the summary based on the conversation history
    # Concatenate all previous conversations into the input message
    previous_conversation = "\n".join([f"{item['role']}: {item['content']}" for item in conversation_history])
    summary_response = generator.initiate_chat(proxy, message=previous_conversation, max_turns=1)

    # Add the AI's response to the conversation history
    conversation_history.append({"role": "system", "content": summary_response.chat_history[-1]["content"]})

    # Assign the response to the UserInput's summary field
    input.summary = summary_response.chat_history[-1]["content"]

    # Return the input with the summary
    return input


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8003)
