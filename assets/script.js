const menuLinks = document.querySelector(".nav-links")
const pixel = document.getElementById("pixel-logo")
const pixelCircle = document.getElementById("pixelCircle")
const miniBox = document.querySelectorAll(".mini-box")
const icon = document.querySelector(".hamburger-icon")
const typeds_1 = document.getElementById("typed-1")
const typeds_2 = document.getElementById("typed-2")
const mediaQuery = window.matchMedia("(max-width: 1250px)")
const En_ES = document.getElementById("en_es")
const buttonDisplay = document.querySelector(".button-display")
const languageArrow = document.querySelector("#language-arrow")
const quickButton = document.querySelector(".quick-button")

let startTimer, endTimer
let isTyping = false
let isTyping_2 = true
let firstEnter = false

const originalTexts = {};
document.querySelectorAll("[data-key]").forEach(el => {
  originalTexts[el.getAttribute("data-key")] = el.textContent
});

async function setLanguage(lang) {
  if (lang === "es") {
    const res = await fetch("/data/lang/es.json")
    const texts = await res.json()

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key")
      el.textContent = texts[key]
    });

    quickButton.firstElementChild.href = "assets/pdf/CV Neithan O. Brito_2025.pdf"
  } else {
    
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key")
      el.textContent = originalTexts[key]
    });
    quickButton.firstElementChild.href = "assets/pdf/CV Neithan O. Brito.pdf"
  }

  localStorage.setItem("lang", lang);
}

function Buttondisplay() {
  buttonDisplay.classList.toggle("display")
  languageArrow.classList.toggle("rotate")
}

icon.addEventListener('click', () => {
  menuLinks.classList.toggle("active")
  icon.classList.toggle("open")
})

function togglePixel() {
  pixelCircle.classList.toggle("hover")
  
  clearTimeout(startTimer);
  clearTimeout(endTimer);

  if (!firstEnter) {
    
    pixel.classList.add("opac");

    startTimer = setTimeout(() => {
      pixel.src = "assets/imgs/closer-pixel.png";
      pixel.classList.remove("opac");
      pixel.classList.add("closer");
    }, 850);

    
    firstEnter = true;
  } else {
    
    pixel.classList.remove("closer");
    pixel.classList.add("opac");

    endTimer = setTimeout(() => {
      pixel.src = "assets/imgs/normal-pixel.png";
      pixel.classList.remove("opac");
    }, 320);

    firstEnter = false;
  }
}

function handleScreen(){
  
  if(mediaQuery.matches && isTyping_2){
    typed_1.destroy()
    typeds_1.innerText="Continuing mastering..."
    isTyping_2 = false
}
  else{
    typed_1 = new Typed('#typed-1', {
  strings: ['Further mastering', 'Leveling up!', 'Refining skills'],
  typeSpeed: 75,
    backSpeed: 50,
    shuffle: true,
    smartBackspace: false,
    loop: true,
})

isTyping_2 = true
  }
  

}


if(window.innerWidth > 1249){
  typed_1 = new Typed('#typed-1', {
  strings: ['Further mastering', 'Leveling up!', 'Refining skills'],
  typeSpeed: 75,
    backSpeed: 50,
    shuffle: true,
    smartBackspace: false,
    loop: true,
})
}
else{
  typeds_1.innerText = "Continuing mastering..."
}


function typedfunc(){
typeds_2.innerText = ""
if(!isTyping){
  typed_2 = new Typed('#typed-2', {
  strings: ['Learning phase', 'Currently improving', 'Working on it!'],
  typeSpeed: 60,
    backSpeed: 55,
    loop: true,
})
isTyping = true
}
else{
  typed_2.destroy()
  typeds_2.innerText = "Working on it!"
  isTyping = false
}
}



miniBox.forEach(box => {
  let test = box.firstElementChild
  box.addEventListener('mouseenter', () =>{
    test.style.color = box.dataset.color
    test.src = box.dataset.color
  })
  box.addEventListener('mouseleave', () =>{
    test.style.color = "#fff"
    test.src = box.dataset.default
  })

});


fetch("./data/projects.json")
  .then(a => a.json())
  .then(data => {
    const container = document.getElementById("cards-container");
    data.forEach((p, index) => {

      const imagesId = `img-${index}`;

      container.innerHTML += `
        <div class="card bg-secondary">
          <img id="${imagesId}" src="${p.images[0]}" alt="${p.name}" class="card-img">
          <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <div id="programming-container">
          ${p.languages
    .map(ele => `<div class="programming-lan">${ele}</div>`)
    .join('')}
    </div>
          <p data-key="card-text">${p.description}</p>
          <div class="card-buttons-container">
          <a href="${p.link_git}"><button class="card-button-1" type="button"><i class="fa-brands fa-github"></i> GitHub</button></a>
          <a href="${p.link_live}"><button class="card-button-2" type="button"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</button></a>
          </div>
          </div>
        </div>`;

      let imgIndex = 0;
      setInterval(() => {
        let imgEl = document.getElementById(imagesId);
        imgEl.classList.add("opac")

        setTimeout(() => {
        imgIndex = (imgIndex + 1) % p.images.length;
        imgEl.src = p.images[imgIndex];
        imgEl.classList.remove("opac")
        }, 500)
      }, 4000);
      
  });
});







pixelCircle.addEventListener("mouseenter", togglePixel)

typeds_2.addEventListener('click', typedfunc)

mediaQuery.addEventListener('change', handleScreen);

En_ES.addEventListener('click', Buttondisplay)

document.getElementById("es").onclick = () => setLanguage("es");

document.getElementById("en").onclick = () => setLanguage("en");


setLanguage(localStorage.getItem("lang") || "en");