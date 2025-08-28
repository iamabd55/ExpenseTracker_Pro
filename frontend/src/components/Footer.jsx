import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 body-font mt-2">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          {/* Column 1 - About */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-semibold text-purple-400 tracking-widest text-sm mb-3">
              EXPENSE TRACKER PRO
            </h2>
            <p className="text-gray-400 text-sm">
              Smart, simple & secure way to manage your personal and business
              finances. Track your income, expenses, and savings in one place.
            </p>
          </div>

          {/* Column 2 - Features */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-semibold text-purple-400 tracking-widest text-sm mb-3">
              FEATURES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="hover:text-purple-400">Dashboard</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Expense Tracking</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Reports & Charts</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Budget Planning</a>
              </li>
            </nav>
          </div>

          {/* Column 3 - Support */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-semibold text-purple-400 tracking-widest text-sm mb-3">
              SUPPORT
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="hover:text-purple-400">Help Center</a>
              </li>
              <li>
                <a className="hover:text-purple-400">FAQs</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Contact Us</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Privacy Policy</a>
              </li>
            </nav>
          </div>

          {/* Column 4 - Subscribe */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-semibold text-purple-400 tracking-widest text-sm mb-3">
              STAY UPDATED
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start">
              <div className="relative w-40 sm:w-auto sm:mr-4 mb-2 sm:mb-0">
                <input
                  type="text"
                  placeholder="Your Email"
                  className="w-full bg-gray-800 rounded border border-gray-700 
                    focus:bg-transparent focus:ring-2 focus:ring-purple-500 
                    focus:border-purple-500 text-sm outline-none text-gray-200 
                    py-2 px-3 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="inline-flex text-white bg-purple-600 border-0 py-2 px-6 
                focus:outline-none hover:bg-purple-700 rounded">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2 md:text-left text-center">
              Get tips & updates on how to master your finances.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-900">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-purple-600 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-semibold">
              Expense Tracker Pro
            </span>
          </a>
          <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">
            © {new Date().getFullYear()} Expense Tracker Pro — All Rights
            Reserved
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-400 hover:text-purple-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="ml-3 text-gray-400 hover:text-purple-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="ml-3 text-gray-400 hover:text-purple-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="ml-3 text-gray-400 hover:text-purple-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
