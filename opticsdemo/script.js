menureveal = document.getElementById("menureveal");
menuselections = document.getElementById("menuselections");
title = document.getElementById("title");
beam = document.getElementById("beam");
mousedown = false;
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

index1cnst = document.getElementById("index1cnst");
index1disp = document.getElementById("index1disp");
index2cnst = document.getElementById("index2cnst");
index2disp = document.getElementById("index2disp");
rotateinp = document.getElementById("rotateinp");
rotatedisp = document.getElementById("rotatedisp");

function rotdisp() {
  rotatedisp.innerHTML = parseFloat(rotateinp.value);
  movedisp();
}

function display1() {
  index1disp.innerHTML = parseFloat(index1cnst.value);
}

function display2() {
  index2disp.innerHTML = parseFloat(index2cnst.value);
}

// function dragdown() {
//   mousedown = true;
// }

// function dragup() {
//   mousedown = false;
// }
// window.onmousemove = function(event) {
//   if (mousedown) {
//     if (event.pageY-beam.offsetHeight/2>=window.innerHeight*0.3 && event.pageY+beam.offsetHeight/2<=window.innerHeight && event.pageX+beam.offsetWidth/2<=window.innerWidth/2 && event.pageX-beam.offsetWidth/2>=0) {
//       beam.style.left = event.pageX-beam.offsetWidth/2+'px';
//       beam.style.top = event.pageY-beam.offsetHeight/2+'px';
//     } else {
//       dragup();
//     }
//   }
// }

ray = document.getElementById("ray");
normalline = document.getElementById("normalline");

ray.style.transform = 'rotate('+(270-(0))+'deg)';
ray.style.left = beam.offsetLeft+'px';
ray.style.top = beam.offsetTop+beam.offsetHeight/2+'px';

function movedisp(){
  dy = Math.sin(rotateinp.value*(Math.PI/180))*ray.offsetHeight;
  dx = Math.cos(rotateinp.value*(Math.PI/180))*ray.offsetHeight;

  ray.style.left = beam.offsetLeft+'px';
  ray.style.top = beam.offsetTop+beam.offsetHeight/2+'px';
  height = (window.innerWidth/2-(beam.offsetLeft))/Math.cos(rotateinp.value*Math.PI/180);
  ray.style.height = height+'px';

  normalline.style.top = ray.offsetTop-(window.innerWidth/2-(beam.offsetLeft))*Math.tan(rotateinp.value*Math.PI/180)+'px';

  
  ray.style.transform = 'rotate('+(270-(rotateinp.value))+'deg)';

  beam.style.transform = 'rotate('+(180-(rotateinp.value))+'deg)';
  ray2.style.transform='rotate('+(270-(180*((Math.asin(index1cnst.value*Math.sin(rotateinp.value*Math.PI/180)/index2cnst.value)))/Math.PI))+'deg)';
  ray2.style.top = normalline.offsetTop+'px';
}
