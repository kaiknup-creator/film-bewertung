const categories = ["Story","Bilder","Schauspieler","Ton","Musik","Regie","Spezialeffekte"];
const ratingsDiv = document.getElementById("ratings");
const listDiv = document.getElementById("list");

categories.forEach(c => {
  ratingsDiv.innerHTML += `
    <label>${c}: <span id="${c}Val">3</span></label>
    <input type="range" min="1" max="6" value="3" id="${c}" oninput="calc()">
  `;
});

function calc() {
  let sum = 0;
  categories.forEach(c => {
    const v = +document.getElementById(c).value;
    document.getElementById(c+"Val").innerText = v;
    sum += v;
  });
  const total = ((sum / categories.length) * 10 / 6).toFixed(1);
  const el = document.getElementById("total");
  el.innerText = total;
  el.className = total >= 7 ? "green" : total >= 5 ? "yellow" : "red";
}

calc();

function save() {
  const item = {
    type: type.value,
    title: title.value,
    season: season.value,
    episode: episode.value,
    total: parseFloat(total.innerText)
  };

  const data = JSON.parse(localStorage.getItem("ratings") || "[]");
  data.push(item);
  localStorage.setItem("ratings", JSON.stringify(data));
  render();
}

function render() {
  const data = JSON.parse(localStorage.getItem("ratings") || "[]");
  data.sort((a,b) => b.total - a.total);

  listDiv.innerHTML = "";
  data.forEach((d,i) => {
    listDiv.innerHTML += `
      <div class="card">
        <strong>${i+1}. ${d.title}</strong><br>
        ${d.type} ${d.season ? "S"+d.season : ""} ${d.episode ? "E"+d.episode : ""}<br>
        <span class="${d.total>=7?"green":d.total>=5?"yellow":"red"}">
          ${d.total} / 10
        </span>
        <button class="delete" onclick="del(${i})">🗑️ Löschen</button>
      </div>
    `;
  });
}

function del(i) {
  const data = JSON.parse(localStorage.getItem("ratings"));
  data.splice(i,1);
  localStorage.setItem("ratings", JSON.stringify(data));
  render();
}

function exportExcel() {
  let csv = "Typ,Titel,Staffel,Episode,Gesamt\n";
  const data = JSON.parse(localStorage.getItem("ratings") || "[]");
  data.forEach(d => {
    csv += `${d.type},${d.title},${d.season},${d.episode},${d.total}\n`;
  });

  const blob = new Blob([csv], {type: "text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bewertungen.csv";
  a.click();
}

render();
