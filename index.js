const dates = [
  {
    class: "days",
    label: "Days",
  },
  {
    class: "hours",
    label: "Hours",
  },
  {
    class: "minutes",
    label: "Minutes",
  },
  {
    class: "seconds",
    label: "Seconds",
  },
];

const countdown = document.querySelector(".countdown");
const toDate = new Date().setHours(new Date().getFullYear(), 6, 30, 22);

let prev;

function showTimer() {
  dates.forEach((element) => {
    const newdiv = document.createElement("div");
    newdiv.classList.add(element.class);
    newdiv.innerHTML = `
        <div class="flip-card">
          <div class="top">00</div>
          <div class="bottom">00</div>
        </div>
        <p class="title">${element.label}</p>
      `;

    countdown.append(newdiv);
  });
}

showTimer();

setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.floor((toDate - currentDate) / 1000);
  if (timeBetweenDates !== prev) {
    flipAllCards(timeBetweenDates);
  }
  prev = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const days = Math.floor(time / (24 * 3600));
  const hours = Math.floor((time / 3600) % 24);
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  const daysCard = document.querySelector(".days > .flip-card");
  const hoursCard = document.querySelector(".hours > .flip-card");
  const minutesCard = document.querySelector(".minutes > .flip-card");
  const secondsCard = document.querySelector(".seconds > .flip-card");

  flipCard(daysCard, days);
  flipCard(hoursCard, hours);
  flipCard(minutesCard, minutes);
  flipCard(secondsCard, seconds);
}

function flipCard(flipCard, time) {
  time = String(time).padStart(2, "0");
  const currentValue = flipCard.querySelector(".top").innerText;

  if (time == currentValue) return;

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  topFlip.innerText = currentValue;

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");
  bottomFlip.innerText = time;

  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");

  topFlip.addEventListener("animationstart", () => {
    topHalf.innerText = time;
  });

  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.innerText = time;
    bottomFlip.remove();
  });

  flipCard.appendChild(topFlip);
  flipCard.appendChild(bottomFlip);
}
