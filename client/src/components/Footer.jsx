import React from "react";


const Footer = () => {
  return (
    <footer className="bg-gray-200 py-6 px-6 flex justify-between items-center">
        <div>
          <h4 className="font-semibold">Contact Us</h4>
          <p>Email: <a href="mailto:info@hukumcricket.com" className="underline">info@hukumcricket.com</a></p>
          <p>Phone: +91 9876543210</p>
        </div>
        <div className="space-x-4 flex items-center">
          <a href="#" className="hover:text-gray-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-600">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
  );
};

export default Footer;
