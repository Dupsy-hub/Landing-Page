// Nav Menu Global Variables
const navMenu = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// build the nav
const buildNav = () => {
  for (let i = 0; i < sections.length; i++) {
    const sectionId = sections[i].getAttribute("id");
    const sectionName = sections[i].getAttribute("data-nav");
    navMenu.innerHTML += `<li><a class= "menu__link" href= "#${sectionId}">${sectionName}</a></li>`;
  }
};

// Using IntersectionObserver API
// Discover it at https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const observerOptions = {
  rootMargin: "0px",
  threshold: [0.55],
};

// Callback executed when a section becomes visible
const observerCallback = (entries) => {
  for (let i = 0; i < entries.length; i++) {
    const target = entries[i].target;
    const sectionId = +target.id[target.id.length - 1] - 1;

    if (entries[i].isIntersecting) {
      target.classList.add("active");
      target.style.backgroundColor = "#FF0000";
      navMenu.childNodes[sectionId].style.backgroundColor = "#FF0000";
    } else {
      target.style.backgroundColor = "";
      navMenu.childNodes[sectionId].style.backgroundColor = "";
    }
  }
};

// configure listener once the page has been loaded
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  buildNav();

  // Register each section to the observer
  sections.forEach((section) => observer.observe(section));
});
