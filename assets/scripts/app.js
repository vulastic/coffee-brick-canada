window.addEventListener("load", () => {
  this.setTimeout(() => {
    const loading = this.document.getElementById("loading");
    loading.style.display = 'none';
    const title = this.document.getElementById("title");
    title.classList.add("title--loaded");
  }, 200);
});

window.addEventListener("DOMContentLoaded", () => {
  // event listener function
  const on = (type, el, listener) => {
    if(Array.isArray(el)) {
      el.forEach(e => e.addEventListener(type, listener));      
    } else {
      el.addEventListener(type, listener);
    }
  }

  // header
  const header = this.document.getElementById("header");
  if (header) {
    // navbar__menu
    const menu = header.getElementsByClassName("header-navbar__menu")[0];
    if (menu) {
      const list = menu.getElementsByClassName("header-navbar__menu-item");
      if (list) {
        const action = () => {
          const position = window.scrollY + header.offsetHeight;
          for (let item of list) {
            if (!item.hash) continue;
            let target = this.document.getElementById(item.hash.substring(1));
            if (!target) continue;
            if (position >= target.offsetTop && position <= (target.offsetTop + target.offsetHeight)) {
              item.classList.add("header-navbar__menu-item--active");
            }
            else {
              item.classList.remove("header-navbar__menu-item--active");
            }
          } 
        };
        on("scroll", this.document, action); 
      }

      // menu toggle
      const toggle = this.document.getElementById("menu-toggle");
      toggle && on("click", toggle, () => {
        if (!header.classList.contains("header--expanded")) {
          header.classList.add("header--expanded");
        } else {
          header.classList.remove("header--expanded");
        }
        // close menu when scrolling
        on("scroll", this.document, () => {
          header.classList.remove("header--expanded");
        })
      });
    }
  }


  // topbar
  const topbar = this.document.getElementById("topbar")
  if (header || topbar) {
    const topbarScrolled = () => {
      if (this.window.scrollY > 100) {
        header && header.classList.add("header--scrolled")
        topbar && topbar.classList.add("topbar--scrolled");
      } else {
        header && header.classList.remove("header--scrolled");
        topbar && topbar.classList.remove("topbar--scrolled");
      }
    }
    on("scroll", this.document, topbarScrolled);
  }


  // carousel
  const carouselList = this.document.getElementsByClassName("carousel");
  for (let carousel of carouselList) {
    const spinner = carousel.getElementsByClassName("carousel-spinner")[0];
    const auto = carousel.classList.contains("auto");
    const list = spinner.getElementsByTagName("li");
    if (list.length <= 1) continue;

    let timer, forward, backward;
    let interval = carousel.dataset.interval != undefined ? carousel.dataset.interval : 3000; // default 3000
    const spin = (action) => {
      action();
      if (auto) {
        carousel.action = action;
        this.clearInterval(timer);
        timer = this.setInterval(action, interval);
      }
    }  
    const fade = (element, opacity) => {
      element.style.opacity = opacity;
      element.classList.add("carousel-spinner__transition--fade");
      this.setTimeout(() => {
        element.classList.remove("carousel-spinner__transition--fade");
      }, 500);
    }
    
    // fade
    if (carousel.classList.contains("fade")) {
      let prevIndex = 0;
      let currentIndex = 0;
      forward = () => {
        prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % list.length;
        fade(list[prevIndex], 0);
        fade(list[currentIndex], 1);
      }
      backward = () => {
        prevIndex = currentIndex;
        currentIndex = (currentIndex - 1 + list.length) % list.length;
        fade(list[prevIndex], 0);
        fade(list[currentIndex], 1);
      }
    }
    
    // slide
    else {
      forward = () => {
        spinner.classList.add("carousel-spinner__transition--slide");
        spinner.style.transform = "translateX(-100%)";
        this.setTimeout(() => {
          spinner.appendChild(list[0]);
          spinner.classList.remove("carousel-spinner__transition--slide");
          spinner.style.transform = "";
        }, 500);
      }
      backward = () => {
        spinner.insertBefore(list[list.length - 1], spinner.firstChild);
        spinner.style.transform = "translateX(-100%)";
        this.setTimeout(() => {
          spinner.classList.add("carousel-spinner__transition--slide");
          spinner.style.transform = "";
        }, 10);
        this.setTimeout(() => {
          spinner.classList.remove("carousel-spinner__transition--slide");
        }, 490);
      }
    }
    
    // Add button listener
    const next = carousel.getElementsByClassName("carousel-content__next")[0];
    const prev = carousel.getElementsByClassName("carousel-content__prev")[0];
    on("click", prev, () => { spin(backward); });
    on("click", next, () => { spin(forward); });

    // autoplay and observation
    if (auto) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (!carousel.action) {
            carousel.action = forward;
          }
          timer = this.setInterval(carousel.action, interval);
        }
        else { auto && this.clearInterval(timer); }
      });
      observer.observe(carousel);
    }
  }

  // scrollTo
  const scrollList = this.document.getElementsByClassName("scrollTo");
  for (let item of scrollList) {
    if (!item.hash) continue;
    const target = this.document.getElementById(item.hash.substring(1));
    if (!target) continue;
    item.addEventListener("click", e => {
      e.preventDefault();
      const offset = header != null ? header.offsetHeight : 0;
      this.window.scrollTo({
        top: target.offsetTop + 1 - offset,   // with border 1px solid
        behavior: "smooth"
      });
    });
  }
});
