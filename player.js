window.addEventListener("load", function () {
    let progressBarH = 5;
    let progressBarW;
    let dimButton = 10; // dimensiune butoane video
    var idVideo;
    var autoplay = false;
    let volume = 1;
    let timp = null;

    var cadruVideo = document.createElement("div");
    var video = document.createElement("video");
    document.body.appendChild(cadruVideo);
    cadruVideo.appendChild(video);

    var canvas = document.getElementById("player");
    var context = canvas.getContext("2d");

    video.setAttribute("src", "media/Los Angeles-4K.mp4");
    idVideo = 1;

    video.addEventListener("canplay", function () {
        canvas.width = 718;
        canvas.height = 490;
        cadruVideo.setAttribute("style", "display:none");

        createPlayer();
    });

    video.addEventListener("play", function () {
        timp = window.setInterval(createPlayer, 20);

    });

    var autoplayButton = document.getElementById("btnAutoplay");
    autoplayButton.addEventListener("click", function () {

        if (autoplay == false) {
            autoplayButton.innerHTML = "Opreste Autoplay";
            autoplay = true;
        }
        else {
            autoplayButton.innerHTML = "Porneste Autoplay";
            autoplay = false;
        }
    });

    function createPlayer() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 1;
        context.font = "9pt sans-serif";
        context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
        context.drawImage(video, 9, 10, 700, 450);
        progressBarW = canvas.width - 15;
        video.loop = false;

        prevButton();
        backwardButton();
        playPauseButton();
        forwardButton();
        nextButton();
        volumeBar();
        progressBar();
        timeButton();
        getVolumeFromStorage();

        video.onloadedmetadata = function () {
            video.volume = volume;
        };
    }

    function playPauseButton() {
        if (video.paused) {
            context.beginPath();
            context.moveTo(dimButton * 4 + 10, canvas.height - dimButton);

            context.lineTo(dimButton * 5 + 10, canvas.height - dimButton * 1.5);
            context.lineTo(dimButton * 4 + 10, canvas.height - dimButton * 2);
            context.fillStyle = "white";
            context.fill();
        }

        else {
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(dimButton * 4 + 10 + dimButton * 0.33, canvas.height - dimButton);

            context.lineTo(dimButton * 4 + 10 + dimButton * 0.33, canvas.height - dimButton * 2);
            context.strokeStyle = "white";
            context.stroke();

            context.beginPath();
            context.moveTo(dimButton * 4.66 + 10, canvas.height - dimButton);
            context.lineTo(dimButton * 4.66 + 10, canvas.height - dimButton * 2);
            context.strokeStyle = "white";
            context.stroke();
        }
    }

    function prevButton() {
        context.beginPath();
        context.moveTo(dimButton, canvas.height - dimButton);
        context.lineTo(dimButton, canvas.height - dimButton * 2);
        context.strokeStyle = "white";
        context.stroke();

        context.beginPath();
        context.moveTo(dimButton * 2, canvas.height - dimButton);
        context.lineTo(dimButton, canvas.height - dimButton * 1.5);
        context.lineTo(dimButton * 2, canvas.height - dimButton * 2);
        context.fillStyle = "white";
        context.fill();
    }

    function backwardButton() {
        context.fillText("-5S", dimButton * 2 + 5, canvas.height - dimButton * 1.1);
        context.font = "11pt";
    }

    function nextButton() {
        context.beginPath();

        context.moveTo(dimButton * 7 + 25, canvas.height - dimButton);
        context.lineTo(dimButton * 8 + 25, canvas.height - dimButton * 1.5);
        context.lineTo(dimButton * 7 + 25, canvas.height - dimButton * 2);

        context.fill();
        context.beginPath();
        context.moveTo(dimButton * 8 + 25, canvas.height - dimButton);
        context.lineTo(dimButton * 8 + 25, canvas.height - dimButton * 2);
        context.stroke();
    }

    function forwardButton() {
        context.fillText("+5S", dimButton * 6 + 6, canvas.height - dimButton * 1.1);
    }

    function progressBar() {
        context.lineWidth = 5;
        context.fillStyle = "white";
        context.fillRect(5, canvas.height - 35, progressBarW, progressBarH);

        context.fillStyle = "#2F4F4F";
        progressW = video.duration ? (video.currentTime * progressBarW) / video.duration : 0;
        context.fillRect(5, canvas.height - 35, progressW, progressBarH);
    }

    function volumeBar() {
        context.fillText("volum", dimButton * 21, canvas.height - dimButton * 1.1);
        context.fillStyle = "white";

        if (video.volume == 0) {
            context.fillText("X", dimButton * 15, canvas.height - dimButton * 1.2); // in cazul in care clipul nu are volum
        }
        context.lineWidth = 5;

        context.beginPath();
        context.strokeStyle = "white";
        context.moveTo(dimButton * 25, canvas.height - dimButton * 1.4);
        context.lineTo(dimButton * 25 + 90, canvas.height - dimButton * 1.4);
        context.stroke();

        context.beginPath();
        context.strokeStyle = "#093171";
        context.moveTo(dimButton * 25, canvas.height - dimButton * 1.4);
        context.lineTo(dimButton * 25 + 90 * video.volume, canvas.height - dimButton * 1.4);
        context.stroke();
        context.lineWidth = 1;
    }

    function timeButton() {
        let fullMin = Math.floor(video.duration / 60);
        let fullSec = Math.floor(video.duration - fullMin * 60);
        let passedMin = Math.floor(video.currentTime / 60);
        let passedSec = Math.floor(video.currentTime - passedMin * 60);

        let videoTime = `${passedMin}:${passedSec} / ${fullMin}: ${fullSec}`;
        context.fillStyle = "white";
        context.fillText(videoTime, dimButton * 10.2 + 30, canvas.height - dimButton * 1.15);
    }

    function getVolumeFromStorage() {
        if (typeof Storage !== "undefined") {
            if (typeof localStorage.volume !== "undefined") {
                volume = localStorage.volume;
            }
        }
    }

    canvas.addEventListener("mousedown", function (e) {
        var cursorX = e.pageX;
        var cursorY = e.pageY;

        if (cursorX >= 28 && cursorX <= 40 && cursorY >= 615 && cursorY <= 623) {

            if (idVideo == 1) {
                video.setAttribute("src", "media/Island Aerial View.mp4");
                idVideo = 4;
            }
            else if (idVideo == 2) {
                video.setAttribute("src", "media/Los Angeles-4K.mp4");
                idVideo = 1;
            }
            else if (idVideo == 3) {
                video.setAttribute("src", "media/The Dubai Fountain.mp4");
                idVideo = 2;
            }
            else if (idVideo == 4) {
                video.setAttribute("src", "media/NYC-Brooklyn Bridge.mp4");
                idVideo = 3;
            }
            video.play();
        }

        else if (cursorX >= 47 && cursorX <= 62 && cursorY >= 613 && cursorY <= 623) {
            video.currentTime -= 5;
        }

        else if (cursorX >= 60 && cursorX <= 90 && cursorY >= 610 && cursorY <= 640) {
            if (video.paused) {
                video.play();
            }
            else video.pause();
        }

        else if (cursorX >= 114 && cursorX <= 125 && cursorY >= 613 && cursorY <= 625) {
            if (idVideo == 1) {
                video.setAttribute("src", "media/The Dubai Fountain.mp4");
                idVideo = 2;
            }
            else if (idVideo == 2) {
                video.setAttribute("src", "media/NYC-Brooklyn Bridge.mp4");
                idVideo = 3;
            }
            else if (idVideo == 3) {
                video.setAttribute("src", "media/Island Aerial View.mp4");
                idVideo = 4;
            }
            else if (idVideo == 4) {
                video.setAttribute("src", "media/Los Angeles-4K.mp4");
                idVideo = 1;
            }
            video.play();
        }

        else if (cursorX >= 88 && cursorX <= 107 && cursorY >= 613 && cursorY <= 623) {
            video.currentTime += 5;
        }

        else if (cursorX >= 222 && cursorX <= 246 && cursorY == 622) {
            video.volume = video.volume != 0 ? 0 : volume;
            localStorage.volume = video.volume;
        }

        else if (cursorX >= 255 && cursorX <= 337 && cursorY >= 616 && cursorY <= 624) {
            volume = (cursorX - 255) / 100; // calculeaza volumul in functie de pozitia cursorului pe bara
            video.volume = volume;
            localStorage.volume = video.volume;
        }

        else if (cursorX >= 24 && cursorX <= 733 && cursorY >= 597 && cursorY <= 607) {
            video.currentTime = (cursorX * video.duration) / progressBarW; // se modifica momentul clipului in functie de pozitia selectata a cursorului
        }
    });

    // playlist ce contine videoclipurile descarcate
    var videoList = document.getElementById("videoList");
    var video1 = videoList.getElementsByTagName("li")[0];
    var video2 = videoList.getElementsByTagName("li")[1];
    var video3 = videoList.getElementsByTagName("li")[2];
    var video4 = videoList.getElementsByTagName("li")[3];

    video1.addEventListener("click", function () {
        video.setAttribute("src", "media/Los Angeles-4K.mp4");
        idVideo = 1;
        video.play();
    });

    video2.addEventListener("click", function () {
        video.setAttribute("src", "media/The Dubai Fountain.mp4");
        idVideo = 2;
        video.play();
    });

    video3.addEventListener("click", function () {
        video.setAttribute("src", "media/NYC-Brooklyn Bridge.mp4");
        idVideo = 3;
        video.play();
    });

    video4.addEventListener("click", function () {
        video.setAttribute("src", "media/Island Aerial View.mp4");
        idVideo = 4;
        video.play();
    });

    video.addEventListener("pause", function () {
        window.clearInterval(timp);
    });

    video.addEventListener("end", function () {
        window.clearInterval(timp);
    });

    video.addEventListener("ended", function () {

        if (autoplay) {
            if (idVideo == 1) {
                video.setAttribute("src", "media/The Dubai Fountain.mp4");
                idVideo = 2;
                video.play();
            }
            else if (idVideo == 2) {
                video.setAttribute("src", "media/NYC-Brooklyn Bridge.mp4");
                idVideo = 3;
                video.play();
            }
            else if (idVideo == 3) {
                video.setAttribute("src", "media/Island Aerial View.mp4");
                idVideo = 4;
                video.play();
            }
            else if (idVideo == 4) {
                video.setAttribute("src", "media/Los Angeles-4K.mp4");
                idVideo = 1;

            }
        }
    });
});