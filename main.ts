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
input.onButtonPressed(Button.B, function () {
    if (Status == 1) {
        SettingNumber += 1
        if (SettingNumber > 20) {
            SettingNumber = 0
        }
        basic.showNumber(SettingNumber)
    }
})
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
}
