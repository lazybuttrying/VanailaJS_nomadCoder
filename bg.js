const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNum) {
  const image = new Image();
  image.src = `img/${imgNum + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
  //body.appendChild(image);
  //img.addEventListener("loadend", handleImgLoad);

}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}
init();