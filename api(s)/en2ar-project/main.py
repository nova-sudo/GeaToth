from fastapi import FastAPI, HTTPException, BackgroundTasks
from uuid import uuid4
from app.translation import TranslationService
from app.models.translation_request import TranslationRequest

app = FastAPI()

# In-memory storage for translation tasks
tasks = {}

translation_service = TranslationService()

@app.post("/translate/en2ar")
async def translate_en2ar(request: TranslationRequest, background_tasks: BackgroundTasks):
    task_id = str(uuid4())
    tasks[task_id] = {"status": "processing", "result": None}

    # Background processing
    background_tasks.add_task(translation_service.translate_text, request.text, task_id, tasks)
    return {"task_id": task_id}

@app.get("/translate/en2ar/status/{task_id}")
async def get_translation_status(task_id: str):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks[task_id]
