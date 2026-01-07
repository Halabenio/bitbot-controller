enum RadioMessage {
    message1 = 49434,
    CarKeepalive = 29201
}
input.onButtonPressed(Button.A, function () {
    radio.sendString("Test")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "CarKeepalive") {
        if (Connected == -1) {
        	
        } else if (Connected == 0) {
            Connected = 1
            music.play(music.stringPlayable("D E G A - - - - ", 500), music.PlaybackMode.InBackground)
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (Connected == -1) {
        Connected = 0
    } else if (Connected == 0) {
        Connected = -1
    }
})
let Connected = 0
Connected = -1
let Channel = 0
basic.showNumber(Channel)
radio.setGroup(40)
music.play(music.stringPlayable("C E G - - - - - ", 500), music.PlaybackMode.InBackground)
loops.everyInterval(10, function () {
    if (Connected == -1) {
    	
    } else if (Connected == 0) {
        if (Channel < 9) {
            Channel += 1
        } else {
            Channel = 0
        }
        radio.setGroup(40 + Channel)
        basic.showNumber(Channel)
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
        basic.showNumber(Channel)
    } else if (Connected == 1) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
        radio.sendString("Test")
    }
})
