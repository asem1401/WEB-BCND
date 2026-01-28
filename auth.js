let isLogin = true;

const form = document.getElementById("authForm");
const errorBox = document.getElementById("errorBox");

function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("nameField").style.display = isLogin ? "none" : "block";
  document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Register";
  document.getElementById("formTitle").innerText = isLogin
    ? "Login to your account"
    : "Create a new account";

  errorBox.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const name = document.getElementById("name")?.value.trim();

  const endpoint = isLogin
    ? "/api/auth/login"
    : "/api/auth/register";

  const payload = isLogin
    ? { email, password }
    : { name, email, password };

  try {
    const res = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      errorBox.innerText = data.message || "Something went wrong";
      errorBox.style.display = "block";
      return;
    }

    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    
    window.location.href = "index.html";

  } catch (err) {
    errorBox.innerText = "Server error";
    errorBox.style.display = "block";
  }
});