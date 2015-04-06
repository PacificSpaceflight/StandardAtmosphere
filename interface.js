var canvas = document.getElementById("interface");
var context = canvas.getContext("2d");

var silhouetteCanvas = document.getElementById("silhouette");
var silhouetteContext = silhouetteCanvas.getContext("2d");


var eiffelImage = new Image();
eiffelImage.src = "https://raw.githubusercontent.com/PacificSpaceflight/StandardAtmosphere/master/eiffel.png";
eiffelImage.onload = function() {
	var scaleHeight = silhouetteCanvas.height * 324.0/20000.0 /window.devicePixelRatio;  // eiffel tower 324m tall
    silhouetteContext.drawImage(eiffelImage, 0, silhouetteCanvas.height/window.devicePixelRatio-scaleHeight, 
    						 		 scaleHeight, scaleHeight);
}

var planeImage = new Image();
planeImage.src = "https://raw.githubusercontent.com/PacificSpaceflight/StandardAtmosphere/master/airplane.png";
planeImage.onload = function() {
	var planeAltitude = silhouetteCanvas.height * 9144.0/20000.0;  // 30,000 ft
    silhouetteContext.drawImage(img, silhouetteCanvas.width/window.devicePixelRatio * .4, 
    								 silhouetteCanvas.height/window.devicePixelRatio-planeAltitude, 
    						 		 silhouetteCanvas.width/window.devicePixelRatio * .1, silhouetteCanvas.width/window.devicePixelRatio * .1);
}

var everestImage = new Image();
everestImage.src = "https://raw.githubusercontent.com/PacificSpaceflight/StandardAtmosphere/master/everest.png";
everestImage.onload = function() {
	var scaleHeight2 = silhouetteCanvas.height * 8848.0 / 20000.0 / window.devicePixelRatio;  // everest is 8,848m
    silhouetteContext.drawImage(everestImage, 0, silhouetteCanvas.height/window.devicePixelRatio - scaleHeight2, 
    						 		 silhouetteCanvas.width/window.devicePixelRatio, scaleHeight2);
}


function Point(){
	var x;
	var y;
}

if (window.devicePixelRatio > 1) {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth;
    canvas.style.height = canvasHeight;

    context.scale(window.devicePixelRatio, window.devicePixelRatio);

    silhouetteCanvas.width = canvasWidth * window.devicePixelRatio;
    silhouetteCanvas.height = canvasHeight * window.devicePixelRatio;
    silhouetteCanvas.style.width = canvasWidth;
    silhouetteCanvas.style.height = canvasHeight;

    silhouetteContext.scale(window.devicePixelRatio, window.devicePixelRatio);
}

// function drawScaleObjects(){
// 	context.fillStyle = "#E0E0E0";
// 	context.beginPath();
// 	context.moveTo(o.x + p1.x*scale, o.y + p1.y*scale);
// 	for(var i = 0; i < points.length; i++) context.lineTo(o.x + points[i].x*scale, o.y + points[i].y*scale);
// 	context.lineTo(o.x + p1.x*scale, o.y + p1.y*scale);
// 	context.fill();
// }


function drawSkyLines(mouse){
	canvas.width = canvas.width;
	context.lineWidth = 1;
	context.lineCap = "round";

	// light gray fill, visible segment piece
	// context.fillStyle = "#E0E0E0";
	// context.beginPath();
	// context.moveTo(o.x + p1.x*scale, o.y + p1.y*scale);
	// for(var i = 0; i < points.length; i++) context.lineTo(o.x + points[i].x*scale, o.y + points[i].y*scale);
	// context.lineTo(o.x + p1.x*scale, o.y + p1.y*scale);
	// context.fill();

	// 2 mouse ray lines
	// context.strokeStyle = "#E0E0E0";
	// context.beginPath();
	// context.moveTo(o.x + mouse.x, o.y + mouse.y);
	// context.lineTo(o.x + mouse.x+scale*2*dRayR.x, o.y + mouse.y+scale*2*dRayR.y);
	// context.moveTo(o.x + mouse.x, o.y + mouse.y);
	// context.lineTo(o.x + mouse.x+scale*2*dRayL.x, o.y + mouse.y+scale*2*dRayL.y);
	// context.stroke();

	// 1/12 full segment- light gray outline
	// context.strokeStyle = "#E0E0E0";
	// context.beginPath();
	// context.moveTo(o.x + p1.x*scale, o.y + p1.y*scale);
	// context.lineTo(o.x + p2.x*scale, o.y + p2.y*scale);
	// context.lineTo(o.x + p3.x*scale, o.y + p3.y*scale);
	// context.lineTo(o.x + p1.x*scale, o.y + p1.y*scale);
	// context.stroke();

	// 1/12 visible segment- black outline
	context.strokeStyle = "#FFFFFF";
	context.beginPath();
	context.moveTo(0, mouse.y * canvas.height);
	context.lineTo(canvas.width * .1, mouse.y * canvas.height);
	context.stroke();


	// for(var i = 0; i < points.length; i++){
	// 	context.lineTo(o.x + points[i].x*scale, o.y + points[i].y*scale);
	// }

	// HEXAGON SNOWFLAKE RESULT
 //  	hexCanvas.width = hexCanvas.width;
	// hexContext.lineWidth = 4;
	// hexContext.lineCap = "round";

	// var hexPoints = hexagonFromTwelfthHexagon(points);
	// hexContext.moveTo(hexCenter.x + hexPoints[0].x*hexScale, hexCenter.y + hexPoints[0].y*hexScale);
	// for(var i = 1; i < hexPoints.length; i++){
	// 	hexContext.lineTo(hexCenter.x + hexPoints[i].x*hexScale, hexCenter.y + hexPoints[i].y*hexScale);
	// }
	// hexContext.stroke();
}

$("#interface").mousemove(function(event){
	var altitude = window.innerHeight - event.offsetY;
	var scale = 20000 / window.innerHeight;
	altitude *= scale;
	var a = atmosphereAtAltitude(altitude);
	var tempDiff = a.temperature-SEA_LEVEL_TEMPERATURE;
	var pressDiff = a.pressure-SEA_LEVEL_PRESSURE;
	document.getElementById("stats").innerHTML = "<h2>" + 
			a.temperature.toFixed(2) + " &deg;C &Delta;" + tempDiff.toFixed(2) + "&deg;C</h2><h2>" + 
			a.pressure.toFixed(2) + " psi &Delta;" + pressDiff.toFixed(2) + " psi</h2><h2>" +
			a.density.toFixed(2) + " kg/m^3</h2>";
	drawSkyLines( {x:event.offsetX / window.innerWidth, y:event.offsetY / window.innerHeight} );

	document.getElementById("stats").style.left = canvas.width * .5 + "px"; 

	document.getElementById('elevationText').style.left= canvas.width * .11 + "px";
	document.getElementById('elevationText').style.top= event.offsetY + "px";
	document.getElementById('elevationText').innerHTML = "<h3>" + altitude.toFixed(2) + " meters</h2>";
});