const synthesizer = require("./synthesizer");
const button = require("./pup-button");
const knob = require("./rotary-encoder");

const leftKnob = knob({
	buttonPin: 100,
	channelAPin: 101,
	channelBPin: 102,
	onButtonDown: console.log,
	onButtonUp: console.log,
	onClockwiseTurn: console.log,
	onCounterClockwiseTUrn: console.log,
});

const middleKnob = knob({
	buttonPin: 100,
	channelAPin: 101,
	channelBPin: 102,
	onButtonDown: console.log,
	onButtonUp: console.log,
	onClockwiseTurn: console.log,
	onCounterClockwiseTUrn: console.log,
});

const rightKnob = knob({
	buttonPin: 100,
	channelAPin: 101,
	channelBPin: 102,
	onButtonDown: console.log,
	onButtonUp: console.log,
	onClockwiseTurn: console.log,
	onCounterClockwiseTUrn: console.log,
});

const aButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });

const bButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });

const cButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });

const dButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });

const eButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });

const fButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });

const gButton = button({ pin: 99, onButtonDown: console.log, onButtonUp: console.log });