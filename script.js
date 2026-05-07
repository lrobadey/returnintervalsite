const missingClass = "is-missing";

document.querySelectorAll("video").forEach((video) => {
  const markMissing = () => video.classList.add(missingClass);

  video.addEventListener("error", markMissing);
  video.querySelectorAll("source").forEach((source) => {
    source.addEventListener("error", markMissing);
  });
});

document.querySelectorAll("img").forEach((image) => {
  const markMissing = () => image.classList.add(missingClass);

  image.addEventListener("error", markMissing);

  if (image.complete && image.naturalWidth === 0) {
    markMissing();
  }
});

document.querySelectorAll(".hero-image").forEach((image) => {
  const hero = image.closest(".hero");
  const markLoaded = () => hero?.classList.add("has-image");
  const markMissing = () => {
    hero?.classList.remove("has-image");
    image.classList.add(missingClass);
  };

  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);

  if (image.complete && image.naturalWidth > 0) {
    markLoaded();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.24 }
);

document.querySelectorAll(".reveal-media").forEach((element) => observer.observe(element));
