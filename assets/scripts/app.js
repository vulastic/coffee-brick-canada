window.addEventListener("DOMContentLoaded", function() {
  
  // carousel
  {
    const carousel = this.document.getElementById("carousel") || {}; 
    if (carousel) {
      const container = carousel.getElementsByClassName("carousel-container")[0];
      const autoplay = carousel.classList.contains("autoplay");
      const list = container.getElementsByTagName("li");
      
      let timerId, forward, backward;

      const defaultInterval = 3000;
      const timerInterval = carousel.dataset.interval != undefined ? carousel.dataset.interval : defaultInterval;
      
      const spin = (direction) => {
        direction();
        autoplay && this.clearInterval(timerId);
        if (autoplay) {
          carousel.direction = direction;
          timerId = this.setInterval(direction, timerInterval);
        }
      }
      
      // switch mode
      if (carousel.classList.contains('switch')) {
        let prevIndex = 0;
        let currentIndex = 0;
        const fadeTransition = (element, opacity) => {
          element.style.opacity = opacity;
          element.classList.add("fade-transition");
          this.setTimeout(() => {
            element.classList.remove("fade-transition");
          }, 500);
        }
        forward = () => {
          prevIndex = currentIndex;
          currentIndex = (currentIndex + 1) % list.length;
          fadeTransition(list[prevIndex], 0);
          fadeTransition(list[currentIndex], 1);
        }
        backward = () => {
          prevIndex = currentIndex;
          currentIndex = (currentIndex - 1 + list.length) % list.length;
          fadeTransition(list[prevIndex], 0);
          fadeTransition(list[currentIndex], 1);
        }
      }

      // slide mode
      else {
        forward = () => {
          container.classList.add("sliding-transition");
          container.style.transform = "translateX(-100%)";
          this.setTimeout(() => {
            container.appendChild(list[0]);
            container.classList.remove("sliding-transition");
            container.style.transform = "";
          }, 500);
        }
        backward = () => {
          container.insertBefore(list[list.length - 1], container.firstChild);
          container.style.transform = "translateX(-100%)";
          this.setTimeout(() => {
            container.classList.add("sliding-transition");
            container.style.transform = "";
          }, 10);
          this.setTimeout(() => {
            container.classList.remove("sliding-transition");
          }, 490);
        }
      }
      carousel.getElementsByClassName("next")[0].addEventListener("click", () => { spin(forward); });
      carousel.getElementsByClassName("prev")[0].addEventListener("click", () => { spin(backward); });

      // Start autoplay and interection observer
      if (autoplay) {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            if (!carousel.direction) {
              carousel.direction = forward;
            }
            timerId = this.setInterval(carousel.direction, timerInterval);
          }
          else { autoplay && this.clearInterval(timerId); }
        });
        observer.observe(carousel);
      }
    }
  }

  // header
  const header = this.document.getElementById("header");
  if (header) {
    
    // header scrolled
    const headerScrolled = () => {
      if (this.window.scrollY > header.offsetHeight) {
        header.classList.add("header-scrolled");
      }
      else {
        header.classList.remove("header-scrolled");
      }
    }
    this.document.addEventListener("scroll", headerScrolled);

    // navbar
    const navbar = this.document.getElementById("navbar");
    if (navbar) {
      const links = this.document.getElementsByClassName("nav-item");
      const navAction = () => {
        const position = window.scrollY + header.offsetHeight + 1;
        for (let link of links) {
          if (!link.hash) continue;
          let target = this.document.getElementById(link.hash.substring(1));
          if (!target) continue;
          if (position >= target.offsetTop && position <= (target.offsetTop + target.offsetHeight)) {
            link.classList.add("active");
          }
          else {
            link.classList.remove("active");
          }
        } 
      };
      this.document.addEventListener("scroll", navAction);
    }

    // scrolly
    const scrolls = this.document.getElementsByClassName("scrolly");
    for (let item of scrolls) {
      if (!item.hash) continue;
      const target = this.document.getElementById(item.hash.substring(1));
      if (!target) continue;
      item.addEventListener("click", e => {
        e.preventDefault();
        this.window.scrollTo({
          top: target.offsetTop - header.offsetHeight,
          behavior: "smooth"
        });
      });
    }
  }
});