let user = { username: "", score: 0 }
let usersArray = JSON.parse(localStorage.getItem("users")) || []
let images = document.getElementsByClassName("img-box")

let flags = [
  "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
  "https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-2048x1434.jpg",
  "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
  "https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
  "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-2048x1434.jpg"
];

let start = document.getElementById("start-btn")
let username = document.getElementById("username")
let playArea = document.getElementById("play-area")
let mainMenu = document.getElementById("main-menu")
let gameEnd = document.getElementById("game-end")
let finishTime = document.getElementById("play-time")
let redirectUserBtn = document.getElementById("redirect-btn")
let playMode = document.getElementById("difficulty")
let resultText = document.getElementById("game-result")
let currentPlayer = document.getElementById("currently-playing")
let rankingPlayer = document.getElementById("ranking")
let playAgainBtn = document.getElementById("play-again-btn")



start.addEventListener("click", startGame)
redirectUserBtn.addEventListener("click", goToMainPage)
playAgainBtn.addEventListener("click", playAgain)
playMode.addEventListener('change', selectLevel)

let flag1 = undefined;
let flag2 = undefined;
let guessCount = 0;
let playTime = 0;
let level = "easy";

function showUsers() {
  usersArray = JSON.parse(localStorage.getItem("users")) || []
  let sortedUsersArray = usersArray.sort((a, b) => a.score - b.score);
  for (let user of sortedUsersArray) {
    let player = document.createElement("p")
    player.innerText = user.username + " : " + user.score.toString() + "seconds"
    rankingPlayer.insertAdjacentElement("beforeend", player);
  }
}
showUsers()

function selectLevel(e) {
  level = e.target.value
}

function startGame() {
  if (username.value.length) {
    user.username = username.value
    playTime = 0;
    playArea.classList.remove("hidden")
    mainMenu.classList.add("hidden")
    currentPlayer.innerText = user.username + " currently playing"
    setInterval(() => {
      playTime += 1

    }, 1000);
    for (let img of images) {
      displayImages(img)
      img.addEventListener("click", showFlag);

      setTimeout(function () {
        img.style.backgroundColor = "white"
        img.style.backgroundImage = "none"
      }, 3000)
    }
  } else {
    alert("Fill the fields")
  }
}


function displayImages(box) {
  let num = Math.floor(Math.random() * (flags.length))
  box.style.backgroundImage = `url(${flags[num]})`;
  box.setAttribute("flag", flags[num])
  flags.splice(num, 1)
}


function showFlag(e) {
  let box = e.target;
  box.style.backgroundImage = `url(${box.getAttribute("flag")})`;

  if (flag1 === undefined) {
    flag1 = box
  } else {
    flag2 = box
  }
  if (flag1 && flag2) {
    deletePointerEvents()
    if (flag1.getAttribute("flag") === flag2.getAttribute("flag")) {
      flag1.setAttribute("guessed", true)
      flag2.setAttribute("guessed", true)
      flag1 = undefined;
      flag2 = undefined;
      guessCount += 1
      addPointerEvents()
    } else {
      if (level === "hard") {
        gameEnd.classList.remove("hidden")
        playArea.classList.add("hidden")
        resultText.innerText = "You lose"
        currentPlayer.innerText = ""
      }
      setTimeout(() => {
        flag1.style.backgroundImage = "none"
        flag2.style.backgroundImage = "none"
        flag1 = undefined;
        flag2 = undefined;
        addPointerEvents()
      }, 1000)
    }
  } if (guessCount === 8) {
    resultText.innerText = "You won"
    gameEnd.classList.remove("hidden")
    playArea.classList.add("hidden")
    displayFinishTime()
    user.score = playTime
    usersArray.push(user)
    localStorage.setItem("users", JSON.stringify(usersArray))
    rankingPlayer.innerHTML = ""
    currentPlayer.innerText = ""
    showUsers()
  }
}

function displayFinishTime() {
  finishTime.innerText = playTime.toString() + " " + "seconds"
}

function goToMainPage(e) {
  mainMenu.classList.remove("hidden")
  gameEnd.classList.add("hidden")

  flag2 = undefined;
  flag1 = undefined;
  flags = [
    "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
    "https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-2048x1434.jpg",
    "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
    "https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-2048x1434.jpg"
  ];
  guessCount = 0;
  username.value = ""
}

function playAgain() {
  playTime = 0
  guessCount = 0
  flag2 = undefined;
  flag1 = undefined;
  flags = [

    "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
    "https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-2048x1434.jpg",
    "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
    "https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-2048x1434.jpg"
  ];
  startGame()
  playArea.classList.remove("hidden")
  gameEnd.classList.add("hidden")
  for (let img of images){
    img.removeAttribute("guessed")
  } 
  addPointerEvents()
}

function deletePointerEvents() {
  for (let img of images) {
    img.style.pointerEvents = "none"
  }
}

function addPointerEvents() {
  for (let img of images) {
    if (!img.getAttribute("guessed")) {
      img.style.pointerEvents = "auto"
    }
  }
}
