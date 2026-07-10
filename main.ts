enum RadioMessage {
    message1 = 49434,
    CarKeepalive = 29201,
    ControllerKeepalive = 30085
}
input.onButtonPressed(Button.A, function () {
    if (Status == 1) {
        SettingNumber += -1
        if (SettingNumber < 0) {
            SettingNumber = 20
        }
        basic.showNumber(SettingNumber)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (Status == 0) {
        Status = 1
        SettingNumber = parseFloat(flashstorage.getOrDefault("Gateway", "0"))
        basic.showNumber(SettingNumber)
    } else if (Status == 1) {
        Gateway = SettingNumber
        flashstorage.put("Gateway", convertToText(SettingNumber))
        radio.setGroup(Gateway * 10)
        serial.writeNumber(Gateway * 10)
        Status = 2
        bitbot.setLedColor(0x0000FF)
        radio.sendValue("ContWait", 0)
    } else if (Status == 2) {
        Status = 1
        SettingNumber = parseFloat(flashstorage.getOrDefault("Gateway", "0"))
        basic.showNumber(SettingNumber)
        bitbot.setLedColor(0xFF8000)
    } else if (Status == 3) {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (Status == 1) {
        SettingNumber += 1
        if (SettingNumber > 20) {
            SettingNumber = 0
        }
        basic.showNumber(SettingNumber)
    }
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
    if (name == "ContDisp") {
        basic.showNumber(value)
        Status = 3
        radio.setGroup(Gateway * 10 + value)
        serial.writeNumber(Gateway * 10 + value)
        Address = Gateway * 10 + value
        radio.sendValue("IsCar", 0)
        NoCar = true
    } else if (name == "NoCars") {
        Status = 4
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    } else if (name == "CarHere") {
        NoCar = false
        Status = 5
        basic.showLeds(`
            . . . . .
            . # # # .
            # # # # #
            . # . # .
            . . . . .
            `)
    } else if (false) {
    	
    } else if (false) {
    	
    }
})
let B = ""
let A = ""
let NoCar = false
let Address = 0
let SettingNumber = 0
let Gateway = 0
let Status = 0
Status = 0
// Unset
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
if (flashstorage.getOrDefault("Gateway", "NotSet") != "NotSet") {
    Status = 2
    Gateway = parseFloat(flashstorage.getOrDefault("Gateway", "0"))
    radio.setGroup(Gateway * 10)
    radio.sendValue("ContWait", 0)
}
loops.everyInterval(10000, function () {
    if (NoCar) {
        radio.setGroup(Gateway * 10)
        radio.sendValue("NoCar", Address)
    }
})
loops.everyInterval(500, function () {
	
})
basic.forever(function () {
    if (Status == 5) {
        if (input.buttonIsPressed(Button.A)) {
            A = "100"
        } else {
            A = "000"
        }
        if (input.buttonIsPressed(Button.B)) {
            B = "100"
        } else {
            B = "000"
        }
        radio.sendValue("DrPacket", parseFloat("5" + A + B))
    }
})
loops.everyInterval(5000, function () {
    if (Status == 2 || Status == 4) {
        radio.sendValue("ContWait", 0)
    }
})
