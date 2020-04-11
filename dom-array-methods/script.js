const main = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleMoneyButton = document.getElementById("double");
const sortMoneyButton = document.getElementById("sort");
const showMillionairesButton = document.getElementById("show-millionaires");
const calculateWealthButton = document.getElementById("calculate-wealth");

let data = [];

// get Random User
getRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  let user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addPerson(newUser);
};

// Add person to data array
addPerson = (person) => {
  data.push(person);

  updateDOM();
};

doubleMoney = () => {
  data = data.map((person) => {
    return { ...person, money: person.money * 2 };
  });

  updateDOM();
};

sortByRichest = () => {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM();
};

showMillionaire = () => {
  data = data.filter((person) => person.money > 1000000);

  updateDOM();
};

updateDOM = (providedData = data) => {
  //  clear the main div
  main.innerHTML = " <h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${
      person.name
    }</strong> $${person.money.toLocaleString()}`;
    main.appendChild(element);
  });
};

getRandomUser();
getRandomUser();
getRandomUser();

// Event Listeners
addUserButton.addEventListener("click", getRandomUser);
doubleMoneyButton.addEventListener("click", doubleMoney);
sortMoneyButton.addEventListener("click", sortByRichest);
showMillionairesButton.addEventListener("click", showMillionaire);
