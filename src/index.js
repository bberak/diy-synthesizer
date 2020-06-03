const synth = require("./synthesizer");
const button = require("./pup-button");
const knob = require("./rotary-encoder");

let mixerMode = false;
let volumeMode = false;
let buttonCount = 0;

const buttonHandler = (cb) => () => {
	cb();

	buttonCount++;

	if (buttonCount === 3)
		console.log("I would shut down now.. ", buttonCount)
}

const leftKnob = knob({
	buttonPin: 12,
	channelAPin: 11,
	channelBPin: 10,
	onButtonDown: buttonHandler(synth.randomEffect),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: synth.nextEffect,
	onCounterClockwiseTurn: synth.previousEffect,
});

const middleKnob = knob({
	buttonPin: 8,
	channelAPin: 4,
	channelBPin: 2,
	onButtonDown: buttonHandler(() => mixerMode = !mixerMode),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => mixerMode ? synth.increaseMix() : synth.increaseOctave(),
	onCounterClockwiseTurn: () => mixerMode ? synth.decreaseMix() : synth.decreaseOctave(),
});

const rightKnob = knob({
	buttonPin: 23,
	channelAPin: 24,
	channelBPin: 27,
	onButtonDown: buttonHandler(() => volumeMode = !volumeMode),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => volumeMode ? synth.increaseVolume() : synth.nextAdsr(),
	onCounterClockwiseTurn: () => volumeMode ? synth.decreaseVolume() : synth.previousAdsr(),
});

const aButton = button({
	pin: 21,
	onButtonDown: synth.aDown,
	onButtonUp: synth.aUp,
});

const bButton = button({
	pin: 22,
	onButtonDown: synth.bDown,
	onButtonUp: synth.bUp,
});

const cButton = button({
	pin: 3,
	onButtonDown: synth.cDown,
	onButtonUp: synth.cUp,
});

const dButton = button({
	pin: 25,
	onButtonDown: synth.dDown,
	onButtonUp: synth.dUp,
});

const eButton = button({
	pin: 5,
	onButtonDown: synth.eDown,
	onButtonUp: synth.eUp,
});

const fButton = button({
	pin: 26,
	onButtonDown: synth.fDown,
	onButtonUp: synth.fUp,
});

const gButton = button({
	pin: 9,
	onButtonDown: synth.gDown,
	onButtonUp: synth.gUp,
});
