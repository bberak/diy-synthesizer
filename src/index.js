const synth = require("./synthesizer");
const button = require("./pup-button");
const knob = require("./rotary-encoder");
const { exec } = require('child_process');

exec("sudo amixer set PCM 100%");
exec(`say "turning on"`);

let lfoMode = false;
let filterMode = false;
let volumeMode = false;
let buttonCount = 0;

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
	onButtonDown: shutdownListener(() => { lfoMode = !lfoMode; if (lfoMode) exec(`say "LFO"`); else exec(`say "waveform"`); }),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => lfoMode ? synth.increaseLFO() : synth.nextWave(),
	onCounterClockwiseTurn: () => lfoMode ? synth.decreaseLFO() : synth.previousWave(),
});

const middleKnob = knob({
	buttonPin: 8,
	channelAPin: 4,
	channelBPin: 2,
	onButtonDown: shutdownListener(() => { filterMode = !filterMode; if (filterMode) exec(`say "filter"`); else exec(`say "octave"`); }),
	onButtonUp: () => buttonCount--,
	onClockwiseTurn: () => filterMode ? synth.increaseCutoff() : synth.increaseOctave(),
	onCounterClockwiseTurn: () => filterMode ? synth.decreaseCutoff() : synth.decreaseOctave(),
});

const rightKnob = knob({
	buttonPin: 23,
	channelAPin: 24,
	channelBPin: 27,
	onButtonDown: shutdownListener(() => { volumeMode = !volumeMode; if (volumeMode) exec(`say "volume"`); else exec(`say "ADSR"`); }),
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
