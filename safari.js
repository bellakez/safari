//nøgle
const url = "https://safari-0f78.restdb.io/rest/safari";
const key = "620e46b034fd621565858728";
let safari;
let filter = "alle";
const filtrerKnap = document.querySelectorAll("button");
//const modal = document.querySelector("#modal");

const options = {
  headers: {
    "x-apikey": key,
  },
};
//loader dommen før funktionen start kommer
document.addEventListener("DOMContentLoaded", start);

//definere funktionen start, som definere at man klikker på knap
function start() {
  filtrerKnap.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  hentdata();
}

//definere funktionen filtrerkategori, som betyder at for hver knap tildeles h1 en kategori
function filtrerKategori() {
  filter = this.dataset.safari;
  console.log("filter", filter);
  document.querySelector("h1").textContent = this.textContent;

  vis();
}
//henter data fra json io
async function hentdata() {
  console.log("her er json");
  const respons = await fetch(url, options);
  safari = await respons.json();
  vis();
}

//definere at container er section og at temp er template
const container = document.querySelector("section");
const temp = document.querySelector("template");

function vis() {
  console.log(safari);
  container.innerHTML = "";
  safari.forEach((tur) => {
    if (filter == tur.kategori || filter == "alle") {
      /*____klon er altså alt inde i template 'temp'_____*/
      const klon = temp.cloneNode(true).content;
      klon.querySelector("h2").textContent = tur.varighed;
      klon.querySelector(".area").textContent = "Tur til " + tur.område;
      klon.querySelector("p").textContent = tur.kort;
      klon.querySelector("img").src = `billeder/${tur.billede}-md.jpg`;
      /*___kald til at åbne i ny side_____*/
      klon.querySelector(".box button").addEventListener("click", () => {
        location.href = `safari-singleview.html?id=${tur._id}`;
      });

      /*klon.querySelector("img").src = "medium/" + kategori.md;*/
      container.appendChild(klon);
    }
  });
}

// BURGER MENU

document.querySelector("#open").addEventListener("click", openMenu);
document.querySelector("#close").addEventListener("click", closeMenu);

function openMenu() {
  document.querySelector(".menu").style.transform = "translateY(0)";
  document.querySelector("#open").classList.add("hide");
  document.querySelector("#close").classList.remove("hide");
}

function closeMenu() {
  document.querySelector(".menu").style.transform = "translateY(-100%)";
  document.querySelector("#open").classList.remove("hide");
  document.querySelector("#close").classList.add("hide");
}

// BACK TO TOP

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Slideshow//
var slideIndex = 0;
skift();

function skift() {
  var i;
  var x = document.getElementsByClassName("animalSlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(skift, 4000); //Tid på billederne//
}
