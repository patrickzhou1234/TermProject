mesh = document.getElementById("mainMesh");
gravcstinp = document.getElementById("gravconst");
gravdisp = document.getElementById("gravdisp");
x = 0;
y = 0;
gravconst = 0.0981;
VelY = 0;

function displaygrav() {
  gravconst = parseFloat(gravcstinp.value);
  gravdisp.innerHTML = parseFloat(gravcstinp.value)*100;
}

function restart() {
  mesh.style.top = 0+'px';
  y = 0;
  VelY = 0;
}

function update() {
  if (mesh.offsetTop+mesh.offsetHeight>=window.innerHeight) {
    y = window.innerHeight-mesh.offsetHeight;
    VelY = 0;
  } else {
    VelY+=gravconst;
    y+=VelY;
  }
  mesh.style.top = y+'px';
}

setInterval(update, 10);

menureveal = document.getElementById("menureveal");
menuselections = document.getElementById("menuselections");
function menurev() {
  if (menureveal.innerHTML == "⇧") {
    menureveal.innerHTML = "⇩";
    menureveal.style.top = "0px";
    menuselections.style.top = "-6vh";
  } else {
    menureveal.innerHTML = "⇧";
    menureveal.style.top = "6vh";
    menuselections.style.top = "0vh";
  }
}
