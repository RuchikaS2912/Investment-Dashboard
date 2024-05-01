// App.js
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthCallback = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth";
  };
  const navigate = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // Authorization successful, navigate to the desired route
      navigate("/"); // Change this to your desired route
    }
  }, [navigate]);

  return (
    <div>
      <h1>Google Sheets Integration</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default AuthCallback;
