import asyncio
import edge_tts
import sys

async def main():
    texto = sys.argv[1] if len(sys.argv) > 1 else "Olá, este é o texto padrão"
    tts = edge_tts.Communicate(texto, "pt-BR-AntonioNeural")
    await tts.save("saida.mp3")

asyncio.run(main())