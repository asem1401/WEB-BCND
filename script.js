document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector("#contactForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const message = form.querySelector("#message").value.trim();

      let errors = [];

      if (!name) errors.push("Введите имя.");
      if (!email) errors.push("Введите email.");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Неправильный формат email.");
      }
      if (!message) errors.push("Введите сообщение.");

      let errorBox = document.querySelector("#formErrors");
if (!errorBox) {
  errorBox = document.createElement("div");
  errorBox.id = "formErrors";
  form.appendChild(errorBox);
}

      if (errors.length > 0) {
        errorBox.className = "alert alert-danger mt-3";
        errorBox.innerHTML = errors.join("<br>");
        return;
      }

      
      fetch("http://localhost:5002/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            form.reset();
            errorBox.className = "alert alert-success mt-3";
            errorBox.textContent = "Форма отправлена успешно!";
          } else {
            errorBox.className = "alert alert-danger mt-3";
            errorBox.textContent = "Ошибка отправки email.";
          }
        })
        .catch(() => {
          errorBox.className = "alert alert-danger mt-3";
          errorBox.textContent = "Ошибка соединения с сервером.";
        });
    });
  }

  
  let darkmode = localStorage.getItem("darkmode");
  const themeSwitch = document.getElementById("theme-switch");

  const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
  };

  if (darkmode === "active") enableDarkmode();

  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      darkmode = localStorage.getItem("darkmode");
      darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });
  }

  
  const greetingBanner = document.createElement("div");
  greetingBanner.className = "alert alert-info text-center m-0";
  document.body.prepend(greetingBanner);

  const hour = new Date().getHours();
  greetingBanner.textContent =
    hour < 12
      ? "☀️ Good morning!"
      : hour < 18
      ? "🌤️ Good afternoon!"
      : "🌙 Good evening!";

  
  window.addToFavorites = function (recipe) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add favorites");
      return;
    }

    fetch("http://localhost:5002/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(recipe),
    })
      .then((res) => res.json())
      .then(() => alert("⭐ Added to favorites"))
      .catch(() => alert("⚠️ Error adding favorite"));
  };
});


document.addEventListener("DOMContentLoaded", () => {
  const recipeContainer = document.getElementById("api-recipes");
  const searchInput = document.getElementById("searchInput");

  if (!recipeContainer) return; // 🔒 FIX: prevent JS crash on other pages

  function loadRecipes(query = "pasta") {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const meals = data.meals;

        if (!meals) {
          recipeContainer.innerHTML = "<p>No recipes found.</p>";
          return;
        }

        recipeContainer.innerHTML = meals
          .map(
            (meal) => `
            <div class="recipe-card">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
              <p>${meal.strArea} | ${meal.strCategory}</p>
              <button onclick="addToFavorites({
                recipeTitle: '${meal.strMeal}',
                recipeImage: '${meal.strMealThumb}',
                recipeDesc: '${meal.strInstructions.substring(0, 100)}...'
              })">Add to favorites</button>
            </div>
          `
          )
          .join("");
      })
      .catch(() => {
        recipeContainer.innerHTML = "<p>Error loading recipes.</p>";
      });
  }

  loadRecipes();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      loadRecipes(q.length >= 2 ? q : "pasta");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const navGuest = document.getElementById("navAuthGuest");
  const navUser = document.getElementById("navAuthUser");
  const navUserName = document.getElementById("navUserName");

  if (token && user) {
    if (navGuest) navGuest.classList.add("d-none");
    if (navUser) navUser.classList.remove("d-none");
    if (navUserName) navUserName.textContent = user.name || "User";
  } else {
    if (navGuest) navGuest.classList.remove("d-none");
    if (navUser) navUser.classList.add("d-none");
  }
});


function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "auth.html";
}