import React from "react";
import Footer from "./Footer";
import Navbar from "./sidebar/Navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
