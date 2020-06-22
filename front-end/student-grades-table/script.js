// The codes were developed and works well on Manjaro Linux with Firefox 73.0 (64-bit)
var clickedRow;
var clickedColumn;
var newAddedColumn;

//generat random number and bind functions
window.onload = function () {
    let trs = this.document.getElementsByTagName("tr");
    let number = 1000000;//student ID
    let count = 0;
    for (let i = 1; i < trs.length; i++) {
        trs[i].children[1].innerText = number;
        number++;
        for (let k = 2; k < 7; k++) {
            let input = document.createElement("input");
            input.type = "number";
            input.required = "true";
            input.placeholder = " - ";
            input.min = "0";
            input.max = "100";
            let mark = Math.round(Math.random() * 100);
            //input.value = mark > 20 ? mark : null;
            if (mark > 20) {
                input.value = mark;
            } else {
                input.value = null;
                count++;
            }
            //input.onkeydown = (input) => { checkNumber(input) };
            input.onclick = () => clearHighlight();
            input.oninput = (input) => { getAverage(input) };
            trs[i].children[k].appendChild(input);
        }
        trs[i].children[0].addEventListener("click", function (event) { highlightRow(event) });
        //trs[i].children[7].addEventListener("click", function (event) { showAmericanGrade(event) });

        //dispatch getAverage function to get the initial data
        var update = new InputEvent('input');
        trs[i].children[3].firstChild.dispatchEvent(update);
        this.document.getElementById("count").innerText = count;
    }
}



//calculate average
function getAverage(event) {
    //check the validation of input data
    if (isNaN(event.target.value) || (Number(event.target.value) > 100) || event.target.value ==="")
        event.target.value = ""
    let tds = event.target.parentNode.parentNode.children;
    //map the row and get the overall grade
    let sum = 0;
    for (let i = 2; i < tds.length - 1; i++) {
        sum += Number(tds[i].firstChild.value)
    }
    //calculate average
    let average = Math.round(sum / (tds.length - 3));
    sum = 0;
    //change the color to red when average below 60
    let ths = this.document.getElementsByTagName("th");
    if (ths[ths.length - 1].innerText == "Average (%)")
        tds[tds.length - 1].innerText = average;
    else if (ths[ths.length - 1].innerText == "Average (Letter)")
        tds[tds.length - 1].innerText = getLetterGrade(average);
    else if (ths[ths.length - 1].innerText == "Average (4.0)")
        tds[tds.length - 1].innerText = getNumberGrade(getLetterGrade(average));
    if (average < 60) {
        tds[tds.length - 1].style.background = "red";
        tds[tds.length - 1].style.color = "white";
    } else {//Change it to common color
        tds[tds.length - 1].style.background = "red";
        tds[tds.length - 1].style.background = tds[1].style.background;
        tds[tds.length - 1].style.color = tds[1].style.color;
    }

    //update the number of the blank cells
    getCount();
    //clear the highlight style
    clearHighlight();
}

//add assignment column
function addColumn() {
    let trs = this.document.getElementsByTagName("tr");
    newAddedColumn = trs[0].children.length;
    for (let i = 0; i < trs.length; i++) {
        let tds = trs[i].children;
        //add head(one click to edit the head, double click to delete the column)
        if (i === 0) {
            tds[tds.length - 1].insertAdjacentHTML("beforebegin", "<th><input type=\"text\" placeholder=\" - \" onclick=\"highlightColumn(event)\" required = \"true\" value=\"Assignment\"></th>");
        } else {//add data column
            tds[tds.length - 1].insertAdjacentHTML("beforebegin", "<td><input type=\"text\" placeholder=\" - \" required = \"true\" oninput=\"getAverage(event)\" onclick=\"clearHighlight()\"></td>");
        }
    }
    //update the number of the blank cells
    manageCount(trs.length - 1);
}

//add row
function addRow() {
    let trs = this.document.getElementsByTagName("tr");
    let lastTr = trs[trs.length - 1];
    let number;
    if (lastTr.children[1].innerText === "")
        number = Number(lastTr.children[1].children[0].value) + 1;
    else
        number = Number(lastTr.children[1].innerText) + 1;
    //name and student ID
    let html = "<tr><td><input type=\"text\" onclick=\"highlightRow(event)\" required = \"true\" placeholder=\" - \" ></td><td><input type=\"text\" required = \"true\" placeholder=\" - \" value=\"" + number + "\"></td>";
    //grades
    for (let i = 1; i < lastTr.children.length - 2; i++) {
        html += "<td><input type=\"number\" required = \"true\" placeholder=\" - \" oninput=\"getAverage(event)\" onclick=\"clearHighlight()\"></td>";
    }
    html += "<td></td>";
    lastTr.insertAdjacentHTML("afterend", html);
    //update the number of the blank cells
    manageCount(lastTr.children.length - 2);
}

//change the grade to letter and 4.0
function changeGrade(event) {
    let index = event.target.cellIndex;
    let rows = this.document.getElementsByTagName("table")[0].rows;
    for (let i = 0; i < rows.length; i++) {
        //change the table head
        if (i === 0) {
            if (event.target.innerText === "Average (%)") {
                rows[0].cells[index].innerText = "Average (Letter)";
            } else if (event.target.innerText === "Average (Letter)") {
                rows[0].cells[index].innerText = "Average (4.0)";
            } else if (event.target.innerText === "Average (4.0)") {
                rows[0].cells[index].innerText = "Average (%)";
            }
        } else {//translate the grades
            if (event.target.innerText === "Average (Letter)") {//100 to letter
                let grade = Number(rows[i].cells[index].innerText);
                rows[i].cells[index].innerText = getLetterGrade(grade);
            } else if (event.target.innerText === "Average (4.0)") {//letter to 4.0
                let grade = rows[i].cells[index].innerText;
                rows[i].cells[index].innerText = getNumberGrade(grade);
            } else if (event.target.innerText === "Average (%)") {//4.0 to 100(recalculate)
                var update = new InputEvent('input');
                rows[i].cells[2].firstChild.dispatchEvent(update);
            }
        }
    }
}

