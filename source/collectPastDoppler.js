"strict mode";
let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var


function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
			console.log("Got 10 doppler images");
		}
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0');
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	};
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	};
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

}

getTenImages();

function loadImages(){
    let myDoppler = document.getElementById("Doppler");
    for (let i = 0; i < 10; i++) {
        let node = imageArray[i];
        myDoppler.appendChild(node);
        node.style.position = "absolute";
        node.style.top = "20px";
        node.style.left = "inherit";
        node.style.width = "inherit";
        // node.style.height = "inherit";
    }
}



function startInterval() {
    console.log("start interval.");
    let timer = setTimeout(function () {
        show(0);
        let myInterval = setInterval(show,10000,0);
        timer = setTimeout(function () {
            hide(0);
            show(1);
            myInterval = setInterval(hide,10000,0);
            myInterval = setInterval(show,10000,1);
            timer = setTimeout(function () {
                hide(1);
                show(2);
                myInterval = setInterval(hide,10000,1);
                myInterval = setInterval(show,10000,2);
                timer = setTimeout(function () {
                    hide(2);
                    show(3);
                    myInterval = setInterval(hide,10000,2);
                    myInterval = setInterval(show,10000,3);
                    timer = setTimeout(function () {
                        hide(3);
                        show(4);
                        myInterval = setInterval(hide,10000,3);
                        myInterval = setInterval(show,10000,4);
                        timer = setTimeout(function () {
                            hide(4);
                            show(5);
                            myInterval = setInterval(hide,10000,4);
                            myInterval = setInterval(show,10000,5);
                            timer = setTimeout(function () {
                                hide(5);
                                show(6);
                                myInterval = setInterval(hide,10000,5);
                                myInterval = setInterval(show,10000,6);
                                timer = setTimeout(function () {
                                    hide(6);
                                    show(7);
                                    myInterval = setInterval(hide,10000,6);
                                    myInterval = setInterval(show,10000,7);
                                    timer = setTimeout(function () {
                                        hide(7);
                                        show(8);
                                        myInterval = setInterval(hide,10000,7);
                                        myInterval = setInterval(show,10000,8);
                                        timer = setTimeout(function () {
                                            hide(8);
                                            show(9);
                                            myInterval = setInterval(hide,10000,8);
                                            myInterval = setInterval(show,10000,9);
                                            timer = setTimeout(function () {
                                                hide(9);
                                                myInterval = setInterval(hide,10000,9);
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000) //recursive calls to cycle the images
        }, 1000);
    }, 0);

    function show(index){
        console.log("show index:"+ index);
        let myVar = document.getElementById("doppler_" + index);
        myVar.style.display = "inline";
    }
    function hide(index){
        console.log("hide index:"+ index);
        let myVar = document.getElementById("doppler_" + index);
        myVar.style.display = "none";
    }
}


    function goUp(){
    let element = document.getElementById("nextFiveHourTemp");
    element.style.display = "block";
    element.classList.add("slidingUp");
    element.classList.remove("slidingDown");
    }

    function goDown(){
    let element = document.getElementById("nextFiveHourTemp");
    element.classList.remove("slidingUp");
    element.classList.add("slidingDown");
    let timer = setTimeout(function(){
        element.style.display = "none";
    },500)

    }







