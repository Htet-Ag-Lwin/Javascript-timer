function setMode(id) {
  const btnTimer = document.getElementById("btnTimer");
  const btnAlarm = document.getElementById("btnAlarm");
  const timerRestart = document.getElementById("timerRestart");
  const timerStartStop = document.getElementById("timer-start-stop");
  const alarmSnooze = document.getElementById("alarmSnooze");
  const alarmStartStop = document.getElementById("alarmStartStop");
  switch (id) {
    case "timer":
      document.getElementById("timer").style.display = "initial";
      document.getElementById("alarm").style.display = "none";
      setBtnActive(btnTimer);
      setBtnInactive(btnAlarm);
      timerRestart.innerHTML = "Restart";
      timerStartStop.innerHTML = "Start";

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
}

var interval;
function startTimer() {
  interval = setInterval(countDown, 1);
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
  let hour = parseInt(getInputTimer("h").value);
  let minute = parseInt(getInputTimer("m").value);
  let second = parseInt(getInputTimer("s").value);

  if (second > 0) {
    second -= 1;
  } else if (minute > 0) {
    minute -= 1;
    second += 59;
  } else if (hour > 0) {
    hour -= 1;
    minute += 59;
  } else {
    clearInterval(interval);
  }

  elementSecond.value = second;
  elementMinute.value = minute;
  elementHour.value = hour;
}
