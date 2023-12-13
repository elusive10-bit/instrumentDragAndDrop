let drumbeat = new Audio("./drumbeat2.wav");
let osc = new Audio("./osc3.wav");
let mallet = new Audio("./mallet2.wav");
let synth = new Audio("./synth.wav");
let wrong = new Audio("./wrong2.wav");

let themeSwitcher = document.querySelector(".theme");
let themeLogo = document.querySelector(".theme-logo");
let body = document.querySelector("body");
themeSwitcher.addEventListener("click", () => {
	console.log(themeSwitcher.innerHTML);

	console.log(themeLogo.getAttribute("alt"));
	console.log(themeLogo.getAttribute("src"));
	if(themeLogo.getAttribute("alt") === "dark") {
		themeLogo.setAttribute("src", "light.svg");
		themeLogo.setAttribute("alt", "light");
		body.classList.add("dark");
	} else {
		themeLogo.setAttribute("src", "darkness.svg");
		themeLogo.setAttribute("alt", "dark");
		body.classList.remove("dark");
	}
});

let instrumentList = [
	drumbeat,
	osc,
	mallet,
	synth,
	wrong
];

let instruments = document.querySelectorAll(".instrument");

instruments.forEach(instrument => {
	instrument.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
}

let instrumentContainers = document.querySelectorAll(".instrument-container"); 

instrumentContainers.forEach(instrumentContainer => {
	instrumentContainer.addEventListener("dragenter", dragEnter);	
	instrumentContainer.addEventListener("dragover", dragOver);	
	instrumentContainer.addEventListener("dragleave", dragLeave);	
	instrumentContainer.addEventListener("drop", drop);	
});

function dragEnter(e){
	e.preventDefault();	
	e.target.classList.add("drag-over");
}

function dragOver(e){
	e.preventDefault();	
	e.target.classList.add("drag-over");
}

function dragLeave(e) {
	e.preventDefault();
	e.target.classList.remove("drag-over");
}
function pauseOtherInstruments(instrument) {
	instrumentList.forEach(instrument => {
		instrument.pause();
	});
}
function validateInstrument(e, instrument, beat) {
	let id = e.dataTransfer.getData("text/plain");
	let draggable = document.getElementById(id);
	let container = e.srcElement.classList[1];

	if(container === `${instrument}-container`) {
		if(draggable.id == `${instrument}`) {
			pauseOtherInstruments();
			beat.play();
			draggable.classList.add("instrument-correct");
			draggable.draggable = false;
			e.target.appendChild(draggable);
			e.target.classList.add("correct");
		} else {
			pauseOtherInstruments();
			wrong.play();
			alert("wrong container");
		}
	}	
}

function drop (e) {
	e.target.classList.remove("drag-over");

	validateInstrument(e, "drum", drumbeat);
	validateInstrument(e, "osc", osc);
	validateInstrument(e, "mallet", mallet);
	validateInstrument(e, "synth", synth);

	let correctDrop = document.querySelectorAll(".correct");
	let instrumentTotal = document.querySelectorAll(".instrument");
	let instrumentCountHeader = document.querySelector(".instrumentCount");
	let unarrangedContainer = document.querySelector(".unarranged-container");

	if(correctDrop.length === instrumentTotal.length) {
		instrumentCountHeader.innerHTML = "No more instruments. Thanks for arranging them! :)";
		unarrangedContainer.classList.add("animate-unarranged-container");
	}
}




