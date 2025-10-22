"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  User,
  HardDrive,
  Mail,
  Menu,
  ChevronDown,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircleDashed,
  // Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../UI/button";
import ThemeToggle from "../UI/themeToggle";

const SideNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  return (
    <header>
      {/* Mobile Menu Button */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden bg-transparent blur-sm w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-10`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        ></div>
      )}
      <Button
        className="fixed top-4 right-4 z-50 p-2 rounded-md lg:hidden transition-all duration-300 bg-gray-200/30 text-black hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div
        className={`bg-ute-primary text-ute-neutral dark:bg-ute-secondary dark:text-ute-accent fixed inset-y-0 left-0 w-64 transition-all duration-300 transform border-r border-sky-600
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center py-6">
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border-4 mb-4 border-gray-300 dark:border-gray-700`}
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

         <ThemeToggle />

          {/* Navigation */}
           {/* Navigation - Scrollable Area */}
          <nav className="flex-1 py-4 min-h-0" style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            <style dangerouslySetInnerHTML={{
              __html: `
                nav::-webkit-scrollbar {
                  display: none;
                }
              `
            }} />
            
            <ul className="space-y-2 pb-4">
              {[
                { href: "/", icon: Home, text: "Home", active: true },
                { href: "/about", icon: User, text: "About" },
                // { href: "/portfolio", icon: ImageIcon, text: "Portfolio" },
                { href: "/services", icon: HardDrive, text: "Services" },
                { href: "/contact", icon: Mail, text: "Contact" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-4 py-3 rounded-md transition-colors
                        ${
                          item.active
                            ? "bg-sky-600/10 text-sky-600"
                            : "text-gray-600 dark:text-gray-400 hover:bg-sky-600/10 hover:text-sky-600"
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
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
                  className="flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors text-gray-600 hover:bg-sky-600/10 hover:text-sky-600 dark:text-gray-400 dark:hover:bg-sky-600/10 dark:hover:text-sky-600"
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
                  <ul className="ml-8 mt-2 space-y-2 pl-2 border-l border-sky-600 dark:border-gray-700">
                    {["Skills", "Projects", "Blog", "Experiences"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            href={`/${item.toLowerCase()}`}
                            className="block px-3 py-2 transition-colors rounded-md text-gray-600 hover:bg-sky-600/10 hover:text-sky-600 dark:text-gray-400 dark:hover:bg-sky-600/10 dark:hover:text-sky-600"
                            onClick={() => setIsMobileMenuOpen(false)}
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

          {/* Social Links - Fixed at Bottom */}
          <div className="flex justify-center space-x-4 pt-2 px-4 border-t border-gray-300 dark:border-gray-700 bg-ute-primary dark:bg-ute-secondary flex-shrink-0">
            <Link
              href="https://x.com/faloeUltimate/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors rounded-full p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-600/10 dark:text-gray-400 dark:hover:text-sky-600 dark:hover:bg-sky-600/10"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://web.facebook.com/faloeultimate/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors rounded-full p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-600/10 dark:text-gray-400 dark:hover:text-sky-600 dark:hover:bg-sky-600/10"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/ultimatefaloe/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors rounded-full p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-600/10 dark:text-gray-400 dark:hover:text-sky-600 dark:hover:bg-sky-600/10"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="transition-colors rounded-full p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-600/10 dark:text-gray-400 dark:hover:text-sky-600 dark:hover:bg-sky-600/10"
            >
              <MessageCircleDashed className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/tunmise-falodun-1894b22a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors rounded-full p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-600/10 dark:text-gray-400 dark:hover:text-sky-600 dark:hover:bg-sky-600/10"
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
