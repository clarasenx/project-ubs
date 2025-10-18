import speech_recognition as sr

r = sr.Recognizer()

with sr.AudioFile("saida.wav") as source:
    audio = r.record(source)

# Variável que vai guardar o texto transcrito
texto_transcrito = ""

try:
    texto_transcrito = r.recognize_google(audio, language="pt-BR")
    print("Texto reconhecido:", texto_transcrito)
except sr.UnknownValueError:
    print("Não entendeu o áudio")
except sr.RequestError as e:
    print("Erro na API:", e)

print("Texto transcrito:", texto_transcrito)
