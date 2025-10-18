import whisper

model = whisper.load_model("base")

result = model.transcribe("saida.mp3")

print("Texto reconhecido:", result["text"])
