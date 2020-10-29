async function renderDetails(charL) {
  let t = await fetchData(charL.homeworld);
  const details = document.querySelector(".character-details");
  const planets = document.querySelector(".planet-details");
  await console.log(t);
  details.innerHTML =
  `<h4>${charL.name}</h4><p>${charL.height}</p><p>${charL.mass}</p><p>${charL.hair_color}</p><p>${charL.skin_color}</p><p>${charL.eye_color}</p><p>${charL.birth_year}</p><p>${charL.gender}</p>`;
  planets.innerHTML = `<h4>${t.name}</h4><p>${t.rotation_period}</p><p>${t.orbital_period}</p><p>${t.diameter}</p><p>${t.climate}</p><p>${t.gravity}</p><p>${t.terrain}</p>`
}
async function renderPeople(charL) {
  const characterL = document.querySelector(".character-list > ul");
  characterL.innerHTML =
    "<li></li><li></li><li></li><li></li><li></li><li></li>";
  const characters = document.querySelectorAll(".character-list > ul > li");

  for (let i = 0; i < characters.length; i++) {
    characters[i].innerText = charL[i].name;
    characters[i].addEventListener("click", function () {
      renderDetails(charL[i]);
    });
  }
}

async function fetchData(url) {
  //document.querySelector("").classList.remove("hidden");
  let request = await fetch(url);
  data = await request.json();
  //console.log(data.next);
  return data;
}
async function makeReqPeople() {
  let t = await fetchData("https://swapi.dev/api/people/");
  temp = [];
  for (current of t.results) {
    temp.push(current);
  }
  while (t.next != null) {
    t = await fetchData(t.next);
    for (current of t.results) {
      temp.push(current);
    }
  }
  await renderPeople(temp);
}

makeReqPeople();
