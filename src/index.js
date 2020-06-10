const synth = require("./synthesizer");
const button = require("./pup-button");
const knob = require("./rotary-encoder");
const { stateMachine, aggregate } = require("./state-machine");
const { exec } = require("child_process");

exec(`sudo amixer set PCM 100%`);
exec(`say turning on`);

const leftKnobStates = stateMachine(
	["waveform", "off", "lfo", "off"],
	(state) => state != "off" && exec(`say ${state}`)
);
const middleKnobStates = stateMachine(
	["octave", "off", "filter cutoff", "off", "filter resonance", "off"],
	(state) => state != "off" && exec(`say ${state}`)
);
const rightKnobStates = stateMachine(
	["volume", "off", "adsr", "off"],
	(state) => state != "off" && exec(`say ${state}`)
);
const aggregateStates = aggregate(
	[leftKnobStates, middleKnobStates, rightKnobStates],
	([s1, s2, s3]) => {
		if (s1 == "off" && s2 == "off" && s3 == "off") {
			exec(`say turning off`);
			process.exit();
		}
	}
);

const leftKnob = knob({
	buttonPin: 12,
	channelAPin: 11,
	channelBPin: 10,
	onButtonDown: leftKnobStates.next,
	onButtonUp: leftKnobStates.next,
	onClockwiseTurn: () =>
		leftKnobStates.current() == "lfo"
			? synth.increaseLFO()
			: synth.nextWave(),
	onCounterClockwiseTurn: () =>
		leftKnobStates.current() == "lfo"
			? synth.decreaseLFO()
			: synth.previousWave(),
});

const middleKnob = knob({
	buttonPin: 8,
	channelAPin: 4,
	channelBPin: 2,
	onButtonDown: middleKnobStates.next,
	onButtonUp: middleKnobStates.next,
	onClockwiseTurn: () =>
		middleKnobStates.current() == "filter cutoff"
			? synth.increaseCutoff()
			: middleKnobStates.current() == "filter resonance"
			? synth.increaseResonance()
			: synth.increaseOctave(),
	onCounterClockwiseTurn: () =>
		middleKnobStates.current() == "filter cutoff"
			? synth.decreaseCutoff()
			: middleKnobStates.current() == "filter resonance"
			? synth.decreaseResonance()
			: synth.decreaseOctave(),
});

const rightKnob = knob({
	buttonPin: 23,
	channelAPin: 24,
	channelBPin: 27,
	onButtonDown: rightKnobStates.next,
	onButtonUp: rightKnobStates.next,
	onClockwiseTurn: () =>
		rightKnobStates.current() == "volume"
			? synth.increaseVolume()
			: synth.nextAdsr(),
	onCounterClockwiseTurn: () =>
		rightKnobStates.current() == "volume"
			? synth.decreaseVolume()
			: synth.previousAdsr(),
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
