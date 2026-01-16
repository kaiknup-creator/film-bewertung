const categories = [
  "Story", "Bilder", "Schauspieler",
  "Ton", "Musik", "Regie", "Spezialeffekte"
];

const ratingsDiv = document.getElementById("ratings");

categories.forEach(cat => {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>${cat}: <span id="${cat}Val">3</span></label>
    <input type="range" min="1" max="6" value="3"
      oninput="updateTotal()" id="${cat}">
  `;
  ratingsDiv.appendChild(div);
});

function updateTotal() {
  let sum = 0;
  categories.forEach(cat => {
    const val = Number(document.getElementById(cat).value);
    document.getElementById(cat + "Val").innerText = val;
    sum += val;
  });
  const avg = sum / categories.length;
  const total = (avg * 10 / 6).toFixed(1);
  document.getElementById("total").innerText = total;
}

updateTotal();

function saveFilm() {
  const film = {
    name: document.getElementById("filmname").value,
    ratings: {},
    total: document.getElementById("total").innerText
  };
  categories.forEach(cat => {
    film.ratings[cat] = document.getElementById(cat).value;
  });

  const list = JSON.parse(localStorage.getItem("films") || "[]");
  list.push(film);
  localStorage.setItem("films", JSON.stringify(list));

  alert("Film gespeichert 🎉");
}
