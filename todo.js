//const { func } = require('prop-types');

const toDoForm = document.querySelector(".js-toDoForm");
//이전 form의 내용에서 가져오는 것이기에 toDOForm
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO = 'toDo';
let toDo = [];//empty - list will be changing, so let not const



function deleteToDo(event) {

  // 1. delete the html li tag
  //console.log(event.target.parentNode);
  //클릭된 버튼의 부모 요소(parentNode)인 li를 삭제해야 함 
  //delete child element mdn -> removechild
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDo.filter(function (toDo) {// for each element in array
    return toDo.id !== parseInt(li.id);
    //true인 요소에 대해서 새로운 array 생성
  });
  //console.log(cleanToDos);

  // 2. delete in localStorage
  toDo = cleanToDos;
  saveToDo();


}

function saveToDo() {
  //localStorage에는 문자열 형태만 저장 가능
  //그렇기에 객체를 문자열 형태로 전환해야 함
  localStorage.setItem(TODO, JSON.stringify(toDo));
}

function paintTodo(text) {
  //console.log(text);
  //html에 뭔가를 생성하고 싶다면 createElement
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDo.length + 1;

  delBtn.innerHTML = "✖";
  delBtn.addEventListener("click", deleteToDo); //BUTTON에 실행할 함수 지정
  span.innerText = text;
  li.appendChild(delBtn); // 삭제 버튼 먼저 나오고
  li.appendChild(span); // 그 뒤에 텍스트(할일) 삽입

  li.id = newId; //생성된 태그에 id 지정
  toDoList.appendChild(li);//다 만든 li를 목록에 추가
  const toDoObj = {
    text: text,
    id: newId,
  }
  toDo.push(toDoObj);

  saveToDo();//push 후에 호출해야만 저장된 내용이 보임
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = ""; //입력 후 다시 빈칸으로 초기화
}

function something(toDo) { // forEach에 쓰일 함수를 새롭게 지정해줄 수도 있음
  console.log(toDo.text);
}

function loadTodo() {
  const loadedToDo = localStorage.getItem(TODO);
  if (loadedToDo !== null) {
    //todo.js:48 [{"text":"go eat","id":1},{"text":"go out","id":2}]
    console.log(loadedToDo); //before parsing
    const parseToDo = JSON.parse(loadedToDo);
    console.log(parseToDo); //after parsing - 문자열을 javascript 객체 형태로 표현

    //parsToDo -> paint
    parseToDo.forEach(function (toDo) {
      paintTodo(toDo.text);//array 원소 하나하나에 함수 실행 -> 파이썬 map()
    });
  }
}


function init() {
  loadTodo();
  toDoForm.addEventListener("submit", handleSubmit)
}
init();