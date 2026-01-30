"use client"

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/#LatestNews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className="w-full border-b border-gray-100"
      style={{ backgroundColor: isHomePage ? "#FEFEFE" : "#FFFFFF" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="VanBusiness Logo"
            width={300}
            height={80}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative group"
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-[15px] font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Get A Quote Button */}
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-full border-2 border-cyan-400 bg-white px-7 py-2.5 text-[15px] font-semibold text-gray-800 transition-all duration-200 hover:bg-cyan-50 hover:border-cyan-500"
          >
            Get A Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <ul className="flex flex-col px-6 py-4 space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-[15px] font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6">
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center rounded-full border-2 border-cyan-400 bg-white px-7 py-3 text-[15px] font-semibold text-gray-800 transition-all duration-200 hover:bg-cyan-50 hover:border-cyan-500"
            >
              Get A Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
