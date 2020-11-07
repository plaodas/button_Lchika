mainFunction();

async function mainFunction() {
  var connectButton = document.getElementById("connect");
  connectButton.onclick = connect;

  var onoff = document.getElementById("onoff");
  onoff.onmousedown = onLed;
  onoff.onmouseup = offLed;
}

function onLed() {
  ledOnOff(1);
}

function offLed() {
  ledOnOff(0);
}

function ledOnOff(v) {
  var ledView = document.getElementById("ledView");
  if (v === 0) {
    gpioPort0.write(0);
    ledView.style.backgroundColor = "black";
  } else {
    gpioPort0.write(1);
    ledView.style.backgroundColor = "red";
  }
}

var gpioPort0, gpioPort2;
async function connect() {
  var microBitBle = await microBitBleFactory.connect();
  var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out");
  gpioPort2 = gpioAccess.ports.get(2); // タクトスイッチのポート番号
  await gpioPort2.export("in");
  await readSwitchLoop();
}

async function readSwitchLoop() {
  for (;;) {
    var val = await gpioPort2.read(); // Port 2の状態を読み込む
    val = val === 0 ? 1 : 0; // スイッチは Pull-up なので OFF で 1、LED は OFF で 0 なので反転させる
    ledOnOff(val);
    await sleep(100);
  }
}
