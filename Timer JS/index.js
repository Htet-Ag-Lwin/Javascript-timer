const timerStop = document.getElementById("timer-stop");
const timerStart = document.getElementById("timer-start");
const btnTimerDismiss = document.getElementById("timerDismiss");
const btnTimerChooseTone = document.getElementsByClassName("timerAudio")[0];
let timerTone;
let hour;
let minute;
let second;
let prevTimerHour;
let prevTimerMinute;
let prevTimerSecond;

const getCurrentTime = () => {
  hour = parseInt(getInputTimer("h").value);
  minute = parseInt(getInputTimer("m").value);
  second = parseInt(getInputTimer("s").value);
};

function setMode(id) {
  const btnTimer = document.getElementById("btnTimer");
  const btnAlarm = document.getElementById("btnAlarm");
  const timerRestart = document.getElementById("timerRestart");

  const alarmSnooze = document.getElementById("alarmSnooze");
  const alarmStartStop = document.getElementById("alarmStartStop");
  switch (id) {
    case "timer":
      document.getElementById("timer").style.display = "initial";
      document.getElementById("alarm").style.display = "none";
      setBtnActive(btnTimer);
      setBtnInactive(btnAlarm);
      timerRestart.innerHTML = "Restart";

      break;

    case "alarm":
      document.getElementById("timer").style.display = "none";
      document.getElementById("alarm").style.display = "initial";
      setBtnActive(btnAlarm);
      setBtnInactive(btnTimer);
      alarmSnooze.innerHTML = "Snooze";
      alarmStartStop.innerHTML = "Start";
      break;
  }
}

function setBtnActive(element) {
  element.style.backgroundColor = "chartreuse";
  element.style.outline = "none";
  element.style.boxShadow = "7px 7px 10px gray";
}

function setBtnInactive(element) {
  element.style.backgroundColor = "#e22727";
  element.style.boxShadow = "none";
}

function increase(id) {
  const element = document.getElementById(id);
  let result = parseInt(element.value) + 1;
  switch (id) {
    case "inputHours":
      if (result > 23) {
        result = "00";
      }
      break;
    case "inputMinutes":
      if (result > 59) {
        result = "00";
        increase("inputHours");
      }
      break;
    case "inputSeconds":
      if (result > 59) {
        result = "00";
        increase("inputMinutes");
      }
      break;
  }
  element.value = result;
}

function decrease(id) {
  const element = document.getElementById(id);
  let result = parseInt(element.value) - 1;
  switch (id) {
    case "inputHours":
    case "inputMinutes":
    case "inputSeconds":
      if (result < 1) {
        result = "00";
      }
      break;
  }
  element.value = result;
}

function restartTimer() {
  const hour = getInputTimer("h");
  const minute = getInputTimer("m");
  const second = getInputTimer("s");
  hour.value = "00";
  minute.value = "00";
  second.value = "00";
  clearInterval(interval); // !important
  timerStart.style.display = "initial";
  timerStop.style.display = "none";
  document.getElementById("timerSound").pause();
  document.getElementById("timerSound").src = "";
  timerTone = undefined;
  btnTimerDismiss.style.display = "none";
  btnTimerChooseTone.style.display = "initial";
}

var interval;
function startTimer() {
  getCurrentTime();
  prevTimerHour = hour;
  prevTimerMinute = minute;
  prevTimerSecond = second;
  if ((second > 0 || minute > 0 || hour > 0) && timerTone !== undefined) {
    interval = setInterval(countDown, 1000);
    timerStart.style.display = "none";
    timerStop.style.display = "initial";
    btnTimerChooseTone.style.display = "none";
  }
}

function stopTimer() {
  clearInterval(interval);
  timerStop.style.display = "none";
  timerStart.style.display = "initial";
}

function getInputTimer(id) {
  switch (id) {
    case "h":
      return document.getElementById("inputHours");
    case "m":
      return document.getElementById("inputMinutes");
    case "s":
      return document.getElementById("inputSeconds");
  }
}

function countDown() {
  const elementHour = getInputTimer("h");
  const elementMinute = getInputTimer("m");
  const elementSecond = getInputTimer("s");
  getCurrentTime();

  if (second > 0) {
    second -= 1;
  } else if (minute > 0) {
    minute -= 1;
    second += 59;
  } else if (hour > 0) {
    hour -= 1;
    minute += 59;
  } else {
    document.getElementById("timerSound").play();
    btnTimerDismiss.style.display = "initial";
    clearInterval(interval);
    timerStop.style.display = "none";
    timerStart.style.display = "initial";
  }

  elementSecond.value = second === 0 ? "00" : second;
  elementMinute.value = minute === 0 ? "00" : minute;
  elementHour.value = hour === 0 ? "00" : hour;
}

document.getElementById("timerAudio").addEventListener("change", (event) => {
  if (event.target.files[0].type === "audio/mpeg") {
    document.getElementById("timerSound").src = URL.createObjectURL(
      event.target.files[0]
    );
    timerTone = event.target.files[0];
  }
});

const timerDismiss = () => {
  const elementHour = getInputTimer("h");
  const elementMinute = getInputTimer("m");
  const elementSecond = getInputTimer("s");
  document.getElementById("timerSound").pause();
  document.getElementById("timerSound").src = "";
  timerTone = undefined;
  btnTimerDismiss.style.display = "none";
  btnTimerChooseTone.style.display = "initial";
  elementSecond.value = prevTimerSecond === 0 ? "00" : prevTimerSecond;
  elementMinute.value = prevTimerMinute === 0 ? "00" : prevTimerMinute;
  elementHour.value = prevTimerHour === 0 ? "00" : prevTimerHour;
};
