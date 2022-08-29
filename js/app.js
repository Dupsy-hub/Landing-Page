// Nav Menu Global Variables
const navMenu = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// build the nav
const buildNav = () => {
  //for loop to create sections as number of sections in HTML file
  for (let i = 0; i < sections.length; i++) {
    const sectionId = sections[i].getAttribute("id");
    const sectionName = sections[i].getAttribute("data-nav");
    navMenu.innerHTML += `<li><a class= "menu__link" href= "#${sectionId}">${sectionName}</a></li>`;
  }
};

// Getting the largest value that's less or equal to the number
const offset = (section) => {
  return Math.floor(section.getBoundingClientRect().top);
};

// add the active class
const addActiveSection = (conditional, section) => {
  if (conditional) {
    section.classList.add("active");
    section.style.backgroundColor = "#FF0000";
    // extract index from section id
    const sectionId = +section.id[section.id.length - 1] - 1;
    //add background-color to active navigation
    navMenu.childNodes[sectionId].style.backgroundColor = "#FF0000";
  }
};

// remove the active class
const removeActiveSection = (section) => {
  section.classList.remove("active");
  section.style.backgroundColor = "";
  // extract index from section id
  const sectionId = +section.id[section.id.length - 1] - 1;
  //remove background-color to active navigation
  navMenu.childNodes[sectionId].style.backgroundColor = "white";
};

// implementing the sectionActivation function
const sectionActivation = () => {
  sections.forEach((section) => {
    const elementOffset = offset(section);

    removeActiveSection(section);
    addActiveSection(elementOffset < 150 && elementOffset >= -150, section);
  });
};

// scroll to anchor ID using scrollTO event
const scrolling = () => {
  const links = document.querySelectorAll(".navbar__menu a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      for (i = 0; i < sections; i++) {
        sections[i].addEventListener("click", sectionScroll(link));
        event.preventDefault();
        document.querySelector(this.getAttribute("link")).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
};

// configure listener once th epage has been loaded
document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  scrolling();

  window.addEventListener("scroll", sectionActivation);
});
