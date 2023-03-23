let askHours = document.querySelector('#askHours');
let askMinutes = document.querySelector('#askMinutes');
let askSeconds = document.querySelector('#askSeconds');
let timers = document.querySelector('.timers');
let addBtn = document.querySelector('.add');
const hour = 3600;
const minute = 60;
const seconds = 60;
let time = 0;
let timersArray = [];

function addTimer() {
    const timerItem = {
        time: 0,
        h: +askHours.value,
        m: +askMinutes.value,
        s: +askSeconds.value,
        id: `${Math.random()}`,
    }
    if (askHours.value == '') {
        askHours.value = 0;
        timerItem.h = 0;
    }
    timersArray.push(timerItem);
    let html = '';
    timersArray.forEach(timerItem => {
        html += `
        <div class="timer__info" data-id="${timerItem.id}">
            <div class="time">
                <span id="h" data-id="${timerItem.id}">${timerItem.h}</span> :
                <span id="m" data-id="${timerItem.id}">${timerItem.m}</span> :
                <span id="s" data-id="${timerItem.id}">${timerItem.s}</span>
            </div>
                <button class="start" data-id="${timerItem.id}">start</button>
                <button class="stop" data-id="${timerItem.id}">stop</button>
                <div class="out" data-id="${timerItem.id}"></div>
        </div>
        `;
    })
    timers.innerHTML = html;
    console.log(timerItem);
    console.log(timersArray);
};
addBtn.onclick = function () {
    addTimer();
};


function timeToSeconds(item) {
    item.time = item.h * hour + item.m * minute + item.s;
    console.log(item.time);
    return item.time;
};
let out = document.querySelector('.out');

function timer(item, out) {
    let timer = setInterval(function () {
        // Условие если время закончилось то...
        timers.addEventListener('click', function (e) {
            if (e.target.className == 'stop') {
                e.target.setAttribute('disabled', true);
                document.querySelector('.start').removeAttribute('disabled');
                addBtn.removeAttribute('disabled');
                clearInterval(timer);
            }
        })
        if (item.time <= 0) {
            // Таймер удаляется
            clearInterval(timer);
            document.querySelector('.start').removeAttribute('disabled');
            addBtn.removeAttribute('disabled');
            // Выводит сообщение что время закончилось
            alert("Время закончилось");
        } else { // Иначe
            addBtn.setAttribute('disabled', true);
            --item.time;
            if (item.m > 0 && item.s == 0) {
                item.m -= 1;
                item.s = 59;
            }
            if (item.m == 0 && item.s == 0) {
                item.h--;
                item.m = 60;
            }
            if (item.s == 0 && item.m != 0) {
                item.m--;
                item.s = 60;
            }
            if (item.time == 0) {
                item.time,
                    item.m,
                    item.s = 0;
            }
            console.log(item.time);
            out.innerHTML = `${item.h}:${item.m}:${item.s}`;
            --item.s;

        }
    }, 1000)
}
timers.addEventListener('click', function (e) {
    if (e.target.className == 'start') {
        e.target.setAttribute('disabled', true);
        document.querySelector('.stop').removeAttribute('disabled');
        let id = e.target.dataset.id;
        let parentElem = e.target.parentNode;
        if (id == parentElem.dataset.id) {
            console.log('work');
        }
        let currentTimer;
        let out = parentElem.querySelector('.out');
        timersArray.forEach(timerItem => {
            if (timerItem.id == id) {
                currentTimer = timerItem;
            }
        })
        timeToSeconds(currentTimer);
        timer(currentTimer, out);
    }
})