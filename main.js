window.onload = function mainFunction() {
  var onoff = document.getElementById("onoff");
  onoff.onclick = controlLed;
  var connectButton = document.getElementById("connect");
  connectButton.onclick = connect;
};

var v = 0;
function controlLed() {
  v = v === 0 ? 1 : 0;
  var ledView = document.getElementById("ledView");
  ledView.style.backgroundColor = v === 1 ? "red" : "black";
  gpioPort0.write(v);
}
var gpioPort0;
async function connect() {
  var microBitBle = await microBitBleFactory.connect();
  var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out");
}
