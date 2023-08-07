const inputDiv = document.querySelector(".input-div");
const input = document.querySelector(".input-div input");
const showDiv = document.querySelector(".show-div");
const myCanvas = document.getElementById("canvas");
const context = myCanvas.getContext("2d");
const imgBackground = document.getElementById("tri-color");
const deleteBtn = document.getElementById("delete");
const downloadBtn = document.getElementById("download-btn");

//GET USER PHOTO FROM INPUT WITH BTN CLICK TO CHOSE FILE
input.addEventListener("change", () => {
  const file = input.files[0];
  const imgProfil = createImgTag(file);

  imgProfil.onload = function () {
    transformPhoto(imgProfil);
  };
  deleteBtn.classList.toggle("display");
  downloadBtn.classList.toggle("display");
});

//GET USER PHOTO WITH DRAG & DROP IN INPUT
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

// CREATE AN IMAGE TAG OF UPLOAD PHOTO
function createImgTag(uploadFile) {
  const imgProfil = document.createElement("img");
  imgProfil.src = URL.createObjectURL(uploadFile);
  imgProfil.setAttribute("id", "profil");
  showDiv.appendChild(imgProfil);
  return imgProfil;
}

// FUNC OF USING CANVAS TO DRAW THE CIRCLE AND MERGE USER PHOTO INTO THE CIRCLE
function transformPhoto(imgProfil) {
  var lastend = 0;
  var data = [1, 1, 1]; // If you add more data values make sure you add more colors
  var myTotal = 0; // Automatically calculated so don't touch
  var myColor = ["#0051ff", "#fac500", "#ff0000"]; // Colors of each slice

  for (var e = 0; e < data.length; e++) {
    myTotal += data[e];
  }

  for (var i = 0; i < data.length; i++) {
    context.fillStyle = myColor[i];
    context.beginPath();
    context.moveTo(myCanvas.width / 2, myCanvas.height / 2);
    context.arc(
      myCanvas.width / 2, // x
      myCanvas.height / 2, // y
      myCanvas.height / 2, // radius
      lastend, // startingAngle (radians)
      lastend + Math.PI * 2 * (data[i] / myTotal), // endingAngle (radians)
      false // antiClockwise (boolean)
    );
    context.lineTo(myCanvas.width / 2, myCanvas.height / 2);
    context.fill();
    lastend += Math.PI * 2 * (data[i] / myTotal);
  }

  const sWidth = imgProfil.width;
  const sHeight = imgProfil.height;

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

//FUNC FOR DOWNLOAD THE TRANFORMED PROFIL
function downloadImage(data, filename = "myProfil.jpeg") {
  const a = document.createElement("a");
  a.href = data;
  console.log(a);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

// FUNC FOR DELET THE PHOTO TRANFORMED
function deleteImage() {
  showDiv.innerHTML = "";
  location.reload();
}

