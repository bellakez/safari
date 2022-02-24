//nøgle
const url = "https://safari-0f78.restdb.io/rest/safari";
const key = "620e46b034fd621565858728";
let safari;
let filter = "alle";
const filtrerKnap = document.querySelectorAll("#banner button");
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
      klon.querySelector("article").addEventListener("click", () => {
        location.href = `safari-singleview.html?id=${tur._id}`;
      });

      /*klon.querySelector("img").src = "medium/" + kategori.md;*/
      container.appendChild(klon);
    }
  });
}

// BACK TO TOP

//Get the button:
mybutton = document.getElementById("myBtn");

//Når brugeren scroller 20px ned fra top af dokumentet, viser knappen (button) sig
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

//Når brugeren klikker på knappen (button), scroller den til toppen af dokumentet
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

//Pop up/Modal//
const modal = document.querySelector("#modal");
const btn = document.querySelector("#modal button");
document.querySelector(".logo2").addEventListener("click", visDetaljer);

function visDetaljer() {
  modal.style.display = "flex";
}
document
  .querySelector("#modal button")
  .addEventListener("click", () => (modal.style.display = "none"));
