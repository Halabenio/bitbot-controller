enum RadioMessage {
    message1 = 49434,
    CarKeepalive = 29201,
    ControllerKeepalive = 30085
}
radio.onReceivedMessage(RadioMessage.CarKeepalive, function () {
    if (Connected == 0 && Occupied == 0) {
        LastKeepalive = 200
        Connected = 1
        music.play(music.stringPlayable("D E G A - - - - ", 500), music.PlaybackMode.InBackground)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else if (Connected == 1) {
        LastKeepalive = 200
    }
})
radio.onReceivedMessage(RadioMessage.ControllerKeepalive, function () {
    Occupied = 1
})
function ChangeFrame () {
    ConnectingFrame += 1
    if (ConnectingFrame == 1) {
        basic.showLeds(`
            . . . . .
            # . . . .
            # . . . #
            . . . . #
            . . . . .
            `)
    } else if (ConnectingFrame == 2) {
        basic.showLeds(`
            . # # . .
            . . . . .
            . . . . .
            . . . . .
            . . # # .
            `)
    } else if (ConnectingFrame == 3) {
        basic.showLeds(`
            . . # # .
            . . . . .
            . . . . .
            . . . . .
            . # # . .
            `)
    } else if (ConnectingFrame == 4) {
        basic.showLeds(`
            . # # . .
            . . . . .
            . . . . .
            . . . . .
            . . # # .
            `)
        ConnectingFrame = 0
    }
}
input.onGesture(Gesture.Shake, function () {
    if (Connected == -1) {
        Connected = 0
    } else if (Connected == 0) {
        Connected = -1
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Connected = -1
})
let ConnectingFrame = 0
let LastKeepalive = 0
let Occupied = 0
let Connected = 0
Connected = -1
Occupied = 0
let Channel = 0
basic.showNumber(Channel)
radio.setGroup(40)
music.play(music.stringPlayable("C E G - - - - - ", 500), music.PlaybackMode.InBackground)
loops.everyInterval(50, function () {
    if (Connected == -1) {
    	
    } else if (Connected == 0) {
        if (Channel < 9) {
            Channel += 1
        } else {
            Channel = 0
        }
        Occupied = 0
        radio.setGroup(40 + Channel)
        ChangeFrame()
    } else if (Connected == 1) {
        LastKeepalive += -1
        if (LastKeepalive <= 0) {
            Connected = -1
        }
    }
})
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
    }
})
