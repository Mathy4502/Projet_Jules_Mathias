//Initialisation des 1eres variables
var canvas = document.getElementById("monCnvs");
var ctx = canvas.getContext("2d");
var sizeball = 5;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var flechedroite = false;
var flechegauche = false;
var nbbrickligne = 6; //Nombre de briques sur une ligne
var nbbrickhauteur = 5; // Nombre de briques sur une colonne
var largeurbrick = 75;
var hauteurbrick = 20;
var brickPadding = 5;
var brickOffsetTop = 25;
var brickOffsetLeft = 15;
var score = 0;
var vie = 3;
var audio = new Audio('./audio/jul.mp3');
var audio1 = new Audio('./audio/jul_ft_mathy.mp3');
var audio2 = new Audio('./audio/win.mp3');



var bricks = [];
for (var c = 0; c < nbbrickhauteur; c++) {
  bricks[c] = [];
  for (var r = 0; r < nbbrickligne; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    flechedroite = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    flechegauche = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    flechedroite = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    flechegauche = false;
  }
}
// Mise en place des collisions
function collision() {
  for (var c = 0; c < nbbrickhauteur; c++) {
    for (var r = 0; r < nbbrickligne; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + largeurbrick &&
          y > b.y &&
          y < b.y + hauteurbrick
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == nbbrickligne * nbbrickhauteur) {
            audio2.play();
            alert("YOU WIN, CONGRATS!");
            document.location.stop();
          }
        }
      }
    }
  }
}
//Création de la balle
function ball() {
  ctx.beginPath();
  ctx.arc(x, y, sizeball, 0, Math.PI * 2);
  ctx.fillStyle = "#00a90b";
  ctx.fill();
  ctx.closePath();
}
//Création de la raquette
function raquette() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#00a90b";
  ctx.fill();
  ctx.closePath();
}
//Création des briques 
function affBrick() {
  for (var c = 0; c < nbbrickhauteur; c++) {
    for (var r = 0; r < nbbrickligne; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = r * (largeurbrick + brickPadding) + brickOffsetLeft;
        var brickY = c * (hauteurbrick + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, largeurbrick, hauteurbrick);
        ctx.fillStyle = "#00a90b";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// Affichage du score
function affScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#00a90b";
  ctx.fillText("Score: " + score, 8, 20);
}
// Affichage du nombre de vie 
function affVie() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#00a90b";
  ctx.fillText("Vie: " + vie, canvas.width - 65, 20);
}
//Affichage à jour
function affichage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  affBrick();
  ball();
  raquette();
  affScore();
  affVie();
  collision();

  if (x + dx > canvas.width - sizeball || x + dx < sizeball) {
    dx = -dx;
  }
  if (y + dy < sizeball) {
    dy = -dy;
  } else if (y + dy > canvas.height - sizeball) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      vie--;
      if (vie == 0) {
        audio.play();
        alert("GAME OVER");
        document.location.stop();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (flechedroite && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (flechegauche && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(affichage);
}

function playAudio() {
  audio1.play();
}

function pauseAudio() {
  audio1.pause();
}
// affichage();
function myFunction() {
  setTimeout(function () {
    affichage()
  }, 1);
}