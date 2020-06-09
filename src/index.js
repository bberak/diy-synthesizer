const synth = require("./synthesizer");
const button = require("./pup-button");
const knob = require("./rotary-encoder");
const stateMachine = require("./state-machine");
const { exec } = require('child_process');

exec("sudo amixer set PCM 100%");
exec(`say "turning on"`);

let buttonCount = 0;

const leftKnobStates = stateMachine(["waveform", "lfo"], next => exec(`say "${next}"`));
const middleKnobStates = stateMachine(["octave", "filter"], next => exec(`say "${next}"`));
const rightKnobStates = stateMachine("volume", "adsr", next => exec(`say "${next}"`));

const shutdownListener = (cb) => () => {
	if (buttonCount < 0)
		buttonCount = 0;

	if (buttonCount > 3)
		buttonCount = 3;

	buttonCount++;

	if (buttonCount >= 3) {
		exec(`say "turning off"`);
		process.exit();
		//exec("sudo shutdown -h now");
	}
	else if (cb)
		cb();
};

const leftKnob = knob({
	buttonPin: 12,
	channelAPin: 11,
	channelBPin: 10,
	onButtonDown: shutdownListener(leftKnobStates.next),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => leftKnobStates.current() == "lfo" ? synth.increaseLFO() : synth.nextWave(),
	onCounterClockwiseTurn: () => leftKnobStates.current() == "lfo" ? synth.decreaseLFO() : synth.previousWave(),
});

const middleKnob = knob({
	buttonPin: 8,
	channelAPin: 4,
	channelBPin: 2,
	onButtonDown: shutdownListener(middleKnobStates.next),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => middleKnobStates.current() == "filter" ? synth.increaseCutoff() : synth.increaseOctave(),
	onCounterClockwiseTurn: () => middleKnobStates.current() == "filter" ? synth.decreaseCutoff() : synth.decreaseOctave(),
});

const rightKnob = knob({
	buttonPin: 23,
	channelAPin: 24,
	channelBPin: 27,
	onButtonDown: shutdownListener(rightKnobStates.next),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => rightKnobStates.current() == "volume" ? synth.increaseVolume() : synth.nextAdsr(),
	onCounterClockwiseTurn: () => rightKnobStates.current() == "volume" ? synth.decreaseVolume() : synth.previousAdsr(),
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
