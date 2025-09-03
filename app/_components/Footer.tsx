"use client";
import Link from "next/link";
import { useTheme } from "../_context/ThemeContext";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Dribbble,
  Send,
  Heart,
} from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-12 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Company Logo"
                className="h-12"
              />
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <Link
              href="#"
              className="p-2 rounded-full transition-colors hover:bg-primary hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full transition-colors hover:bg-primary hover:text-white"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full transition-colors hover:bg-primary hover:text-white"
            >
              <Dribbble className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full transition-colors hover:bg-primary hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full transition-colors hover:bg-primary hover:text-white"
            >
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <h5 className="text-xl font-bold mb-4">About Us</h5>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Formed in 2006, Videoprah is an award-winning, full-service
              production company specializing in storytelling and branding.
            </p>
            <Link
              href="#"
              className="text-primary hover:text-primary/80 flex items-center font-medium transition-colors"
            >
              Read more <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Who We Are */}
          <div>
            <h5 className="text-xl font-bold mb-4">Who We Are</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/team"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h5 className="text-xl font-bold mb-4">Our Work</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Latest
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Browse Archive
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Video for Web
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-xl font-bold mb-4">Newsletter</h5>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Stay updated with the latest news, projects, and exclusive
              insights.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className={`px-4 py-2 w-full rounded-l-md focus:outline-none ${
                  theme === "light"
                    ? "bg-white text-gray-900 border border-gray-300"
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-md text-white transition-colors flex items-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Copyright &copy; {new Date().getFullYear()} All rights reserved | 
            <Link href="#"> {" "}
               UTE-IC
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
