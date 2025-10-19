"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloatingButton() {
  // Número e mensagem configuráveis
  const phoneNumber = "5569992808641"; // coloque o número com DDI e DDD
  const message = encodeURIComponent(
    "Olá! Gostaria de agendar uma consulta pelo UBS Conecta."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
