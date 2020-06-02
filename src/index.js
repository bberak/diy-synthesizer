const synthesizer = require("./synthesizer");
const button = require("./pup-button");
const knob = require("./rotary-encoder");

let mixerMode = false;
let volumeMode = false;

const leftKnob = knob({
	buttonPin: 12,
	channelAPin: 11,
	channelBPin: 10,
	onButtonDown: synthesizer.randomEffect,
	//onButtonUp: console.log,
	onClockwiseTurn: synthesizer.nextEffect,
	onCounterClockwiseTurn: synthesizer.previousEffect,
});

const middleKnob = knob({
	buttonPin: 8,
	channelAPin: 4,
	channelBPin: 2,
	onButtonDown: () => mixerMode = !mixerMode,
	//onButtonUp: console.log,
	onClockwiseTurn: () => mixerMode ? synthesizer.increaseMix() : synthesizer.increaseOctave(),
	onCounterClockwiseTurn: () => mixerMode ? synthesizer.decreaseMix() : synthesizer.decreaseOctave(),
});

const rightKnob = knob({
	buttonPin: 23,
	channelAPin: 24,
	channelBPin: 27,
	onButtonDown: () => volumeMode = !volumeMode,
	//onButtonUp: console.log,
	onClockwiseTurn: () => volumeMode ? synthesizer.increaseVolume() : synthesizer.nextAdsr(),
	onCounterClockwiseTurn: () => volumeMode ? synthesizer.decreaseVolume() : synthesizer.previousAdsr(),
});

const aButton = button({
	pin: 21,
	onButtonDown: synthesizer.aDown,
	onButtonUp: synthesizer.aUp,
});

const bButton = button({
	pin: 22,
	onButtonDown: synthesizer.bDown,
	onButtonUp: synthesizer.bUp,
});

const cButton = button({
	pin: 3,
	onButtonDown: synthesizer.cDown,
	onButtonUp: synthesizer.cUp,
});

const dButton = button({
	pin: 25,
	onButtonDown: synthesizer.dDown,
	onButtonUp: synthesizer.dUp,
});

const eButton = button({
	pin: 5,
	onButtonDown: synthesizer.eDown,
	onButtonUp: synthesizer.eUp,
});

const fButton = button({
	pin: 26,
	onButtonDown: synthesizer.fDown,
	onButtonUp: synthesizer.fUp,
});

const gButton = button({
	pin: 9,
	onButtonDown: synthesizer.gDown,
	onButtonUp: synthesizer.gUp,
});
