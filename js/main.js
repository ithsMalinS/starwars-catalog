let counter = 0
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const details = document.querySelector(".character-details");
const detailsOutput = document.querySelector(".details2");

prevButton.addEventListener("click", function() {
  const pageCount = document.querySelector(".current-side")
  counter--
  if(counter < 0) {
    counter = 13
  }
  pageCount.innerHTML = counter +1
  makeReqPeople(counter)
})
nextButton.addEventListener("click", function() {
  const pageCount = document.querySelector(".current-side")
  counter++
  if(counter > 13) {
    counter = 0
  }
  pageCount.innerHTML = counter +1
  makeReqPeople()
})

async function renderDetails(charL, t) {
  console.log(t)
  setTimeout(function() {
    details.innerHTML =
    `<h4>${charL.name}</h4><p>Height: ${charL.height} cm</p><p>Mass: ${charL.mass} kg</p><p>Hair color: ${charL.hair_color}</p><p>Skin color: ${charL.skin_color}</p><p>Eye color: ${charL.eye_color}</p><p>Birth year: ${charL.birth_year}</p><p>Gender: ${charL.gender}</p>`;
    detailsOutput.innerHTML = `<h4>${t.name}</h4><p>Rotation period: ${t.rotation_period} hours</p><p>Orbital period: ${t.orbital_period} days</p><p>Diameter: ${t.diameter} km</p><p>Climate: ${t.climate}</p><p>Gravity: ${t.gravity}</p><p>Terrain: ${t.terrain}</p>`
  }, 1000)
}
async function makeReqDetails(charL, namnet) {
  details.innerHTML = '<div class="loader"></div>'
  detailsOutput.innerHTML = '<div class="loader"></div>'
  let t = await fetchData(charL[namnet]);

  renderDetails(charL, t)
}
async function renderPeople(charL) {
  const characterL = document.querySelector(".character-list > ul");
  characterL.innerHTML =
    "<li></li><li></li><li></li><li></li><li></li><li></li>";
    if (counter === 13) {
      characterL.innerHTML =
      "<li></li><li></li><li></li><li></li>";
    }
  const characters = document.querySelectorAll(".character-list > ul > li");

  for (let i = 0; i < characters.length; i++) {
    characters[i].innerHTML = charL[i+(counter*6)].name + '<span class="hidden"> ▸</span>';
    characters[i].addEventListener("click", function () {
      let charSpan = document.querySelectorAll(".character-list span")
      for(let i = 0; i < characters.length; i++) {
        characters[i].classList.remove('chosen-character')
        charSpan[i].classList.add("hidden")
      }
      const NavButton = document.querySelectorAll('.dNavButton')
      for (current of NavButton) {
        current.classList.remove('hidden')
        current.addEventListener("click", function() {
          console.log(current.innerText)
        })
      }
      makeReqDetails(charL[i+(counter*6)], "homeworld");
      characters[i].classList.add("chosen-character")
      const chosenChar = document.querySelector(".chosen-character > span")
      chosenChar.classList.remove("hidden")
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
  const characterL = document.querySelector(".character-list > ul");
  characterL.innerHTML = '<div class="loader"></div>'
  let t = await fetchData("https://swapi.dev/api/people/");
  const temp = [];
  for (current of t.results) {
    temp.push(current);
  }
  while (t.next != null) {
    t = await fetchData(t.next);
    for (current of t.results) {
      temp.push(current);
    }
  }
  console.log(temp)
  await renderPeople(temp);
}

makeReqPeople();
