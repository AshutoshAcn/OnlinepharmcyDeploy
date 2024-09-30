// NotFound.js

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl mb-5">404 - Not Found</h1>
        <p>The page you're looking for does not exist.</p>

        <Link to="/" className="block mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
