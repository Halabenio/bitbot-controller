enum RadioMessage {
    message1 = 49434,
    CarKeepalive = 29201,
    ControllerKeepalive = 30085
}
radio.onReceivedMessage(RadioMessage.CarKeepalive, function () {
    CarKeepalive = 1
    LastKeepalive = 25
})
radio.onReceivedMessage(RadioMessage.ControllerKeepalive, function () {
    ControllerKeepalive = 1
})
input.onGesture(Gesture.Shake, function () {
    if (Connected == -1) {
        Connected = 0
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Connected = -1
})
let LastKeepalive = 0
let ControllerKeepalive = 0
let CarKeepalive = 0
let Connected = 0
Connected = -1
CarKeepalive = 0
ControllerKeepalive = 0
let Channel = 0
basic.showNumber(Channel)
radio.setGroup(40)
music.play(music.stringPlayable("C E G - - - - - ", 500), music.PlaybackMode.InBackground)
basic.forever(function () {
    if (Connected == -1) {
        basic.showLeds(`
            # . # . #
            . . . . .
            # . . . #
            . . . . .
            # . # . #
            `)
    } else if (Connected == 0) {
        if (Channel < 9) {
            Channel += 1
        } else {
            Channel = 0
        }
        radio.setGroup(40 + Channel)
        basic.showNumber(Channel)
        CarKeepalive = 0
        ControllerKeepalive = 0
        basic.pause(500)
        if (CarKeepalive == 1 && ControllerKeepalive == 0) {
            Connected = 1
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
            music.play(music.stringPlayable("- D E C A - - - ", 500), music.PlaybackMode.UntilDone)
        }
    } else if (Connected == 1) {
        radio.sendMessage(RadioMessage.ControllerKeepalive)
        if (input.buttonIsPressed(Button.B)) {
            radio.sendString("Left")
        } else {
            radio.sendString("StopLeft")
        }
        if (input.buttonIsPressed(Button.A)) {
            radio.sendString("Right")
        } else {
            radio.sendString("StopRight")
        }
    } else if (Connected == 2) {
    	
    }
})
