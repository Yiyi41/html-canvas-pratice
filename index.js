const inputDiv = document.querySelector(".input-div");
const input = document.querySelector(".input-div input");
const showDiv = document.querySelector(".show-div");
const myCanvas = document.getElementById("canvas");
const context = myCanvas.getContext("2d");
const imgBackground = document.getElementById("tri-color");
const deleteBtn = document.getElementById("delete");
const downloadBtn = document.getElementById("download-btn");

//RECUPERER PHOTO DE L'UTILISATEUR
input.addEventListener("change", () => {
  const file = input.files[0];
  const imgProfil = createImgTag(file);

  imgProfil.onload = function () {
    transformPhoto(imgProfil);
  };
  deleteBtn.classList.toggle("display");
  downloadBtn.classList.toggle("display");
});

inputDiv.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const imgProfil = createImgTag(file);

  imgProfil.onload = function () {
    transformPhoto(imgProfil);
  };

  deleteBtn.classList.toggle("display");
  downloadBtn.classList.toggle("display");
});

downloadBtn.addEventListener("click", (e) => {
  const dataURL = myCanvas.toDataURL("image/jpeg", 1.0);
  downloadImage(dataURL, "my-wa-profil.jpeg");
});

function createImgTag(uploadFile) {
  const imgProfil = document.createElement("img");
  imgProfil.src = URL.createObjectURL(uploadFile);
  imgProfil.setAttribute("id", "profil");
  showDiv.appendChild(imgProfil);
  return imgProfil;
}

function transformPhoto(imgProfil) {
  const sWidth = imgProfil.width;
  const sHeight = imgProfil.height;
  context.drawImage(imgBackground, 0, 0);

  context.beginPath();
  context.arc(
    myCanvas.width / 2,
    myCanvas.height / 2,
    myCanvas.width * 0.45,
    0,
    2 * Math.PI
  );
  context.fillStyle = "white";
  context.fill();
  context.clip();

  if (sWidth <= sHeight) {
    context.drawImage(
      imgProfil,
      0,
      sHeight / 2 - sWidth / 2,
      sWidth,
      sWidth,
      0,
      0,
      394,
      394
    );
  } else {
    context.drawImage(
      imgProfil,
      sWidth / 2 - sHeight / 2,
      0,
      sHeight,
      sHeight,
      0,
      0,
      394,
      394
    );
  }
}

function downloadImage(data, filename = "untitled.jpeg") {
  const a = document.createElement("a");
  a.href = data;
  console.log(a);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

function deleteImage() {
  showDiv.innerHTML = "";
  location.reload();
}
