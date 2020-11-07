/**
 * Minified by jsDelivr using Terser v5.3.0.
 * Original file: /npm/@chirimen/microbit@1.1.0/microBitBLE.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
! function (e) {
    var r = e.navigator,
        n = [],
        t = !1,
        o = function () {
            var e = "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
                o = "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
                i = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
            var s = [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1],
                u = [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
                l = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                d = 0,
                m = 1,
                f = 2;

            function g(e, r) {
                var n = "",
                    t = !1,
                    o = r,
                    i = !0,
                    s = !1;
                async function g() {
                    if (h) {
                        var r = "P" + c(o, 2) + c(d, 2);
                        await e.sendCmd2MicroBit(r), h = !1
                    }
                    if (i) throw Error("Can't read. This port's mode is " + n);
                    r = s ? "i" : "I", r += c(o, 2);
                    var t = await e.sendCmd2MicroBit(r);
                    return null == t ? void console.error("mbBLE com error...") : (console.log("GPIO read:", o, t), Number(t[0].split(",")[1]))
                }
                var v = null,
                    b = !1;
                return {
                    get portNumber() {
                        return r
                    },
                    get portName() {
                        return String(r)
                    },
                    get pinName() {
                        return String(r)
                    },
                    get direction() {
                        return n
                    },
                    get exported() {
                        return t
                    },
                    debug: async function () {
                        await e.sendCmd2MicroBit("P" + c(o, 2) + c(d, 2))
                    },
                    export: async function (r, a) {
                        if (t) throw Error("Already exported. Use unexport().");
                        switch (n = r.toLowerCase(), t = !0, n) {
                            case "in":
                                i = !1, s = !1, a || (a = "up");
                                break;
                            case "out":
                                if (0 == u[o]) throw Error("This port is not supported digital out");
                                i = !0, s = !1;
                                break;
                            case "analogin":
                                if (0 == l[o]) throw Error("This port is not supported analog in");
                                i = !1, s = !0, a || (a = "none");
                                break;
                            case "analogout":
                                if (0 == l[o]) throw Error("This port is not supported analog out");
                                i = !0, s = !0;
                                break;
                            case "pwmout":
                                throw Error("PWM out is Under development...");
                            default:
                                throw Error("NOT SUPPORTED MODE")
                        }
                        if (a) {
                            var g = d;
                            switch (a) {
                                case "none":
                                    g = d;
                                    break;
                                case "down":
                                    g = m;
                                    break;
                                case "up":
                                    g = f;
                                    break;
                                default:
                                    console.log("pull mode none...")
                            }
                            var v = "P" + c(o, 2) + c(g, 2),
                                h = await e.sendCmd2MicroBit(v);
                            if (null == h) return void console.error("mbBLE com error...");
                            console.log("GPIO set pullMode[n,d,u]:", o, h)
                        }
                    },
                    unexport: async function () {
                        t = !1, n = ""
                    },
                    read: g,
                    write: async function (r) {
                        if (i) {
                            var t;
                            (r = Math.floor(r)) < 0 && (r = 0), s ? (t = "o", r > 1023 && (r = 1023)) : (r > 1 && (r = 1), t = "O"), t += c(o, 2) + c(r, 4);
                            var a = await e.sendCmd2MicroBit(t);
                            return null != a || void console.error("mbBLE com error...")
                        }
                        throw Error("Can't write. This port's mode is " + n)
                    },
                    set onchange(e) {
                        v = e, async function () {
                            if (n.indexOf("in") < 0) console.log("onchange should be in mode");
                            else if (!b) {
                                b = !0;
                                for (var e = -1; v;) {
                                    var r = await g();
                                    null == r && (console.log("sending... skip"), r = e), e != r && v(r), e = r, await a(250)
                                }
                                b = !1
                            }
                        }()
                    },
                    get OnChangeFunc() {
                        return v
                    }
                }
            }

            function v(e) {
                var r = e.split(":");
                return r = r[r.length - 1]
            }
            var h = !1;

            function b(e) {
                return ret = ("00" + e.toString(16)).slice(-2).toUpperCase(), ret
            }
            return {
                connect: async function () {
                    var c = !1,
                        a = new Date;
                    console.log("mbBLE connect");
                    var u = {
                        cmdQueue: [],
                        uartCallBack: null,
                        sending: !1,
                        mbCmdReturnValue: [],
                        conn: !1
                    };
                    console.log("prev mbBLE:", l);
                    var l = await async function (n, t) {
                        var c = [];
                        return c.push({
                            serviceUUID: e,
                            dataUUID: o,
                            callback: t
                        }), c.push({
                            serviceUUID: e,
                            dataUUID: i
                        }), await async function (e) {
                            for (var n = [], t = 0; t < e.length; t++) n.push(e[t].serviceUUID);
                            try {
                                var o = await r.bluetooth.requestDevice({
                                    filters: [{
                                        namePrefix: "BBC micro:bit"
                                    }],
                                    optionalServices: n
                                });
                                if (o.gatt.connected) return console.log("Already connected"), !1;
                                var c = await async function (e) {
                                    return e.gatt.connect()
                                }(o);
                                console.log("Get micro:bit server : ", c);
                                var a = [];
                                for (t = 0; t < e.length; t++) {
                                    var i = await async function (r) {
                                        return r.getPrimaryService(e[t].serviceUUID)
                                    }(c), s = await async function (r) {
                                        return r.getCharacteristic(e[t].dataUUID)
                                    }(i);
                                    await async function (r) {
                                        e[t].callback && (r.startNotifications(), r.addEventListener("characteristicvaluechanged", e[t].callback))
                                    }(s), a.push(s)
                                }
                                return console.log("OK: ", o, a), {
                                    device: o,
                                    characteristics: a
                                }
                            } catch (e) {
                                console.error(e)
                            }
                        }(c)
                    }(0, (async function (e) {
                        var r = [];
                        if (this.value && this.value.byteLength) {
                            for (var n = 0; n < this.value.byteLength; n++) r[n] = this.value.getUint8(n);
                            var o = String.fromCharCode.apply(null, r);
                            t, u.mbCmdReturnValue.push(o), o.startsWith("END") && (clearTimeout(u.timoutTimer), u.sending = !1, u.uartCallBack(u.mbCmdReturnValue), u.mbCmdReturnValue = [], u.cmdQueue.length > 0 && p.processNextQueue())
                        }
                    })), d = null != l;
                    if (!d) {
                        const e = ["接続に失敗しました。", "Web Bluetooth APIに対応していないか、Bluetoothデバイスへのアクセスが許可されていない可能性があります。", " https://caniuse.com/#feat=web-bluetooth ", "デスクトップ環境のChrome/Chromiumの場合、試験的なWebプラットフォーム機能を有効化してください。", " chrome://flags/#enable-experimental-web-platform-features"].join("");
                        return console.error(e), alert(e), {
                            connected: d,
                            disconnect: () => Promise.reject(),
                            requestI2CAccess: () => Promise.reject(),
                            requestGPIOAccess: () => Promise.reject(),
                            readSensor: () => Promise.reject(),
                            printLED: () => Promise.reject(),
                            showIconLED: () => Promise.reject()
                        }
                    }
                    console.log("connected MicroBit mbBLE:", l);
                    var m = l.device,
                        f = (l.characteristics[0], l.characteristics[1]),
                        p = function (e, r, n) {
                            async function t(e) {
                                return new Promise((async function (r) {
                                    await o(e, r)
                                }))
                            }
                            async function o(e, n) {
                                var t = 500;
                                "L" == e.charAt(0) && (t = 2e4);
                                var o, a = (o = e + "\n", new Uint8Array([].map.call(o, (function (e) {
                                    return e.charCodeAt(0)
                                }))).buffer);
                                r.cmdQueue.push({
                                    blmsg: a,
                                    cbFunc: n,
                                    timeOutMsec: t
                                }), 1 != r.cmdQueue.length || r.sending || await c()
                            }
                            async function c() {
                                if (!r.conn) throw console.log("uartCallBackObj:", r), Error("Bluetooth is not connected.."); {
                                    const e = r.cmdQueue.shift();
                                    r.mbCmdReturnValue = [], r.uartCallBack = e.cbFunc, r.sending = !0, r.timoutTimer = setTimeout(a, e.timeOutMsec);
                                    try {
                                        await n.writeValue(e.blmsg)
                                    } catch (e) {
                                        console.error("[[[ERROR]]] on calling mbBleUartRx.writeValue : ", e), r.sending = !1, r.uartCallBack(null), r.mbCmdReturnValue = [], r.cmdQueue.length > 0 && c()
                                    }
                                }
                            }

                            function a() {
                                console.log("called checkCmdCompleted", r.sending), 1 == r.sending && (console.error("[[[ERROR]]] No micro:bit response."), r.sending = !1, r.uartCallBack(null), r.mbCmdReturnValue = [], r.cmdQueue = [])
                            }
                            return {
                                sendCmd2MicroBit: t,
                                processNextQueue: c
                            }
                        }(0, u, f);
                    if (m.addEventListener("gattserverdisconnected", (async function e() {
                            m.removeEventListener("gattserverdisconnected", e), d = !1, c && (delete r.requestI2CAccess, delete r.requestGPIOAccess, c = !1);
                            "diconnectFromWebApps" != n[m.id] && (n[m.id] = "diconnectFromDevice");
                            console.log("DISCONNECTED", a, "  by WebApps?:", n[m.id]), u.conn = d, u.sending = !1, console.log("mbBLE:", l);
                            var t = l.characteristics;
                            console.log("charas:", t);
                            for (var o = 0; o < t.length; o++);
                            console.log("mbBleDevice.gatt:", m.gatt), console.log("DISCONNECTED", a)
                        })), n[m.id] && "diconnectFromDevice" == n[m.id]) throw n[m.id] = "diconnectFromWebApps", await m.gatt.disconnect(), alert("残念ながら、うまくNotificationが出ないので一度切断します・・・・・\nもう一度繋ぐとうまく使えると思います\nそれでも失敗する時は chrome://bluetooth-internals/#devices でデバイスをForgetしてみてください。"), Error("Please re connect  because of Chrome's issue....");
                    n[m.id] = "yes", u.conn = d, console.log("uartCallBackObj:", u);
                    var w = function (e) {
                            async function r() {
                                var r = new Map;
                                return r.set(1, function (e) {
                                    async function r(r) {
                                        var n = await async function (e, r) {
                                            async function n(n) {
                                                var t = "R" + b(r) + b(2) + b(n) + b(1),
                                                    o = await e.sendCmd2MicroBit(t);
                                                if (null != o) {
                                                    if (o[0].startsWith("END:R")) {
                                                        var c = parseInt(o[0].substring(5), 16);
                                                        return c
                                                    }
                                                    throw Error("Read failed..")
                                                }
                                                console.error("mbBLE com error...")
                                            }
                                            async function t(n, t) {
                                                var o = "W" + b(r) + b(2) + b(n) + b(t),
                                                    c = await e.sendCmd2MicroBit(o);
                                                null != c || console.error("mbBLE com error...")
                                            }
                                            async function o(n) {
                                                var t = "R" + b(r) + b(2) + b(n) + b(2),
                                                    o = await e.sendCmd2MicroBit(t);
                                                if (null != o) {
                                                    if (o[0].startsWith("END:R")) {
                                                        var c = parseInt(o[0].substr(7, 2) + o[0].substr(5, 2), 16);
                                                        return c
                                                    }
                                                    throw Error("Read failed..")
                                                }
                                                console.error("mbBLE com error...")
                                            }
                                            async function c(n, t) {
                                                var o = "W" + b(r) + b(3) + b(n) + b(255 & t) + b(t >>> 8);
                                                null != await e.sendCmd2MicroBit(o) || console.error("mbBLE com error...")
                                            }
                                            async function a() {
                                                return (await i(1))[0]
                                            }
                                            async function i(n) {
                                                if (n > 32) throw Error("Read length overflow > 32 bytes.");
                                                var t = "r" + b(r) + b(2) + b(0) + b(n),
                                                    o = await e.sendCmd2MicroBit(t);
                                                if (null != o) {
                                                    if (o[o.length - 1].startsWith("ENDr")) {
                                                        for (var c = [], a = 0; a < o.length; a++) {
                                                            var i = o[a];
                                                            i = i.substring(i.indexOf("r") + 1);
                                                            for (var s = 0; s < i.length; s += 2) {
                                                                var u = parseInt(i.substring(s, s + 2), 16);
                                                                c.push(u)
                                                            }
                                                        }
                                                        return c
                                                    }
                                                    throw Error("Read failed..")
                                                }
                                                console.error("mbBLE com error...")
                                            }
                                            async function s(n) {
                                                var t = "W" + b(r) + b(1);
                                                (t += b(n)).length > 1 && null == await e.sendCmd2MicroBit(t) && console.error("mbBLE com error...")
                                            }
                                            async function u(n) {
                                                for (var t = "W" + b(r) + b(n.length), o = 0; o < n.length; o++)
                                                    if ((t += b(n[o])).length > 18) {
                                                        if (null == await e.sendCmd2MicroBit(t)) return void console.error("mbBLE com error...");
                                                        t = "C"
                                                    } t.length > 1 && null == await e.sendCmd2MicroBit(t) && console.error("mbBLE com error...")
                                            }
                                            return console.log("called open -> getSlaveDevice"), {
                                                read8: n,
                                                write8: t,
                                                read16: o,
                                                write16: c,
                                                readBytes: i,
                                                readByte: a,
                                                writeBytes: u,
                                                writeByte: s
                                            }
                                        }(e, r);
                                        return console.log("slaveDevice:", n, "  addr:", r), n
                                    }
                                    return {
                                        open: r
                                    }
                                }(e)), {
                                    ports: r,
                                    unexportAll: async function () {}
                                }
                            }
                            return r
                        }(p),
                        y = function (e) {
                            async function r() {
                                for (var r = new Map, n = 0; n < s.length; n++) r.set(n, g(e, n));
                                return {
                                    ports: r,
                                    unexportAll: async function () {}
                                }
                            }
                            return r
                        }(p);
                    return r.requestI2CAccess || (c = !0, console.log("set navigator.requestI2CAccess"), r.requestI2CAccess = w, console.log("set navigator.requestGPIOAccess"), r.requestGPIOAccess = y), {
                        get connected() {
                            return d
                        },
                        disconnect: async function () {
                            if (console.log("mbBLE:", l), d = !1, u.conn = d, m && m.gatt.connected) {
                                for (var e = l.characteristics, r = 0; r < e.length; r++) try {
                                    console.log("notify:", e[r].properties.notify), await e[r].stopNotifications()
                                } catch (e) {
                                    console.log("Fail..")
                                }
                                n[m.id] = "diconnectFromWebApps", await m.gatt.disconnect(), console.log("charas:", e)
                            }
                        },
                        requestI2CAccess: w,
                        requestGPIOAccess: y,
                        readSensor: async function () {
                            return await async function (e) {
                                var r = await e.sendCmd2MicroBit("S");
                                if (null == r) return void console.error("mbBLE com error...");
                                t;
                                var n = v(r[0]).split(","),
                                    o = v(r[1]).split(","),
                                    c = v(r[2]).split(","),
                                    a = Number(v(r[3]));
                                return h = !0, {
                                    acceleration: {
                                        x: Number(n[0]),
                                        y: Number(n[1]),
                                        z: Number(n[2])
                                    },
                                    magneticField: {
                                        x: Number(o[0]),
                                        y: Number(o[1]),
                                        z: Number(o[2])
                                    },
                                    temperature: Number(c[0]),
                                    brightness: Number(c[1]),
                                    button: a
                                }
                            }(p)
                        },
                        printLED: async function (e) {
                            return await async function (e, r) {
                                r = r.substring(0, 18), t;
                                var n = await e.sendCmd2MicroBit("L" + r);
                                if (null == n) return void console.error("mbBLE com error...");
                                t;
                                return n
                            }(p, e)
                        },
                        showIconLED: async function (e) {
                            return await async function (e, r) {
                                (isNaN(r) || r < 0 || r > 39) && (r = 0);
                                t;
                                var n = await e.sendCmd2MicroBit("l" + r);
                                if (null == n) return void console.error("mbBLE com error...");
                                t;
                                return n
                            }(p, e)
                        }
                    }
                }
            }
        }();

    function c(e, r) {
        return ("0000000000" + e).slice(-r)
    }

    function a(e) {
        return new Promise((function (r) {
            setTimeout(r, e)
        }))
    }
    e.microBitBleFactory = o, e.sleep = a
}(window);
//# sourceMappingURL=/sm/5555d6a3a0316b60340169a1676942db9c72e2f7f0ed9b34608e38069ad14474.map