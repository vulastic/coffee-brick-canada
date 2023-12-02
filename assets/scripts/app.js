window.addEventListener("DOMContentLoaded", function() {
  
  // carousel
  {
    const carousel = this.document.getElementById("carousel") || {}; 
    if (carousel) {
      const container = carousel.getElementsByClassName("carousel-container")[0];
      const list = container.getElementsByTagName("li");
      const autoplay = carousel.classList.contains("autoplay");
      
      let timerId, timerInterval = 3000;
      let prev, next;
      if (carousel.classList.contains('switch')) {
        let prevIndex = 0;
        let currentIndex = 0;
        const fadeTransition = (element, opacity, animation) => {
          element.style.opacity = opacity;
          element.classList.add(animation);
          this.setTimeout(() => {
            element.classList.remove(animation);
          }, 500);
        }
        prev = () => {
          autoplay && this.clearTimeout(timerId);
          prevIndex = currentIndex;
          currentIndex = (currentIndex - 1 + list.length) % list.length;
          fadeTransition(list[prevIndex], 0, "fade-transition");
          fadeTransition(list[currentIndex], 1, "fade-transition");
          if (autoplay) {
            timerId = this.setTimeout(prev, timerInterval);
          }
        }
        next = () => {
          autoplay && this.clearTimeout(timerId);
          prevIndex = currentIndex;
          currentIndex = (currentIndex + 1) % list.length;
          fadeTransition(list[prevIndex], 0, "fade-transition");
          fadeTransition(list[currentIndex], 1, "fade-transition");
          if (autoplay) {
            timerId = this.setTimeout(next, timerInterval);
          }
        }
      }
      else {
        prev = () => {
          autoplay && this.clearTimeout(timerId);
          container.insertBefore(list[list.length - 1], container.firstChild);
          container.style.transform = "translateX(-100%)";
          this.setTimeout(() => {
            container.classList.add("sliding-transition");
            container.style.transform = "";
          }, 10);
          this.setTimeout(() => {
            container.classList.remove("sliding-transition");
          }, 490);
          if (autoplay) {
            timerId = this.setTimeout(prev, timerInterval);
          }
        }
        next = () => {
          autoplay && this.clearTimeout(timerId);
          container.classList.add("sliding-transition");
          container.style.transform = "translateX(-100%)";
          this.setTimeout(() => {
            container.appendChild(list[0]);
            container.classList.remove("sliding-transition");
            container.style.transform = "";
          }, 500);
          if (autoplay) {
            timerId = this.setTimeout(next, timerInterval);
          }
        }
      }
      carousel.getElementsByClassName("prev")[0].addEventListener("click", prev);
      carousel.getElementsByClassName("next")[0].addEventListener("click", next);
      if (autoplay) {
        timerId = this.setTimeout(next, timerInterval);
      }
    }
  }
});