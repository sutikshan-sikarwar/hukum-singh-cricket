import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 mt-10 py-6 px-6 flex justify-between items-center">
      <div className="mx-auto flex text-center flex-col">
        <h4 className="font-semibold mb-3">Contact Us</h4>
        <p className="mb-2">
          Email:
          <a
            href="mailto:mayankchaturvedicricket@gmail.com"
            className="underline"
          >
           mayankchaturvedicricket@gmail.com
          </a>
        </p>
        <p>Dr. Sushil Singh Thakur: 9827059094</p>
        <p>Shri Atul Dubey: 9826703344</p>
        <p>Shri Atul Khare 7869666985</p>
        <p>Shri Pankaj Sitoke: 9174160882 </p>
        <p className="mt-2 text-sm">© 2024 Hukum Singh Cricket Tournament</p>
      </div>
    </footer>
  );
};

export default Footer;
