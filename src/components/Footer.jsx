import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-4 px-6 mt-10">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left: Copyright */}
        <p className="text-center md:text-left mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} DevConnect. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-500">Privacy</a>
          <a href="#" className="hover:text-blue-500">Terms</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
