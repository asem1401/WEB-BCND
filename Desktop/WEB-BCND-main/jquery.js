$(document).ready(function() {

  console.log("✅ jQuery is ready!");

  
  $("#searchBox").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().includes(value));
    });
  });

  
  const spotlightRecipes = [
    "Pancakes", "Blueberry Muffins", "Avocado Toast",
    "Caesar Salad", "Chicken Soup", "Ramen Bowl",
    "Chocolate Cake", "Soufflé", "Tacos", "Oatmeal Bowl"
  ];

  
  $("#openSpotlight").on("click", function () {
    $("#spotlightOverlay").fadeIn(200);
    $("#spotlightInput").val("").focus();
    $("#spotlightResults").empty();
  });

  
  $("#spotlightOverlay").on("click", function (e) {
    if (e.target.id === "spotlightOverlay") {
      $("#spotlightOverlay").fadeOut(200);
    }
  });

  
  $("#spotlightInput").on("input", function () {
    let value = $(this).val().toLowerCase();
    $("#spotlightResults").empty();
    spotlightRecipes.forEach(recipe => {
      if (recipe.toLowerCase().includes(value) && value.length > 0) {
        $("#spotlightResults").append(`<li>${recipe}</li>`);
      }
    });
  });

  
  $("#spotlightResults").on("click", "li", function () {
    let selected = $(this).text();
    alert("🔍 Opening recipe: " + selected);
    $("#spotlightOverlay").fadeOut(200);
  });

  

}); 


$("#searchBox").on("keyup", function () {
  let search = $(this).val().toLowerCase();

  $(".card-title, .card-text").each(function () {
    let text = $(this).text();
    if (search.length > 0) {
      let regex = new RegExp(search, "gi");
      let newText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
      $(this).html(newText);
    } else {
      $(this).text(text); 
    }
  });
});


$(window).on("scroll", function () {
  let scrollTop = $(window).scrollTop();
  let docHeight = $(document).height() - $(window).height();
  let scrollPercent = (scrollTop / docHeight) * 100;
  $("#scrollBar").css("width", scrollPercent + "%");
});


function animateCounters() {
  $(".counter").each(function () {
    let $this = $(this);
    let target = +$this.data("target");
    let count = 0;

    let step = target / 80; 

    let counterInterval = setInterval(function () {
      count += step;
      if (count >= target) {
        $this.text(target);
        clearInterval(counterInterval);
      } else {
        $this.text(Math.floor(count));
      }
    }, 20);
  });
}

animateCounters();


$("#contactForm").on("submit", function(e) {
  e.preventDefault(); 

  let btn = $(this).find("button[type=submit]");

  btn.prop("disabled", true); 
  btn.html("⏳ Sending..."); 
  setTimeout(() => {
    btn.html("✅ Message Sent!");
    setTimeout(() => {
      btn.prop("disabled", false);
      btn.html("Send Message");
    }, 1500);
  }, 2000);
});


function showToast(message) {
  $("#toast").text(message).addClass("show");
  setTimeout(() => {
    $("#toast").removeClass("show");
  }, 2000);
}


$(".btn-primary").on("click", function () {
  showToast("✅ Recipe opened!");
});


$(".copyBtn").on("click", function () {
  let text = $(this).prev(".recipeText").text();
  navigator.clipboard.writeText(text);

  let btn = $(this);
  btn.text("✅ Copied!");
  setTimeout(() => btn.text("Copy"), 1500);
});



$(window).on("scroll", function () {
  if ($(this).scrollTop() > 300) {
    $("#toTopBtn").fadeIn();
  } else {
    $("#toTopBtn").fadeOut();
  }
});

$("#toTopBtn").on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 600);
});


$(document).ready(function () {
  function lazyLoad() {
    $('.lazy').each(function () {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
        if (!$(this).attr('data-loaded')) {
          $(this).attr('src', $(this).data('src'));
          $(this).attr('data-loaded', true);
          $(this).css({ opacity: 1, transition: 'opacity 0.8s' });
        }
      }
    });
  }

  lazyLoad();
  $(window).on('scroll', lazyLoad);
});


$(document).on("click", ".add-fav", function () {
  const recipe = {
    title: $(this).data("title"),
    img: $(this).data("img"),
    desc: $(this).data("desc")
  };

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  
  if (!recipe.title || favorites.some(item => item.title === recipe.title)) {
    alert("⚠ Already in Favorites!");
    return;
  }

  favorites.push(recipe);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("✅ Added to Favorites!");
});


function loadFavorites() {
  const container = $("#favoritesContainer");
  if (!container.length) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  
  favorites = favorites.filter(item => item && item.title && item.img);

  container.empty();

  if (favorites.length === 0) {
    container.html(`<p class="text-muted text-center">No favorites yet.</p>`);
    return;
  }

  favorites.forEach(item => {
    container.append(`
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${item.img}" class="card-img-top object-fit-contain" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.desc}</p>
            <button class="btn btn-danger remove-fav" data-title="${item.title}">
              ❌ Remove
            </button>
          </div>
        </div>
      </div>
    `);
  });
}


$(document).on("click", ".remove-fav", function () {
  const title = $(this).data("title");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(item => item.title !== title);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  
  $(this).closest(".col-12, .col-md-6, .col-lg-4").remove();

  if ($("#favoritesContainer").children().length === 0) {
    $("#favoritesContainer").html(`<p class="text-muted text-center">No favorites yet.</p>`);
  }
});


$(document).ready(loadFavorites);




