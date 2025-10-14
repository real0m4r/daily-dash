let timezones = [];

window.onload = () => {
  fetch("https://worldtimeapi.org/api/timezone")
    .then(res => res.json())
    .then(data => timezones = data);
};

document.getElementById("searchInput").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!input) return;

  const filtered = timezones.filter(tz => tz.toLowerCase().includes(input)).slice(0, 10);

  filtered.forEach(tz => {
    const li = document.createElement("li");
    li.textContent = tz;
    li.onclick = () => {
      document.getElementById("searchInput").value = tz;
      suggestions.innerHTML = "";
      getTime(tz);
    };
    suggestions.appendChild(li);
  });
});

function getTime(timezone) {
  const resultDiv = document.getElementById("result");
  fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .then(res => res.json())
    .then(data => {
      const datetime = new Date(data.datetime);
      resultDiv.textContent = `Time in ${timezone}: ${datetime.toLocaleTimeString()}`;
    })
    .catch(() => {
      resultDiv.textContent = "Failed to fetch time.";
    });
}
let currentDate = null;
let intervalId = null;

function getTime(timezone) {
  const resultDiv = document.getElementById("result");
  clearInterval(intervalId); // Stop any previous ticking clocks

  fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .then(res => res.json())
    .then(data => {
      currentDate = new Date(data.datetime);
      const offsetSec = data.raw_offset + data.dst_offset;

      // Display and start ticking
      updateClock(resultDiv, timezone, offsetSec);
      intervalId = setInterval(() => {
        currentDate.setSeconds(currentDate.getSeconds() + 1);
        updateClock(resultDiv, timezone, offsetSec);
      }, 1000);
    })
    .catch(() => {
      resultDiv.textContent = "Failed to fetch time.";
    });
}

function updateClock(el, tz, offsetSec) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  };

  const localTime = new Date(currentDate.getTime() + offsetSec * 1000);
  el.textContent = `Time in ${tz}: ${localTime.toLocaleTimeString('en-US', options)}`;
}
