from transformers import MarianMTModel, MarianTokenizer

def translate_en_to_ar(text: str) -> str:
    model_name = "Helsinki-NLP/opus-mt-en-ar"
    model = MarianMTModel.from_pretrained(model_name)
    tokenizer = MarianTokenizer.from_pretrained(model_name)

    # Translate the text
    translated = tokenizer.encode(text, return_tensors="pt")
    translated_text = model.generate(translated)
    return tokenizer.decode(translated_text[0], skip_special_tokens=True)
