"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  User,
  FileText,
  HardDrive,
  Mail,
  Menu,
  ChevronDown,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircleDashed,
  Image as ImageIcon
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/_context/themeContext";

const SideNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      {/* Mobile Menu Button */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden bg-transparent blur-sm w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-10`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        ></div>
      )}
      <button
        className={`fixed top-4 right-4 z-50 p-2 rounded-md lg:hidden transition-all duration-300 ${
          theme === "light"
            ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
            : "bg-gray-800 text-gray-100 hover:bg-gray-700"
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 transition-all duration-300 transform border-r-1 border-sky-600
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40
        ${
          theme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-whit"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center py-6">
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border-4 mb-4 ${
                theme === "light" ? "border-gray-300" : "border-gray-700"
              }`}
            >
              <Image
                src="/images/Profile.jpg"
                alt="Profile"
                height={100}
                width={100}
                className="w-full h-full object-cover"
              />
            </div>
            <Link href="/" className="text-center">
              <h1 className="text-xl font-bold">Tunmise Falodun</h1>
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`mb-4 flex items-center gap-2 px-4 py-2 rounded-full 
              transition-all duration-300 shadow-md border
              ${
                theme === "light"
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300 border-gray-300"
                  : "bg-gray-800 text-gray-100 hover:bg-gray-700 border-gray-700"
              }`}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {[
                { href: "/", icon: Home, text: "Home", active: true },
                { href: "/about", icon: User, text: "About" },
                { href: "/resume", icon: FileText, text: "Resume" },
                { href: "/portfolio", icon: ImageIcon, text: "Portfolio" },
                { href: "/services", icon: HardDrive, text: "Services" },
                { href: "/contact", icon: Mail, text: "Contact" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                        item.active
                          ? theme === "light"
                            ? "bg-sky-600/10 text-sky-600"
                            : "bg-sky-600/10 text-sky-600"
                          : theme === "light"
                          ? "text-gray-600 hover:bg-sky-600/10 hover:text-sky-600"
                          : "text-gray-400 hover:bg-sky-600/10 hover:text-sky-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span>{item.text}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${
                    theme === "light"
                      ? "text-gray-600 hover:bg-sky-600/10 hover:text-sky-600"
                      : "text-gray-400 hover:bg-sky-600/10 hover:text-sky-600"
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center">
                    <Menu className="h-5 w-5 mr-3" />
                    <span>Pages</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <ul
                    className={`ml-8 mt-2 space-y-2 pl-2 border-l border-sky-600 ${
                      theme === "light" ? "border-gray-300" : "border-gray-700"
                    }`}
                  >
                    {["Skills", "Projects", "Blog", "Experiences"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            href={`/${item.toLowerCase()}`}
                            className={`block px-3 py-2 transition-colors rounded-md ${
                              theme === "light"
                                ? "text-gray-600 hover:bg-sky-600/10 hover:text-sky-600"
                                : "text-gray-400 hover:bg-sky-600/10 hover:text-sky-600"
                            }`}
                            onClick={() =>
                              setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div
            className={`flex justify-center space-x-4 py-4  absolute bottom-0 right-0 left-0 bg-transparent backdrop-blur-2xl ${
              theme === "light" ? "border-gray-300" : "border-gray-800"
            }`}
          >
            <Link
              href="https://x.com/faloeUltimate/"
              className={`transition-colors rounded-full p-2 ${
                theme === "light"
                  ? "text-gray-600 hover:text-sky-600 hover:bg-sky-600/10"
                  : "text-gray-400 hover:text-sky-600 hover:bg-sky-600/10"
              }`}
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://web.facebook.com/faloeultimate/"
              className={`transition-colors rounded-full p-2 ${
                theme === "light"
                  ? "text-gray-600 hover:text-sky-600 hover:bg-sky-600/10"
                  : "text-gray-400 hover:text-sky-600 hover:bg-sky-600/10"
              }`}
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/ultimatefaloe/"
              className={`transition-colors rounded-full p-2 ${
                theme === "light"
                  ? "text-gray-600 hover:text-sky-600 hover:bg-sky-600/10"
                  : "text-gray-400 hover:text-sky-600 hover:bg-sky-600/10"
              }`}
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className={`transition-colors rounded-full p-2 ${
                theme === "light"
                  ? "text-gray-600 hover:text-sky-600 hover:bg-sky-600/10"
                  : "text-gray-400 hover:text-sky-600 hover:bg-sky-600/10"
              }`}
            >
              <MessageCircleDashed className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/tunmise-falodun-1894b22a2/"
              className={`transition-colors rounded-full p-2 ${
                theme === "light"
                  ? "text-gray-600 hover:text-sky-600 hover:bg-sky-600/10"
                  : "text-gray-400 hover:text-sky-600 hover:bg-sky-600/10"
              }`}
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SideNavBar;
