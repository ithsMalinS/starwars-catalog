let counter = 0

async function renderDetails(charL) {
  let t = await fetchData(charL.homeworld);
  const details = document.querySelector(".character-details");
  const planets = document.querySelector(".planet-details");
  await console.log(t);
  details.innerHTML =
  `<h4>${charL.name}</h4><p>Height: ${charL.height} cm</p><p>Mass: ${charL.mass} kg</p><p>Hair color: ${charL.hair_color}</p><p>Skin color: ${charL.skin_color}</p><p>Eye color: ${charL.eye_color}</p><p>Birth year: ${charL.birth_year}</p><p>Gender: ${charL.gender}</p>`;
  planets.innerHTML = `<h4>${t.name}</h4><p>Rotation period: ${t.rotation_period} hours</p><p>Orbital period: ${t.orbital_period} days</p><p>Diameter: ${t.diameter} km</p><p>Climate: ${t.climate}</p><p>Gravity: ${t.gravity}</p><p>Terrain: ${t.terrain}</p>`
}
async function renderPeople(charL) {
  const characterL = document.querySelector(".character-list > ul");
  characterL.innerHTML =
    "<li></li><li></li><li></li><li></li><li></li><li></li>";
  const characters = document.querySelectorAll(".character-list > ul > li");

  for (let i = 0; i < characters.length; i++) {
    characters[i].innerText = charL[i].name;
    characters[i].addEventListener("click", function () {
      for(character of characters) {
        character.classList.remove('chosen-character')
      }
      renderDetails(charL[i]);
      characters[i].classList.add("chosen-character")
      //characters[i].innerText += '▸'
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
