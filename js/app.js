/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// Nav Menu Global Variables
const navMenu = document.getElementById("navbar__list");
const sections =document.querySelectorAll("section");
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 

*/

// build the nav
const buildNav= () => {
    let navUI = "";
    //for loop to create sections as number of sections in HTML file
    for (let i=0; i < sections.length; i++) {
        const sectionId = sections[i].getAttribute('id');
        const sectionName = sections[i].getAttribute('data-nav');
        navUI += `<li><a class= "menu__link" href= "#${sectionId}">${sectionName}</a></li>`
        navMenu.innerHTML = navUI;        
    }
    //add fragment document to ul in HTML file
    const navBarList = document.getElementById('navbar__list')
    // appending element to the navBarList
    navBarList.appendChild(fragment);
};
  

buildNav();           

// Getting the largest value that's less or equal to the number
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
 };

 // add the active class
const addActive = (conditional, section) => {
    if(conditional) {
        section.classList.add('your-active-class');
        section.style.cssText = "background-color: #FF0000";
        const sectionId = section.id.slice(7,8) -1;
        //add background-color to active navigation 
        navMenu.childNodes[sectionId].style.cssText="background-color:#FF0000";


    };
};

 // remove the active class
const removeActive = (section) => {
    section.classList.remove('your-active-class');
    section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
    const sectionId = section.id.slice(7,8) -1;
    //remove background-color to active navigation 
    navMenu.childNodes[sectionId].style.cssText="background-color:white";

};

//implementating the sectionActivation function


const sectionActivation = () => {
    sections.forEach(section => {
        const elementOffset = offset(section);

        inviewport = () => elementOffset < 150 && elementOffset >= -150;

        removeActive(section);
        addActive(inviewport(),section);
    });
};

window.addEventListener('scroll' ,sectionActivation);

// Scroll to anchor ID using scrollTO event

const scrolling = () => {

    const links = document.querySelectorAll('.navbar__menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            for(i = 0 ; i<sections ; i++){
                sections[i].addEventListener("click",sectionScroll(link));
                link.preventDefault();
                document.querySelector(this.getAttribute('link')).scrollIntoView({
                    behavior: 'smooth'
                })
            }
        });
    });

};

scrolling();


// End of Code