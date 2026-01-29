const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5002"
    : "https://web-bcnd.onrender.com";

console.log("API URL:", API_URL);