//window.οnlοad=function(){
var red = 108;
var yellow = 49;
var golden = 65;
var blue = 65;
var brown = 59;
var green = 59;
//}

function add(event) {
    // console.log(event.target.parentNode);
    // console.log(event.srcElement.parentNode);
    // console.log(event.originalTarget.parentNode);
    // console.log(event.explicitOriginalTarget.parentNode);
    let value = event.target.parentNode.children[1].innerHTML;
    event.target.parentNode.children[1].innerHTML = Number(value) + 1;
    changeColor(event, Number(value) + 1, 1);
}

function minus(event) {
    let value = event.target.parentNode.children[1].innerHTML;
    if (Number(value) > 0) {
        event.target.parentNode.children[1].innerHTML = Number(value) - 1;
        changeColor(event, Number(value) - 1, -1);
    }
}

function changeColor(event, value, operator) {
    //let test = document.getElementsByClassName("yellow");
    // let test = document.getElementById("yellow").style;
    // console.log(test);
    // console.log(event.target.parentNode.parentNode.style.borderBottom);
    // console.log(event.target.parentNode.parentNode.style.borderBottom);
    // let width = Number(event.target.parentNode.parentNode.style.borderBottom);
    // console.log(width);
    //event.target.parentNode.parentNode.parentNode.style.border="none";
    //event.target.parentNode.parentNode.style.border-bottom +=1;
    //console.log(value);
    if (value > 7) {
        event.target.parentNode.children[1].style.background = "#f00";
    } else {
        event.target.parentNode.children[1].style.background = "#929292";
    }

    let className = event.target.parentNode.parentNode.getAttribute("class");

    if (className.search("red") > -1) {
        red += operator;
        event.target.parentNode.parentNode.style.borderBottom = red + "px solid #DA3B26";
    } else if (className.search("yellow") > -1) {
        yellow += operator;
        event.target.parentNode.parentNode.style.borderBottom = yellow + "px solid #EFBD40";
    } else if (className.search("golden") > -1) {
        golden += operator;
        event.target.parentNode.parentNode.style.borderBottom = golden + "px solid #F6E359";
    } else if (className.search("blue") > -1) {
        blue += operator;
        event.target.parentNode.parentNode.style.borderBottom = blue + "px solid #479FF8";
    } else if (className.search("brown") > -1) {
        brown += operator;
        event.target.parentNode.parentNode.style.borderBottom = brown + "px solid #A37B4B";
    } else if (className.search("green") > -1) {
        green += operator;
        event.target.parentNode.parentNode.style.borderBottom = green + "px solid #81D653";
    }
}

function showDate(event) {
    let value = event.target.parentNode.children[0].value;
    if (value.length !== 0) {
        window.alert("The date is : " + value);
    } else {
        window.alert("There is no date");
    }
    console.log(value);
}
