let startCard = document.querySelector("#start-card");
let chooseCard = document.querySelector("#choose-card");
let loadCard = document.querySelector("#loading-page");
let removeBg = document.querySelector("#remove-bg");
let containerDivs = document.querySelectorAll('.container > div');
let fileInput = document.getElementById("upload-input");
let playImage = document.querySelector('.play-image');
let removedImg = document.querySelector(".removed");
let samllImg = document.querySelector('.small');
let uploadAnother = document.getElementById('upload-another');
let downloadBtn = document.getElementById('download');
let reader = new FileReader();
let formData = new FormData();
let fileName = null;


let apiKey = 'QrC4zAsLgXeykNA4eLnF4YyW';
let apiLink = 'https://api.remove.bg/v1.0/removebg';
let startBtn = document.getElementById('start');

const activeScreen = (screen) => {
    containerDivs.forEach(e => {
        e.style.display = 'none';
    })
    screen.style.display = 'flex';
}
activeScreen(startCard);
fileInput.addEventListener("input", () => {
    fileName = fileInput.files[0];
    
  reader.readAsDataURL(fileName);
    reader.onloadend = () => {
playImage.src = reader.result;
samllImg.src = reader.result;
    }
    activeScreen(chooseCard);
})
startBtn.addEventListener('click', () => {
    activeScreen(loadCard);
    formData.append('image_file', fileName);
    fetch(apiLink, {
        method:'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData,
    }).then((res) => res.blob()).then(data => {
        reader.readAsDataURL(data);
        reader.onloadend = () => {
            removedImg.src = reader.result;
        downloadBtn.setAttribute('href', reader.result);
        }
        activeScreen(removeBg);
    });
})

uploadAnother.addEventListener('click', () => {
    location.reload();
})