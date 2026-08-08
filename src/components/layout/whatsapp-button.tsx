"use client";

import { motion, useReducedMotion } from "framer-motion";

import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15 3.6 13.5 3.6 12 3.6 7.4 7.4 3.6 12 3.6S20.4 7.4 20.4 12 16.6 20.2 12 20.2z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={buildWhatsAppLink(generalEnquiryMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow md:bottom-7 md:right-7"
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      {!reduce && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation:ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      )}
      <span className="relative">
        <WhatsAppGlyph />
      </span>
    </motion.a>
  );
}
