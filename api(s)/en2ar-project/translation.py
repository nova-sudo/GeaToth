from transformers import MarianMTModel, MarianTokenizer

class TranslationService:
    def __init__(self):
        model_name = "Helsinki-NLP/opus-mt-en-ar"
        self.tokenizer = MarianTokenizer.from_pretrained(model_name)
        self.model = MarianMTModel.from_pretrained(model_name)

    def translate_text(self, text: str, task_id: str, task_store: dict):
        try:
            translated_tokens = self.model.generate(**self.tokenizer(text, return_tensors="pt", padding=True))
            translated_text = self.tokenizer.decode(translated_tokens[0], skip_special_tokens=True)
            task_store[task_id]["status"] = "completed"
            task_store[task_id]["result"] = translated_text
        except Exception as e:
            task_store[task_id]["status"] = "failed"
            task_store[task_id]["result"] = str(e)
