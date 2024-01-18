// function for update clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  document.getElementById("clock").innerHTML = `${hours % 12 || 12}:${padZero(
    minutes
  )}:${padZero(seconds)} ${ampm} `; //${ampm}
}

function padZero(value) {
  return value < 10 ? "0" + value : value;
}
// function for set Alarm
function setAlarm() {
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;
  const ampm = document.getElementById("ampm").value;

  const alarmTime = `${padZero(hour)}:${padZero(minute)}:${padZero(
    second
  )} ${ampm}`;
  const alarmList = document.getElementById("alarms");

  const alarmItem = document.createElement("div");
  alarmItem.innerHTML = `${alarmTime} <button onclick="deleteAlarm(this)">Delete</button>`;
  alarmList.appendChild(alarmItem);

  // Set a timeout for the alarm
  const now = new Date();
  const alarmDateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    convertTo24Hour(hour, ampm),
    minute,
    second
  );
  const timeUntilAlarm = alarmDateTime - now;

  setTimeout(() => {
    alert(`Alarm! ${alarmTime}`);
    alarmItem.remove();
  }, timeUntilAlarm);
}
// function for delete alaram
function deleteAlarm(button) {
  const alarmItem = button.parentNode;
  alarmItem.remove();
}
//function for set 12 hour time
function convertTo24Hour(hour, ampm) {
  if (ampm === "am" && hour === "12") {
    return 0;
  } else if (ampm === "pm" && hour !== "12") {
    return parseInt(hour, 10) + 12;
  } else {
    return parseInt(hour, 10);
  }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();
