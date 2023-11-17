let drumbeat = new Audio("./drumbeat2.wav");
let osc = new Audio("./osc3.wav");
let mallet = new Audio("./mallet2.wav");
let wrong = new Audio("./wrong2.wav");

let instruments = document.querySelectorAll(".instrument");

instruments.forEach(instrument => {
	instrument.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
}

let instrumentContainers = document.querySelectorAll(".instrument-container"); 


instrumentContainers.forEach(instrumentContainer => {
	console.log(instrumentContainer);
	instrumentContainer.addEventListener("dragenter", dragEnter);	
	instrumentContainer.addEventListener("dragover", dragOver);	
	instrumentContainer.addEventListener("dragleave", dragLeave);	
	instrumentContainer.addEventListener("drop", drop);	
});
/*
instrumentContainersHeader.forEach(instrumentContainerHeader => {
	instrumentContainerHeader.removeEventListener("dragenter", dragEnter);	
	instrumentContainerHeader.removeEventListener("dragover", dragOver);	
	instrumentContainerHeader.removeEventListener("dragleave", dragLeave);	
	instrumentContainerHeader.removeEventListener("drop", drop);	
});
*/


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

function validateInstrument(e, instrument, beat) {
	let id = e.dataTransfer.getData("text/plain");
	let draggable = document.getElementById(id);
	let container = e.srcElement.classList[1];

	if(container === `${instrument}-container`) {
		if(draggable.id == `${instrument}`) {
			beat.play();
			e.target.appendChild(draggable);
			draggable.addEventListener("click", () => { beat.play() });
			e.target.classList.add("correct");
		} else {
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

	let correctDrop = document.querySelectorAll(".correct");
	let instrumentTotal = document.querySelectorAll(".instrument");
	let instrumentCountHeader = document.querySelector(".instrumentCount");
	let unarrangedContainer = document.querySelector(".unarranged-container");

	if(correctDrop.length === instrumentTotal.length) {
		instrumentCountHeader.innerHTML = "No more instruments";
		instrumentCountHeader.style.color = "#fff";
		unarrangedContainer.style.backgroundColor = "#7BCCB5";
	}
}




