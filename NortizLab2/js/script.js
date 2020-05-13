let inject = document.getElementById('inject');

let list = [];

let currentIndex = 0;
let pCounter = 0;

function injectHtml(url, ) {

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        console.log(url);

        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;
            if (url === '../site/list.html') {
                loadlist(myArr);
            } else if (url === '../site/add.html') {
                loadAdd(myArr);
            }
        }
    };
    xmlhttp.open("GET", url, true);

    xmlhttp.send();
}

function loadlist(info) {
    inject.innerHTML = info;

    let clear = document.getElementById('delete')
    let txtPop = document.getElementById('txtPop');
    txtPop.addEventListener('click', function (e) {
        list.push({
            Title: "",
            thingsToDo: []
        });
        injectHtml('../site/add.html')
    });

    clear.addEventListener('click', function (e) {
        localStorage.clear();
        location.reload();
    });

    if (list && list.length > 0) {
        localStorage.setItem('todoList', JSON.stringify(list));
    }
    console.log(list + 'HERE');
    generateStuff();
}

var myNodeList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodeList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}


function loadAdd(info) {
    inject.innerHTML = info;

    let saveBtn = document.getElementById('saveBtn');

    saveBtn.addEventListener('click', function (e) {
        save();
    });
}

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    myUL.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
        }
    }, false);
}

function saveElement(info) {
    let saveList = document.getElementById('saveList');
    let title = document.getElementById('title');

    saveList.addEventListener('click', function (e) {
        list[currentIndex].title = title.value;
        currentIndex++;
        console.log(list);
        console.log(title.value);
        injectHtml('../site/list.html');
    });
}

function generateStuff() {
    let exampleDiv = document.getElementById('exampleDiv');
    let storageList = JSON.parse(localStorage.getItem('todoList')) || [];

    storageList.forEach(obj => {
        let container = document.createElement('div');
        container.setAttribute('class', 'container');

        let title = document.createElement('h2');
        title.innerText = obj.title;

        let ul = document.createElement('ul');
        obj.thingsToDo.forEach(ToDo => {
            let li = document.createElement('li');
            li.innerText = ToDo;
            ul.appendChild(li);

        });
        container.appendChild(title);
        container.appendChild(ul);
        exampleDiv.appendChild(container);
    });
    list = storageList;
}

injectHtml('../site/list.html')