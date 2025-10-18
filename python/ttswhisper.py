import whisper

model = whisper.load_model("base")

result = model.transcribe("teste.mp3")

print("Texto reconhecido:", result["text"])
