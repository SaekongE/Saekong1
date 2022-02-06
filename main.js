// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!
// 랜덤번호가 > 유저번호 Up!
// Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다

let computerNum = 0;
let playButton = document.getElementById("play-button");
let chanceArea = document.getElementById("chance-area");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chances = 6;
let gameOver = false;
let wellDone = false;
let userValueList = [];

chanceArea.innerHTML = `남은 찬스 : ${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);


function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1~100 사이의 숫자를 입력하세요";
    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }

  chances--;
  chanceArea.innerHTML = `남은 찬스 : ${chances}`;
  userValueList.push(userValue);
  console.log(userValueList)

  if (userValue < computerNum) {
    resultAreaImg.src =
      "https://media.giphy.com/media/4HvpyPwMBnSBNjcYRB/giphy.gif";
    resultText.textContent = "UP!";
  } else if (userValue > computerNum) {
    resultAreaImg.src = "https://media.giphy.com/media/3oz8xtd06ZcBwP4yFW/giphy.gif";
    resultText.textContent = "DOWN!";
  } else {
    resultAreaImg.src =
      "https://media.giphy.com/media/kBZBlLVlfECvOQAVno/giphy.gif";
    resultText.textContent = "정답입니다";
    wellDone = true;
  }

  if (chances < 1) {
    resultText.textContent = "실패했습니다! 리셋 버튼을 눌러 다시 도전하세요";
    gameOver = true;
  }

  if (gameOver == true) {
    resultAreaImg.src =
    "https://media.giphy.com/media/1lvvpG7Xa5LGQa06dJ/giphy.gif";
    playButton.disabled = true;
  }
}

function reset() {
    //리셋
    pickRandomNum();
    userValueList.value = "";
    userInput.value = "";
    resultAreaImg.src =
      "https://media.giphy.com/media/82V56plzMHkVfJLvvI/giphy.gif";
    resultText.textContent = "UP&DOWN 결과를 보고, 6번의 찬스 안에 숫자를 예측하세요";
    gameOver = false;
    playButton.disabled = false;
    chances = 6;
    chanceArea.innerHTML = `남은 찬스 : ${chances}`;
    userValueList = [];
  }
  

function focusInput() {
  userInput.value = "";
}

pickRandomNum();
