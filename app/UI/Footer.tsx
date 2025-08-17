"use client"
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex justify-center md:justify-start">
                <Link href="/">
                  <img src="./images/logo.png" alt="Company Logo" className="h-12" />
                </Link>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa fa-facebook text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa fa-twitter text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa fa-dribbble text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa fa-instagram text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa fa-youtube-play text-xl"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Options Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div className="mb-8 md:mb-0">
            <h5 className="text-xl font-bold mb-4">About us</h5>
            <p className="text-gray-400 mb-4">
              Formed in 2006 by Matt Hobbs and Cael Jones, Videoprah is an
              award-winning, full-service production company specializing.
            </p>
            <Link href="#" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
              Read more <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Who We Are */}
          <div className="mb-8 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Who we are</h5>
            <ul className="space-y-2">
              <li><Link href="/Team" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
            </ul>
          </div>

          {/* Our Work */}
          <div className="mb-8 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Our work</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Feature</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Latest</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Browse Archive</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Video for web</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-xl font-bold mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4">
              Videoprah is an award-winning, full-service production company
              specializing.
            </p>
            <form className="flex">
              <input
                type="text"
                placeholder="Email"
                className="px-4 py-2 w-full rounded-l focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-white transition-colors"
              >
                <i className="fa fa-send"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-gray-400">
              Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is made with
              <i className="fa fa-heart-o mx-1" aria-hidden="true"></i> by
              <Link href="https://colorlib.com" target="_blank" className="text-blue-400 hover:text-blue-300 ml-1 transition-colors">
                Colorlib
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;