const missingClass = "is-missing";

const markMissingMedia = (element) => element.classList.add(missingClass);

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("error", () => markMissingMedia(video));
  video.querySelectorAll("source").forEach((source) => {
    source.addEventListener("error", () => markMissingMedia(video));
  });
});

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => markMissingMedia(image));

  if (image.complete && image.naturalWidth === 0) {
    markMissingMedia(image);
  }
});

document.querySelectorAll(".hero-image").forEach((image) => {
  const hero = image.closest(".hero");
  const markLoaded = () => hero?.classList.add("has-image");
  const markMissing = () => {
    hero?.classList.remove("has-image");
    markMissingMedia(image);
  };

  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);

  if (image.complete && image.naturalWidth > 0) {
    markLoaded();
  }
});

const revealElements = document.querySelectorAll(".reveal-media");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.24 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
