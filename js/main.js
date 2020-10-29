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
async function renderPeople(charL) {
  const characters = document.querySelectorAll(".character-list > ul > li");
  const characterL = document.querySelector(".character-list > ul");
  characterL.innerHTML =
    "<li></li><li></li><li></li><li></li><li></li><li></li>";

  for (let i = 0; i < characters.length; i++) {
    console.log(charL[i]);
    characters[i].innerHTML = charL[i];
  }
}
makeReqPeople();
