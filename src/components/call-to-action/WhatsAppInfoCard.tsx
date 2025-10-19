"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";

export default function WhatsAppInfoCard() {
  const phoneNumber = "5569992808641"; // número com DDI e DDD
  const message = encodeURIComponent(
    "Olá! Gostaria de agendar minha consulta pelo UBS Conecta."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Agende sua consulta pelo WhatsApp
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed">
        O UBS Conecta facilita seu agendamento! Clique abaixo para falar direto
        com a equipe e marcar sua consulta rapidamente, sem filas nem espera.
      </p>

      <Button className=" bg-[#0A8271] hover:bg-[#09483F] text-white hover:border-[#09483F] border-[#0A8271] mt-4 border-2 cursor-pointer">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
          <FaWhatsapp size={28} />
          Falar no WhatsApp
        </a>
      </Button>
    </div>
  );
}
