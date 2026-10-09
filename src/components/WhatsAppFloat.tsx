import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_MESSAGE, whatsappLink } from "@/lib/event";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition hover:scale-105 hover:bg-[#1ebe5b]"
    >
      <FaWhatsapp className="h-8 w-8" aria-hidden />
    </a>
  );
}
