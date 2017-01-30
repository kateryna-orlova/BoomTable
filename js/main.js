var DELAY = 30;
var STEP = 10;
var PX = 'px';

var intervalId;
var table = CreateTable();
positionTable(table);
var config = getConfig(table);
positionCells(config);
createButton();

	function createButton(wrapper) {
		wrapper = wrapper || document.body;
		var button = document.createElement('button');
		button.textContent = 'Start / Stop';
		wrapper.appendChild(button);

		button.addEventListener('click', function() {
			if (typeof intervalId == 'undefined') {
				runAnimation(config);
			} else {
				stopAnimation();
			}
		});
	}
	function CreateTable () {
		var table = document.createElement('table');
		table.appendChild(document.createElement('tbody'));
		for(var i=0; i < 10; i++) {
			var row=table.tBodies[0].insertRow(-1);
			for(var j=0; j<10; j++) {
					var text = document.createElement('span');
					text.style.backgroundColor = getRandomColor();
					row.insertCell(-1).appendChild(text);
		}
		}
		document.body.appendChild(table);
		return table;
	}
	function getConfig(table) {
		var config = [];
		var tds = document.getElementsByTagName('td');
		for (var i = 0; i < tds.length; i++) {
			config.push({
				td: tds[i],
				defaults: {
					top: tds[i].offsetTop,
					left: tds[i].offsetLeft,
				},
				vector: {
					x: getRandomNegativeInteger(-10,10),
					y: getRandomNegativeInteger(-10,10),
				}
			});
		}
		return config;
	}
	function positionTable(table) {
		table.style.position = 'absolute';
		table.style.top = window.innerHeight / 2 - table.clientHeight / 2 + PX;
		table.style.left = window.innerWidth / 2 - table.clientWidth / 2 + PX;
	}
	function positionCells(config) {
	for (var i = 0; i < config.length; i++) {
		config[i].td.style.position = 'absolute';
		config[i].td.style.top = config[i].defaults.top + PX;
		config[i].td.style.left = config[i].defaults.left + PX;
	}
}

	function getRandomColor() {
	    var str = '#';
	    var HEX_COLOR_LENGTH = 6;
	    for (var i = 0; i < HEX_COLOR_LENGTH; i++) {
	        str += getRandomInteger(0, 15).toString(16);
	    }
	    return str;
	}
	function getRandomInteger(min, max) {
    	return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
	}
	function getRandomNegativeInteger(min, max) {
    	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
	}
function runAnimation(config) {
	intervalId = setInterval(animate, DELAY);
}
function stopAnimation() {
	clearInterval(intervalId);
	intervalId = undefined;
}

function animate() {
	for (var i = 0; i < config.length; i++) {
		move(config[i]);
	}
}

function move(cell) {
	var top = parseInt(cell.vector.y + parseInt(cell.td.style.top)  + PX) + parseInt(table.style.top) ;
	var left = parseInt(cell.vector.x + parseInt(cell.td.style.left) + PX) + parseInt(table.style.left) ;
	var w = window.innerWidth;
	var h = window.innerHeight;
	if(top+33 >= h || top <=0) {
		cell.vector.y *=(-1);
	}
	if( left+33 >= w || left <=0 ) {
		cell.vector.x *=(-1);
	}
	cell.td.style.top = cell.vector.y+parseInt(cell.td.style.top) + PX;
	cell.td.style.left = cell.vector.x+parseInt(cell.td.style.left) + PX;
}