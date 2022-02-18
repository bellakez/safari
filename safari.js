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
      klon.querySelector("h3").textContent = tur.pris + " kr.";
      klon.querySelector(".area").textContent = tur.område;
      klon.querySelector("p").textContent = tur.kort;
      klon.querySelector("img").src = `billeder/${tur.billede}-md.jpg`;
      /*___kald til at åbne i ny side_____*/
      klon.querySelector("article").addEventListener("click", () => {
        location.href = `babushka-singleview.html?id=${tur._id}`;
      });

      /*klon.querySelector("img").src = "medium/" + kategori.md;*/
      container.appendChild(klon);
    }
  });
}
