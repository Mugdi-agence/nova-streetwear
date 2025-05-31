window.scrollTo(0, 0);
document.body.classList.add('noscroll');

function preventScroll(e) {
    e.preventDefault();
}

  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
  window.addEventListener('keydown', preventScroll, { passive: false });

gsap.registerPlugin(ScrollTrigger);

gsap.to('#s2 .right h1', {
    scrollTrigger: {
        trigger: "#s2 .right h1",
        start: 'bottom 100%',
        end: 'top 0%',
        scrub: 1,
        marker: true
    },
    rotation: -5,
    y: -50,
    ease: 'none'
});

gsap.to('.box', {
    scrollTrigger: {
        trigger: ".box",
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        marker: true
    },
    rotationY: 10,
    rotationZ: 4,
    y: -50,
    ease: 'none'
});

gsap.to('#s3 h1', {
    scrollTrigger: {
        trigger: "#s3 h1",
        start: 'bottom 100%',
        end: 'top 0%',
        scrub: 1,
        marker: true
    },
    rotation: -4,
    y: -100,
    ease: 'none'
});

gsap.to('#s3 p', {
    scrollTrigger: {
        trigger: "#s3 p",
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 1,
        marker: true
    },
    rotation: 4,
    y: -100,
    ease: 'none'
});


gsap.from('#s4 h1', {
    scrollTrigger: {
        trigger: "#s4 h1",
        start: 'bottom 100%',
        end: 'top 40%',
        scrub: 1,
        marker: true
    },
    filter: 'blur(5px)',
    opacity: 0.5,
    y: -50,
    ease: 'none'
});

gsap.from('#s4 h2', {
    scrollTrigger: {
        trigger: "#s4 h2",
        start: 'bottom 100%',
        end: 'top 40%',
        scrub: 1,
        marker: true
    },
    filter: 'blur(5px)',
    opacity: 0.5,
    y: -50,
    delay: 2,
    ease: 'none'
});

  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
  });

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

function preventScroll(e) {
  e.preventDefault();
}

window.addEventListener('wheel', preventScroll, { passive: false });
window.addEventListener('touchmove', preventScroll, { passive: false });
window.addEventListener('keydown', (e) => {
  if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  }
}, { passive: false });

window.onload = function () {
  window.scrollTo(0, 0);
  gsap.to("#loader", {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.5,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
      document.body.classList.remove('noscroll');

      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScroll);

      gsap.to('#WebGL', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        delay: 2.1
      });

      gsap.to('.navfix', {
        y: 50,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        delay: 1.2
      });

      gsap.to('#s1 h1', {
        y: 50,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to('#s1 h2', {
        y: 50,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        delay: 0.6
      });

      gsap.to('.menu', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        delay: 1.2
      });

    }
  });
    window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
  window.addEventListener('keydown', preventScroll, { passive: false });
};

