input.onButtonPressed(Button.B, function () {
    pins.analogWritePin(AnalogPin.P2, 1023)
    reading = pins.analogReadPin(AnalogPin.P1)
    pins.analogWritePin(AnalogPin.P2, 0)
    calibrate = reading - 5
})
let reading = 0
let calibrate = 0
led.setBrightness(64)
OLED12864_I2C.init(60)
calibrate = 0
basic.forever(function () {
    pins.analogWritePin(AnalogPin.P2, 1023)
    reading = pins.analogReadPin(AnalogPin.P1) - calibrate
    pins.analogWritePin(AnalogPin.P2, 0)
    if (reading < 0) {
        reading = 0
    }
    led.plotBarGraph(
    reading,
    1023 - calibrate
    )
    OLED12864_I2C.showString(
    0,
    0,
    "Value: " + reading,
    1
    )
    OLED12864_I2C.showString(
    0,
    2,
    "" + convertToText(Math.ceil(reading / (1023 - calibrate) * 100)) + "%",
    1
    )
})
