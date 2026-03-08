const input = document.querySelector("input");
const textWindow = document.querySelector(".text-window");
const scoreEl = document.querySelector(".score");

input.focus();

async function fetchWordsArray(callback) {
  const res = await fetch("./01-10k-words.txt");
  const data = await res.text();
  const array = data.split("\n");
  callback(array);
}

function start(wordCount) {
  fetchWordsArray((wordsArray) => {
    const paragraphArray = [];
    let wordIndex = 0;
    let score = 0;
    let currentWord = "";

    for (let i = 0; i < wordCount; i++) {
      const rnd = Math.floor(Math.random() * wordsArray.length);
      paragraphArray.push(wordsArray[rnd]);
    }

    paragraphArray.forEach((word) => {
      textWindow.innerHTML += ` <span>${word}</span>`;
    });

    scoreEl.innerText = score;
    currentWord = paragraphArray[0];
    [...textWindow.children][wordIndex].style.color = "blue";

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (input.value == currentWord) {
          currentWord = paragraphArray[++wordIndex];
          input.value = "";
          scoreEl.innerText = ++score;
        }
        const nextWord = [...textWindow.children][wordIndex];
        if (nextWord) {
          nextWord.style.color = "blue";
        }
        [...textWindow.children][wordIndex - 1].style.color = "green";
      }
    });
  });
}

start(1);
