//save generated number
var generatedCommands = [];
//user click order
var realCommands = [];
//click counter
var clickTimes = 0;
//var startTime;
var timer;

async function start() {
    //switch light to green
    document.getElementsByClassName('dot')[0].style.backgroundColor = '#83C643';
    //reset score
    document.getElementsByClassName('right-number')[0].innerText = "00";
    //diable start button
    document.getElementsByClassName('middle-button')[0].onclick = function () { };
    await sleep(3000);
    addCommand();
}

//add a command
function addCommand() {
    //get random number
    let randomNumber = Math.floor(Math.random() * 4)
    generatedCommands.push(randomNumber);
    console.log(generatedCommands)
    display();
}

//show the click
async function display() {
    for (i = 0; i < generatedCommands.length; i++) {
        let button;
        if (buttonEnum.green == generatedCommands[i]) {
            button = document.getElementsByClassName('green')[0];
        } else if (buttonEnum.red == generatedCommands[i]) {
            button = document.getElementsByClassName('red')[0];
        } else if (buttonEnum.blue == generatedCommands[i]) {
            button = document.getElementsByClassName('blue')[0];
        } else if (buttonEnum.yellow == generatedCommands[i]) {
            button = document.getElementsByClassName('yellow')[0];
        }
        //display shadow
        button.style.boxShadow = '0 0 10px #000'
        //remove shadow
        setTimeout(function () {
            button.style.boxShadow = '0 0 0 #fff';
        }, (300));

        //let classes = button.getAttribute("class").concat(' small-circle')
        //button.setAttribute('class', classes);
        //button.click();

        //speeds up the interval
        await sleep(1000 - (generatedCommands.length - 2) / 4 * 800);
    }
    clearTimeout(timer);
    timer = setTimeout(fail,5000);
    //time = new Date();
    //timer = setInterval(timeChecker, 1000);
}

function timeChecker() {
    now = new Date();
    console.log(now - time);
}

//check the click
async function check(event) {
    //for (i = 0; i < generatedCommands.length; i++) {
    let number;
    if (event.target.className.includes("green")) {
        number = 0;
    } else if (event.target.className.includes("red")) {
        number = 1;
    } else if (event.target.className.includes("blue")) {
        number = 2;
    } else if (event.target.className.includes("yellow")) {
        number = 3;
    }
    //right repeat
    if (generatedCommands[clickTimes] === number) {
        clickTimes++;
        if (clickTimes === generatedCommands.length) {
            clearTimeout(timer);
            //setting score
            let score = Number(document.getElementsByClassName('right-number')[0].innerText) + 1;
            //deciding if add "0" before score
            document.getElementsByClassName('right-number')[0].innerText = score < 99 ? prefixInteger(score, 2) : score;
            //alert('Nice!');
            clickTimes = 0;
            await sleep(600);
            addCommand();
        }
    } else {//fail repeat
        clearTimeout(timer);
        fail();
    }

}

async function fail() {
    let buttons = document.getElementsByClassName('small-circle');
    for (i = 0; i < 5; i++) {
        //display shadow
        for (let item of buttons) {
            item.style.boxShadow = '0 0 10px #000';
        }
        //remove shadow
        for (let item of buttons) {
            setTimeout(function () {
                item.style.boxShadow = '0 0 0 #fff';
            }, (100)
            )
        }
        await sleep(200);
    }
    //setting highestMark
    let highestMark = Number(document.getElementsByClassName('left-number')[0].innerText);
    let score = Number(document.getElementsByClassName('right-number')[0].innerText);
    if (score > highestMark)
        document.getElementsByClassName('left-number')[0].innerText = score < 99 ? prefixInteger(score, 2) : score;
    clickTimes = 0;
    generatedCommands = [];
    //enable start
    document.getElementsByClassName('middle-button')[0].onclick = function () { start() };
    //switch light
    document.getElementsByClassName('dot')[0].style.backgroundColor = '#f00';
}

//wait for a time
function sleep(ms) {
    return new Promise(x => setTimeout(x, ms));
}

//add "0" before score
function prefixInteger(num, length) {
    //str.substr(start[, length]) will be removed, substring() is recommended
    //If start is a negative number, the index starts counting from the end of the string. Its value is capped at -str.length.
    return ("00000000" + num).substr(-length);
}

//button color and value
var buttonEnum = {
    green: 0,
    red: 1,
    blue: 2,
    yellow: 3,
};

