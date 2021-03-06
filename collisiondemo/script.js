balls = [];
X = [];
Y = [];
VELX = [];
VELY = [];
MASS = [];
ALREADYCOLLIDED = [];
COLORS = ["red", "yellow", "green", "purple", "orange"];
restarted = false;
bullet = document.getElementById("bullet");
player = document.getElementById("player");
turret = document.getElementById("turret");

mass = document.getElementById("mass");
elastcnst = document.getElementById("elasticityconst");  
elasticitydisp = document.getElementById("elasticitydisp");
massdisp = document.getElementById("massdisp");
initialvelodisp = document.getElementById("initialvelodisp");
initialvelo = document.getElementById("initialveloconst");

function displayelasticity() {
  elasticitydisp.innerHTML = parseFloat(elastcnst.value);
}
function dispinitialvelo() {
  initialvelodisp.innerHTML = parseFloat(initialvelo.value);
}

function displaymass() {
  massdisp.innerHTML = parseFloat(mass.value);
}

function addBall(){
  var ball = document.createElement("div");
  randindx = Math.floor(5*Math.random());
  color = COLORS[randindx];
  ball.style.cssText = "position: absolute;width: 8vmin;height: 8vmin;border-radius: 50%;background-color: "+color+";left: calc(50vw - 1vmin);top: calc(30vh - 1vmin);";

  balls.push(ball);
  document.body.appendChild(ball);
  ball.style.left = player.offsetLeft+player.offsetWidth/2+Math.cos(angle)*turret.offsetWidth-ball.offsetWidth/2+'px';
  ball.style.top = player.offsetTop+player.offsetHeight/2+Math.sin(angle)*turret.offsetWidth-ball.offsetHeight/2+'px';
  VELX.push(Math.cos(angle)*initialvelo.value);
  VELY.push(Math.sin(angle)*initialvelo.value);
  X.push(player.offsetLeft+player.offsetWidth/2+Math.cos(angle)*turret.offsetWidth-ball.offsetWidth/2);
  Y.push(player.offsetTop+player.offsetHeight/2+Math.sin(angle)*turret.offsetWidth-ball.offsetHeight/2);
  MASS.push(parseFloat(mass.value));
  ALREADYCOLLIDED.push([]);
  for (i = 0; i < ALREADYCOLLIDED.length-1; i++){
    ALREADYCOLLIDED[i].push(false);
  }
}

window.onclick = function() {
  if (!restarted){
    addBall();
  }
  else{
    restarted = false;
  }
}

window.onmousemove = function(event) {
    aX = player.offsetLeft+player.offsetWidth/2;
    aY = player.offsetTop+player.offsetHeight/2;
  
    dy = event.pageY - aY;
    dx = event.pageX - aX;
    
    angle = Math.atan2(dy, dx);
    turret.style.transform = 'rotate('+angle+'rad)';
}

function update() {
  /*collision calculation*/
  b = elastcnst.value/100;
  for (i = 0; i < balls.length; i++){
    for (j = i+1; j < balls.length; j++){
      ball1 = balls[i];
      ball2 = balls[j];
      if (ball1.offsetLeft < ball2.offsetLeft+ball2.offsetWidth && ball1.offsetLeft+ball1.offsetWidth > ball2.offsetLeft && ball1.offsetTop < ball2.offsetTop+ball2.offsetHeight && ball1.offsetTop + ball1.offsetHeight > ball2.offsetTop){
        if ((ball1.offsetLeft < ball2.offsetLeft && VELX[i] < 0 && VELX[j] > 0 || ball1.offsetLeft > ball2.offsetLeft && VELX[i] > 0 && VELX[j] < 0 || ball1.offsetTop < ball2.offsetTop && VELY[i] < 0 && VELY[j] > 0 || ball1.offsetTop > ball2.offsetTop && VELY[i] > 0 && VELY[j] < 0) || ((ball1.offsetLeft < ball2.offsetLeft && VELX[i] < VELX[j]) || (ball1.offsetLeft > ball2.offsetLeft && VELX[i] > VELX[j]) || (ball1.offsetTop < ball2.offsetTop && VELY[i] < VELY[j])) && ALREADYCOLLIDED[i][balls.length-j]){
          continue;
        }
        else{
          m = MASS[i];
          n = MASS[j];
          v1x = VELX[i];
          v1y = VELY[i];
          v2x = VELX[j];
          v2y = VELY[j];
          VELX[i] = (((m-b*n)/(m+n))*v1x)+((((1+b)*n)/(m+n))*v2x);
          VELX[j] = ((((1+b)*m)/(m+n))*v1x)+((((n-b*m))/(n+m))*v2x);
          VELY[i] = ((((m-b*n))/(m+n))*v1y)+((((1+b)*n)/(m+n))*v2y);
          VELY[j] = ((((1+b)*m)/(m+n))*v1y)+(((n-b*m)/(n+m))*v2y);
          ALREADYCOLLIDED[i][balls.length-j] = true;
        }
      }
      else{
        ALREADYCOLLIDED[i][balls.length-j] = false;
      }
    }
  }
  for (i=0;i<balls.length;i++) {
    ball = balls[i];
    if (ball.offsetTop>=window.innerHeight-ball.offsetHeight) {
      VELY[i] = -b*VELY[i];
      Y[i] = window.innerHeight-ball.offsetHeight-1;
    }
    
    if (ball.offsetLeft>=window.innerWidth-ball.offsetWidth) {
      VELX[i] = -b*VELX[i];
      X[i] = window.innerWidth-ball.offsetWidth-1;
    } 
    else if (ball.offsetLeft<=0) {
      VELX[i] = -b*VELX[i];
      X[i] = 1;
    }
    if (ball.offsetTop <= 0){
      VELY[i] = -b*VELY[i];
      Y[i] = 1;
    }
    X[i] += VELX[i];
    Y[i] += VELY[i];
    ball.style.top = Y[i]+'px';
    ball.style.left = X[i]+'px';
  }
}
setInterval(update, 10);



menureveal = document.getElementById("menureveal");
menuselections = document.getElementById("menuselections");
title = document.getElementById("title");
function menurev() {
  if (menureveal.innerHTML == "???") {
    menureveal.innerHTML = "???";
    menureveal.style.top = "0px";
    menuselections.style.top = "-24vh";
    title.style.top = "-24vh";
  } 
  else {
    menureveal.innerHTML = "???";
    menureveal.style.top = "24vh";
    menuselections.style.top = "0vh";
    title.style.top = "0vh";
  }
}

function restart() {
  for (i=0;i<balls.length;i++) {
    balls[i].remove();
  }
  balls = [];
  VELX = [];
  VELY = [];
  MASS = [];
  X = [];
  Y = [];
  ALREADYCOLLIDED = [];
  restarted = true;
} 
