"use client";

import Link from "next/link";
import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/96103366888"
      target="_blank"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition-transform hover:scale-110 hover:shadow-[0_14px_40px_rgba(37,211,102,0.65)]"
    >
      <Image
        src="/WhatsApp.svg.webp"
        alt="WhatsApp Icon"
        width={24}
        height={24}
      />
    </Link>
  );
}
