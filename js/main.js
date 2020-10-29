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
  console.log(t);
  while (t.next != null) {
    t = await fetchData(t.next);
    for (current of t.results) {
      temp.push(current);
    }
    console.log(temp);
  }
  return temp;
}
const people = makeReqPeople();

console.log(people[0].name);
