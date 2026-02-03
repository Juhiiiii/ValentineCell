let escapeCount = 0;
let yesScale = 1;
let lastEscapeTime = 0;
let hasSaidYes = false;
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const message = document.getElementById("message");
const buttonsArea = document.querySelector(".buttons");
const mainText = document.getElementById("mainText");


let blinkTimeout;

function startEvilBlinking() {
  if (hasSaidYes) return;

  // After 7 seconds → show marriage text
  blinkTimeout = setTimeout(() => {
    if (hasSaidYes) return;

    mainText.classList.remove("blink");
    void mainText.offsetWidth;

    mainText.innerHTML = "Ashish, Will you marry me? 💍";
    mainText.classList.add("blink");

    // After 3 seconds → revert back
    blinkTimeout = setTimeout(() => {
      if (hasSaidYes) return;

      mainText.classList.remove("blink");
      void mainText.offsetWidth;

      mainText.innerHTML = "Ashish, Will you be my Valentine? 💘";
      mainText.classList.add("blink");

      // 🔁 Repeat cycle
      startEvilBlinking();

    }, 3000);

  }, 7000);
}

// START blinking on page load
startEvilBlinking();



buttonsArea.addEventListener("mousemove", (e) => {
  const now = Date.now();
  const noRect = noBtn.getBoundingClientRect();

  const noCenterX = noRect.left + noRect.width / 2;
  const noCenterY = noRect.top + noRect.height / 2;

  const dx = noCenterX - e.clientX;
  const dy = noCenterY - e.clientY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  // If cursor is close → RUN
  if (distance < 160) {
     lastEscapeTime = now;
    const angle = Math.atan2(dy, dx);

    const moveX = Math.cos(angle) * 120;
    const moveY = Math.sin(angle) * 90;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    escapeCount++;

    yesScale += 0.0007; // slow growth
    yesBtn.style.transform = `scale(${yesScale})`;

    //if (escapeCount === 200) {
      //noBtn.innerText = "Why are you like this? 😩";
    //}

  }
});

yesBtn.addEventListener("click", () => {
  hasSaidYes = true;
  clearTimeout(blinkTimeout);

  mainText.innerHTML = "Ashish, Will you marry me? 💍";
  mainText.classList.remove("shake");
  void mainText.offsetWidth; // force reflow
  mainText.classList.add("shake");

  message.innerHTML = "YES! YAYYY 💖 I knew it, Ashish 😍 You just made me the happiest girl 💖";
  // document.getElementById("video").style.display = "block";
  document.querySelector(".videos").style.display = "flex";
  launchHearts();
  // launchConfetti();
  playMusic();
});


function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.top = Math.random() * window.innerHeight + "px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.opacity = Math.random();
    confetti.style.zIndex = 1000;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}

// function launchHearts() {
//   for (let i = 0; i < 30; i++) {
//     const heart = document.createElement("div");
//     heart.innerText = "💖";
//     heart.style.position = "fixed";
//     heart.style.fontSize = `${Math.random() * 12 + 18}px`;
//     heart.style.left = Math.random() * window.innerWidth + "px";
//     heart.style.bottom = "-20px";
//     heart.style.opacity = Math.random();
//     heart.style.transition = "transform 3s ease-out, opacity 3s ease-out";
//     heart.style.zIndex = 1000;

//     document.body.appendChild(heart);

//     setTimeout(() => {
//       heart.style.transform = `translateY(-${Math.random() * 600 + 300}px)`;
//       heart.style.opacity = 0;
//     }, 100);

//     setTimeout(() => heart.remove(), 3200);
//   }
// }
function launchHearts() {
  for (let i = 0; i < 60; i++) {
    const heart = document.createElement("div");
    heart.innerText = Math.random() > 0.5 ? "💖" : "💗";

    const size = Math.random() * 14 + 18;

    heart.style.position = "fixed";
    heart.style.fontSize = `${size}px`;
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";
    heart.style.opacity = 1;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = 1000;
    heart.style.transition =
      "transform 2.8s ease-out, opacity 2.8s ease-out";

    document.body.appendChild(heart);

    const xMove = Math.random() * 400 - 200;
    const yMove = Math.random() * 700 + 300;

    setTimeout(() => {
      heart.style.transform = `translate(${xMove}px, -${yMove}px) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = 0;
    }, 50);

    setTimeout(() => heart.remove(), 3000);
  }
}


const noMessages = [
  "Nice try 😌",
  "Almost… but no 💅",
  "Not happening 😏",
  "You’re persistent 👀",
  "Still no escape 😈"
];

noBtn.addEventListener("click", () => {
  const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
  noBtn.innerText = msg;

  setTimeout(() => {
    noBtn.innerText = "No ❌";
  }, 1000);
});

function playMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.6;
  music.play();
}

let lastHeartTime = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastHeartTime < 50) return; // controls frequency
  lastHeartTime = now;

  const heart = document.createElement("div");
  heart.innerText = "💖";

  heart.style.position = "fixed";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  heart.style.fontSize = "14px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = 999;
  heart.style.opacity = 0.9;
  heart.style.transition =
    "transform 1s ease-out, opacity 1s ease-out";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.transform = "translateY(-30px)";
    heart.style.opacity = 0;
  }, 20);

  setTimeout(() => heart.remove(), 1000);
});
