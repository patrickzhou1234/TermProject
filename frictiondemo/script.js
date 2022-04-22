mesh = document.getElementById("mainMesh");
friccstinp = document.getElementById("friccoeff");
fricdisp = document.getElementById("fricdisp");
massdisp = document.getElementById("massdisp");
masscstinp = document.getElementById("mass");
x = 0;
y = 500;
fricconst = 0.2;
VelY = 0;
AccelX = 0;
ForceX = 0;
VelX = 0;
mass = 1;
frictionforce = mass*0.0981*fricconst;
function displayfric() {
  fricconst = parseFloat(friccstinp.value);
  fricdisp.innerHTML = parseFloat(friccstinp.value);
}

function restart() {
  mesh.style.top = 0+'px';
  x = 0;
  y = 200;
  VelY = 0;
  VelX = 0;
  AccelX = 0;
  ForceX = 0;
}

window.onkeydown = function(event) {
  if (event.keyCode == "37"){
    ForceX = -0.5;
  }
  if (event.keyCode == "39"){
    ForceX = 0.5;
  }
}

window.onkeyup = function() {
  ForceX = 0;
}

function update() {
  frictionforce = mass*0.0981*fricconst;
  if (ForceX < 0){
    if (Math.abs(ForceX) > frictionforce){
      AccelX = (ForceX + frictionforce)/mass;
    }
    else{
      AccelX=0;
    }
  }
  else if (ForceX > 0){
    if (Math.abs(ForceX) > frictionforce){
      AccelX = (ForceX - frictionforce)/mass;
    }
    else{
      AccelX=0;
    }
  }
  else {
    if (VelX > 0){
      AccelX = -1*frictionforce/mass;
    }
    else if (VelX < 0){
      AccelX = frictionforce/mass;
    }
    else {
      AccelX = 0;
    }
  }
  if (mesh.offsetLeft>=window.innerWidth-mesh.offsetWidth) {
    VelX = 0;
    AccelX = 0;
    ForceX = 0;
    x = window.innerWidth-mesh.offsetWidth-1;
  } else if (mesh.offsetLeft<=0) {
    VelX = 0;
    AccelX = 0;
    ForceX = 0;
    x = 1;
  } else {
    VelX += AccelX;
    x += VelX;
  }
  mesh.style.top = y+'px';
  mesh.style.left = x+'px';
}

setInterval(update, 10);

function displaymass() {
  mass = eval(masscstinp.value);
  massdisp.innerHTML = eval(masscstinp.value);
}

menureveal = document.getElementById("menureveal");
menuselections = document.getElementById("menuselections");
function menurev() {
  if (menureveal.innerHTML == "⇧") {
    menureveal.innerHTML = "⇩";
    menureveal.style.top = "0px";
    menuselections.style.top = "-13vh";
  } 
  else {
    menureveal.innerHTML = "⇧";
    menureveal.style.top = "13vh";
    menuselections.style.top = "0vh";
  }
}
