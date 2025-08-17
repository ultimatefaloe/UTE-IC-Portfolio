"use client"
import Link from "next/link";
import { useState } from "react";
import { 
  Home, 
  User, 
  FileText, 
  Image, 
  HardDrive, 
  Mail, 
  Menu, 
  ChevronDown,
  Bird, MessageCircle, Camera, Briefcase, 
  Phone,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircleDashed
} from "lucide-react";

const SideNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-md text-white lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <header className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-40`}>
        <div className="flex flex-col h-full p-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center py-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-700 mb-4">
              <img
                src="/images/Profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Link href="/" className="text-center">
              <h1 className="text-xl font-bold">Tunmise Falodun</h1>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 py-4 border-t border-gray-800">
            <Link href="https://x.com/faloeUltimate/" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://web.facebook.com/faloeultimate/" className="text-gray-400 hover:text-white transition-colors">
              <Facebook  className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/ultimatefaloe/" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <MessageCircleDashed className="h-5 w-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/tunmise-falodun-1894b22a2/" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2">
              {[
                { href: "/", icon: Home, text: "Home", active: true },
                { href: "/about", icon: User, text: "About" },
                { href: "/resume", icon: FileText, text: "Resume" },
                { href: "/portfolio", icon: Image, text: "Portfolio" },
                { href: "/services", icon: HardDrive, text: "Services" },
                { href: "/contact", icon: Mail, text: "Contact" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-md transition-colors ${item.active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
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
                  className="flex items-center justify-between w-full px-4 py-3 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center">
                    <Menu className="h-5 w-5 mr-3" />
                    <span>Pages</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-2 pl-2 border-l border-gray-700">
                    {['Skills', 'Projects', 'Blog', 'Experiences'].map((item) => (
                      <li key={item}>
                        <Link
                          href={`/${item.toLowerCase()}`}
                          className="block px-3 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default SideNavBar;