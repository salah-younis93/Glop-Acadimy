window.addEventListener("load", () => {
  document.querySelector(".js-page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".js-page-loader").style.display = "none";
  },600);
})


// ----------------= Testimonial =----------------//
testimonialSlider();
function testimonialSlider() {
  const carouselOne = document.getElementById('carouselOne')
  if (carouselOne) {
    carouselOne.addEventListener('slide.bs.carousel', function() {
  // do something...
  const activItem = this.querySelector(".active");
  document.querySelector(".js-testimonial-img").src =
      activItem.getAttribute("data-js-testimonial-img");
}) 
  }
}
testimonialSlider();

// ----------------= Preview video =----------------//

function coursePreviewVideo() {
  const coursepreviewModal = document.querySelector('.js-course-preview-modal');
  if (coursepreviewModal) {
    coursepreviewModal.addEventListener('show.bs.modal', function() {
      this.querySelector('.js-course-preview-video').play()
      this.querySelector('.js-course-preview-video').currentTime = 0;
    });
    coursepreviewModal.addEventListener("hide.bs.modal", function() {
      this.querySelector('.js-course-preview-video').pause()
    })
  }
}
coursePreviewVideo();

// ----------------= Header Menu =----------------//

function headerMenu() {
  const menu = document.querySelector('.js-header-menu');
  const backdrop = document.querySelector('.js-header-backdrop');
  const menuCollapseBreakpoint = 991;
  let menuOpen = false; // Keep track of the menu state

  function toggleMenu() {
    menuOpen = !menuOpen; // Toggle the menu state
    menu.classList.toggle('open', menuOpen);
    backdrop.classList.toggle('active', menuOpen);
    document.body.classList.toggle('overflow-hidden', menuOpen);
  }

  document.querySelectorAll('.js-header-menu-toggler').forEach((item) => {
    item.addEventListener('click', toggleMenu);
  });
  backdrop.addEventListener("click", toggleMenu)

  function collapse() {
    menu.querySelector('.active .js-sub-menu').removeAttribute('style');
    menu.querySelector('.active').classList.remove('active');
  }

  menu.addEventListener('click', (event) => {
    const { target } = event;

    if (
      target.classList.contains('js-toggle-sub-menu') &&
      window.innerWidth <= menuCollapseBreakpoint
    ) {
      event.preventDefault();

      if (target.parentElement.classList.contains('active')) {
        collapse();
        return;
      }

      if (menu.querySelector('.active')) {
        collapse();
      }

      target.parentElement.classList.add('active');
      target.nextElementSibling.style.maxHeight =
        target.nextElementSibling.scrollHeight + 'px';
    }
  });

  window.addEventListener('resize', function () {
    const windowWidth = this.innerWidth;
    if (windowWidth > menuCollapseBreakpoint) {
      // If the window width exceeds the breakpoint, close the menu and collapse any active sub-menus
      if (menuOpen) {
        toggleMenu();
      }
      if (menu.querySelector('.active')) {
        collapse();
      }
    } else {
      // If the window width is below the breakpoint and the menu was open, collapse any active sub-menus
      if (menuOpen && menu.querySelector('.active')) {
        collapse();
      }
    }
  });
}

headerMenu();

// ----------------= Style Switcher =----------------//
function styleSwitcherToggle() {
  const styleSwitcher = document.querySelector('.style-switcher');
  const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
  const body = document.querySelector('body');

  styleSwitcherToggler.addEventListener('click', function(event) {
    event.stopPropagation();
    styleSwitcher.classList.toggle('open');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-cog');
  });

  // Add a click event listener to the body
  body.addEventListener('click', function(event) {
    if (!styleSwitcher.contains(event.target)) {
      // Check if the clicked target is outside the style switcher menu
      styleSwitcher.classList.remove('open');
      styleSwitcherToggler.querySelector('i').classList.remove('fa-times');
      styleSwitcherToggler.querySelector('i').classList.add('fa-cog');
    }
  });
}

styleSwitcherToggle();
// ----------------= theme color =----------------//
function themeColors() {
  const colorStyle = document.querySelector(".js-color-style"),
  themeColorContainer = document.querySelector(".js-theme-colors")

  themeColorContainer.addEventListener("click", ({target}) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColor();
    }
  })

  function setColor() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyle.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") +".css");

    if (document.querySelector(".js-theme-color-item.active")) {
      document.querySelector(".js-theme-color-item.active").classList.remove("active");
    }
    document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active")
  }
  if(localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
    document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
  }
}
themeColors();


// ----------------= Dark  Themes =----------------//
function darkTheme() {
  const darkModeCheckBox = document.querySelector('.js-dark-mode');

  darkModeCheckBox.addEventListener("click", function() {
    if (darkModeCheckBox.checked) {
      localStorage.setItem("theme-dark", "true")
    } else {
      localStorage.setItem("theme-dark", "false")
    }
    themeMode();
  });
  function themeMode() {
    if(localStorage.getItem("theme-dark") === "false") {
      document.body.classList.remove("t-dark");
    } else {
      document.body.classList.add("t-dark");
    }
  }
  if(localStorage.getItem("theme-dark") !== null) {
    themeMode();
  }
  if(document.body.classList.contains("t-dark")) {
    darkModeCheckBox.checked = true;
  }
}
darkTheme();


// ----------------=  Glass Themes =----------------//
function themeGlassEffect() {
  const glassEffectCheckbox = document.getElementById("glass-effect"),
  glassStyle = document.querySelector('.js-glass-style');


  glassEffectCheckbox.addEventListener("click", function() {
    if(glassEffectCheckbox.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });
  function glass() {
    if(localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }

  if(localStorage.getItem("glass-effect") !== null) {
    glass();
  }

  if(!glassStyle.hasAttribute("disabled")) {
    glassEffectCheckbox.checked = true;
  }

}
themeGlassEffect();