const container = document.querySelector(".container");
// node list
// will grab the seats in row class that doesnt have occupied class
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// will grab movies price values(it was string so we coerced it to number)
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count of selected seats
updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // copy selected seats into array
  // map through array
  // return a new array of indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //seats index will be an array so we need to make it a string to save
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  // to change the prices dynamically
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Get Data from localStorage and populate UI
function populateUi() {
  //   to get it back as an array, we need to parse
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  //   if (selectedMovieIndex !== null) {
  //     movieSelect.selectedIndex = selectedMovieIndex;
  //   }

  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  if (selectedMoviePrice !== null) {
    ticketPrice = +selectedMoviePrice;
  }
}

// movie select event
movieSelect.addEventListener("change", event => {
  ticketPrice = +event.target.value;

  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

container.addEventListener("click", event => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

populateUi();
// initial count and total set
updateSelectedCount();
