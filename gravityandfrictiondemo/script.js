mesh = document.getElementById("mainMesh");
friccstinp = document.getElementById("friccoeff");
fricdisp = document.getElementById("fricdisp");
massdisp = document.getElementById("massdisp");
masscstinp = document.getElementById("mass");
gravcstinp = document.getElementById("gravconst");
gravdisp = document.getElementById("gravdisp");
x = 0;
y = 200;
fricconst = 0.2;
gravconst = 0.0981;
VelY = 0;
AccelX = 0;
ForceX = 0;
VelX = 0;
ForceY = 0;
AccelY = 0; 
mass = 3;
frictionforce = mass*gravconst*fricconst;
weight = mass*gravconst;
function displayfric() {
  fricconst = eval(friccstinp.value);
  fricdisp.innerHTML = eval(friccstinp.value);
}

function displaymass(){
  mass = eval(massstinp.value);
  massdisp.innerHTML = eval(massstinp.value);
}

function displaygrav() {
  gravconst = eval(gravcstinp.value);
  gravdisp.innerHTML = eval(gravcstinp.value)*100;
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
  if (event.keyCode == "38"){
    ForceY = 1;
  }
  if (event.keyCode == "40"){
    ForceY = -1;
  }
}
window.onkeyup = function() {
  ForceX = 0;
  ForceY = 0;
}

function update() {
  frictionforce = mass*gravconst*fricconst;
  weight = mass*gravconst;
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
  AccelY = (weight-ForceY)/mass;

  if (mesh.offsetTop==window.innerHeight-mesh.offsetHeight && AccelY>0) {
    VelY = 0;
    AccelY = 0;
    ForceY = 0;
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
  }
  else if (mesh.offsetTop>window.innerHeight-mesh.offsetHeight){
    VelY = 0;
    AccelY = 0;
    ForceY = 0;
    y = window.innerHeight-mesh.offsetHeight-1;
  }
  else {
    VelX += AccelX;
    x += VelX;
    VelY += AccelY;
    y += VelY;
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
title = document.getElementById("title");
function menurev() {
  if (menureveal.innerHTML == "⇧") {
    menureveal.innerHTML = "⇩";
    menureveal.style.top = "0px";
    menuselections.style.top = "-24vh";
    title.style.top = "-24vh";
  } 
  else {
    menureveal.innerHTML = "⇧";
    menureveal.style.top = "24vh";
    menuselections.style.top = "0vh";
    title.style.top = "0vh";
  }
}
