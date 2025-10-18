import asyncio
import edge_tts

async def main():
    tts = edge_tts.Communicate("Bom dia, senhor João, Calendario de consulta, pelo que foi analizado temos dias livres nas terças quartas e sexta-feira horários disponíveis.", "pt-BR-AntonioNeural")
    await tts.save("saida.mp3")

asyncio.run(main())