const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");
//querySelector는 클래스, id, 태그 모두 가능.

const USER = "currentUser";
const SHWOING = "showing";

function saveName(text) {
  localStorage.setItem(USER, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue); //입력한 이름 저장하기
}

function askForName() {
  form.classList.add(SHWOING);
  //from submit의 새로고침 없애기
  form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text) {
  //텍스트를 색칠하려면 form을 숨겨야 함
  form.classList.remove(SHWOING);
  greeting.classList.add(SHWOING);
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() { //입력한 이름 불러오기
  const currentUser = localStorage.getItem(USER);

  if (currentUser == null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();


//localStorage.setItem("name", true);
//localStorage.getItem("name"); => true