//change the 100 grades to letter
function getLetterGrade(grade) {
    let html;
    if (grade < 60)
        html = "F";
    else if (grade < 63)
        html = "D-";
    else if (grade < 67)
        html = "D";
    else if (grade < 70)
        html = "D+";
    else if (grade < 73)
        html = "C-";
    else if (grade < 77)
        html = "C";
    else if (grade < 80)
        html = "C+";
    else if (grade < 83)
        html = "B-";
    else if (grade < 87)
        html = "B";
    else if (grade < 90)
        html = "B+";
    else if (grade < 93)
        html = "A-";
    else if (grade < 100)
        html = "A";
    return html;
}

//change the letter to 4.0 grades
function getNumberGrade(grade) {
    let html;
    if (grade === "F")
        html = "0.0";
    else if (grade === "D-")
        html = "0.7";
    else if (grade === "D")
        html = "1.0";
    else if (grade === "D+")
        html = "1.3";
    else if (grade === "C-")
        html = "1.7";
    else if (grade === "C")
        html = "2.0";
    else if (grade === "C+")
        html = "2.3";
    else if (grade === "B-")
        html = "2.7";
    else if (grade === "B")
        html = "3.0";
    else if (grade === "B+")
        html = "3.3";
    else if (grade === "A-")
        html = "3.7";
    else if (grade === "A")
        html = "A/4.0";
    return html;
}

//update the number of the blank cells
function manageCount(amount) {
    let count = this.document.getElementById("count");
    count.innerText = Number(count.innerText) + amount;
}

//mapping all cells to get the number of the blank cells
function getCount() {
    let count = 0;
    let inputs = this.document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "")
            count++;
    }
    this.document.getElementById("count").innerText = count;
}

//highlight table row when clicking names
function highlightRow(event) {
    let element;
    if (event.target.tagName === "INPUT")
        element = event.target.parentNode;
    else
        element = event.target;
    if (element === clickedRow) {//double click, remove row
        clickedRow.parentNode.parentNode.removeChild(clickedRow.parentNode);
    } else {
        if (clickedRow !== undefined)// clear other highlight
            clickedRow.parentNode.style.border = "1px solid black";
        //highlight row
        clickedRow = element;
        clickedRow.parentNode.style.border = "2px solid #45C1FF";
    }
}

function highlightColumn(event) {
    let element;
    if (event.target.tagName === "INPUT")
        element = event.target.parentNode;
    else
        element = event.target;
    let index = element.cellIndex;
    let rows = this.document.getElementsByTagName("table")[0].rows;
    if (element === clickedColumn) {//double click, remove row
        for (let i = 0; i < rows.length; i++) {
            if (rows[0].cells.length === 3)
                rows[i].cells[3].innerText = 0;
            rows[i].removeChild(rows[i].cells[index]);
            //recalculate average
            var update = new InputEvent('input');
            rows[i].cells[2].firstChild.dispatchEvent(update);
        }
        clickedColumn = undefined;
    } else {// clear other highlight
        if (clickedColumn !== undefined) {
            let c = clickedColumn.cellIndex;
            for (let i = 0; i < rows.length; i++) {
                rows[i].cells[c].style.borderLeft = "1px solid black";
                rows[i].cells[c].style.borderRight = "1px solid black";
                if (i === 0)
                    rows[i].cells[c].style.borderTop = "1px solid black";
                else if (i === rows.length - 1)
                    rows[i].cells[c].style.borderBottom = "1px solid black";
            }
        }
        //highlight selected column
        clickedColumn = element;
        for (let i = 0; i < rows.length; i++) {
            rows[i].cells[index].style.borderLeft = "2px solid #45C1FF";
            rows[i].cells[index].style.borderRight = "2px solid #45C1FF";
            if (i === 0)
                rows[i].cells[index].style.borderTop = "2px solid #45C1FF";
            else if (i === rows.length - 1)
                rows[i].cells[index].style.borderBottom = "2px solid #45C1FF";
        }

    }
}

//clear all highlight
function clearHighlight() {
    let tds = this.document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
        tds[i].style.border = "1px solid black";
    }
    let trs = tds = this.document.getElementsByTagName("tr");
    for (let i = 0; i < trs.length; i++) {
        trs[i].style.border = "1px solid black";
    }
    let ths = this.document.getElementsByTagName("th");
    for (let i = 0; i < ths.length; i++) {
        ths[i].style.border = "1px solid black";
    }
    clickedRow = undefined;
    clickedColumn = undefined;
}

//remove new added column
function retrieve() {
    if (newAddedColumn > 0) {
        let rows = this.document.getElementsByTagName("table")[0].rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[0].cells.length === 3)
                rows[i].cells[3].innerText = 0;
            rows[i].removeChild(rows[i].cells[newAddedColumn]);
            var update = new InputEvent('input');
            rows[i].cells[2].firstChild.dispatchEvent(update);
        }
        newAddedColumn = 0;
    }
}
