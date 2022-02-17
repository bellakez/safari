//nøgle
const url = "https://safari-0f78.restdb.io/rest/safari";
const key = "620e46b034fd621565858728";
let menu;
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
  filter = this.dataset.menu;
  console.log("filter", filter);
  document.querySelector("h1").textContent = this.textContent;

  vis();
}
//henter data fra json io
async function hentdata() {
  console.log("her er json");
  const respons = await fetch(url, options);
  menu = await respons.json();
  vis();
}

//definere at container er section og at temp er template
const container = document.querySelector("section");
const temp = document.querySelector("template");

function vis() {
  console.log(menu);
  container.innerHTML = "";
  menu.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      /*____klon er altså alt inde i template 'temp'_____*/
      const klon = temp.cloneNode(true).content;
      klon.querySelector("h2").textContent = ret.navn;
      klon.querySelector("h3").textContent = ret.pris + " kr.";
      klon.querySelector("p").textContent = ret.kortbeskrivelse;
      klon.querySelector("img").src = `medium/${ret.billednavn}-md.jpg`;
      /*___kald til at åbne i ny side_____*/
      klon.querySelector("article").addEventListener("click", () => {
        location.href = `babushka-singleview.html?id=${ret._id}`;
      });

      /*klon.querySelector("img").src = "medium/" + kategori.md;*/
      container.appendChild(klon);
    }
  });
}
