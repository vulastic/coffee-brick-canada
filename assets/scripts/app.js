window.addEventListener("DOMContentLoaded", function() {
  
  // carousel
  {
    const carousel = this.document.getElementById("carousel") || {}; 
    if (carousel) {
      const container = carousel.getElementsByClassName("carousel-container")[0];
      const list = container.getElementsByTagName("li");
      const autoplay = carousel.classList.contains("autoplay");
      
      let forward, backward;
      let timerId, timerInterval = 3000;
      let spin = (funcDirection) => {
        autoplay && this.clearInterval(timerId);
        funcDirection();
        if (autoplay) {
          timerId = this.setInterval(funcDirection, timerInterval);
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
      if (autoplay) {
        timerId = this.setInterval(forward, timerInterval);
      }
    }
  }
});