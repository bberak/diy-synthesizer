const { synthesizer, loop, compose, map, scale, sum, split, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g, saw, pulse, triangle, square, perlin, sine } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");
const { log } = require("node-sfx/utils");

const envelope = () => {
	let keyDown = false;
	let start = null;
	let release = null;

	return (amplitude, onOrOff, time, adsrConfig = {}) => {
		if (!keyDown && onOrOff) {
			keyDown = true;
			start = time;
			release = null;
		}

		if (keyDown && !onOrOff) {
			keyDown = false;
			start = null;
			release = time;
		}

		const attackDuration = adsrConfig.attackDuration || 0.1;
		const decayDuration = adsrConfig.decayDuration || 0.1;
		const releaseDuration = adsrConfig.releaseDuration || 0.1;
		const peak = adsrConfig.peak || 0.75;
		const sustain = 0.5;
		
		if (start) {
			const duration = time - start;

			if (duration < attackDuration) {
				// attacking
				return remap(duration, 0, attackDuration, 0, peak) * amplitude;
			} else if (duration < (attackDuration + decayDuration)) {
				// decaying
				return remap(duration - attackDuration, 0, decayDuration, peak, sustain) * amplitude;
			} else {
				// sustaining
				return sustain * amplitude;
			}
		}

		if (release) {
			const duration = time - release;

			if (duration < releaseDuration) {
				// releasing
				return remap(duration, 0, releaseDuration, sustain, 0) * amplitude;
			}
		}

		return 0;
	}
}

let octave = 4;
let mix = 0.5
let keys = [false, false, false, false, false, false, false]
let envelopes = [envelope(), envelope(), envelope(), envelope(), envelope(), envelope(), envelope()]
let effects = [
	(time) => 1,
	(time) => (saw(2)(time) + pulse(0.1)(time)),
	(time) => (saw(2)(time) + pulse(0.2)(time) + square(1)(time)),
	(time) => (saw(2)(time) + pulse(0.2)(time) + square(5)(time)),
	(time) => compose(triangle(4), lowPass("lp1")(220))(time),
	(time) => sine(2)(time) * 4,
	(time) => compose(sine(8), lowPass("lp2")(120))(time),
	(time) => compose(sine(2), lowPass("lp2")(120))(time),
	(time) => perlin(1)(time),
];
let effect = effects[0];
let cap = limit(-0.99, 0.99);
let volume = 0.75

synthesizer((time) => {
 	let base = (
		envelopes[0](a(octave)(time), keys[0], time) +
		envelopes[1](b(octave)(time), keys[1], time) +
		envelopes[2](c(octave)(time), keys[2], time) +
		envelopes[3](d(octave)(time), keys[3], time) +
		envelopes[4](e(octave)(time), keys[4], time) +
		envelopes[5](f(octave)(time), keys[5], time) +
		envelopes[6](g(octave)(time), keys[6], time)
	);

 	let result = base + effect(time) * mix;

	return cap(result) * volume;
}).play({
	channels: 2,
	sampleRate: 22050,
	byteOrder: "LE",
	bitDepth: 16,
	signed: true,
	float: false,
	interleaved: true,
});

const nextEffect = () => {
	console.log("next effect");

	effect = effects[effects.indexOf(effect) + 1] || effects[0];
};

const previousEffect = () => {
	console.log("previous effect");

	effect = effects[effects.indexOf(effect) - 1] || effects[effects.length - 1];
};

const randomEffect = () => {
	console.log("random effect");
};

const increaseOctave = () => {
	console.log("increase octave");

	octave += 0.2;
};

const decreaseOctave = () => {
	console.log("decrease octave");

	octave -= 0.2;
};

const increaseMix = () => {
	console.log("increase mix");

	mix += 0.02;
};

const decreaseMix = () => {
	console.log("decrease mix");

	mix += 0.02;
};

const increaseVolume = () => {
	console.log("increase volume");

	volume = limit(0, 1)(volume + 0.02);
};

const decreaseVolume = () => {
	console.log("decrease volume");

	volume = limit(0, 1)(volume - 0.02);
};

const nextAdsr = () => {
	console.log("next adsr");
};

const previousAdsr = () => {
	console.log("previous adsr");
};

const aDown = () => {
	console.log("a down");

	keys[0] = true;
}

const aUp = () => {
	console.log("a up");

	keys[0] = false;
}

const bDown = () => {
	console.log("b down");

	keys[1] = true;
}

const bUp = () => {
	console.log("b up");

	keys[1] = false;
}

const cDown = () => {
	console.log("c down");

	keys[2] = true
}

const cUp = () => {
	console.log("c up");

	keys[2] = false;
}

const dDown = () => {
	console.log("d down");

	keys[3] = true;
}

const dUp = () => {
	console.log("d up");

	keys[3] = false;
}

const eDown = () => {
	console.log("e down");

	keys[4] = true;
}

const eUp = () => {
	console.log("e up");

	keys[4] = false;
}

const fDown = () => {
	console.log("f down");

	keys[5] = true;
}

const fUp = () => {
	console.log("f up");

	keys[5] = false;
}

const gDown = () => {
	console.log("g down");

	keys[6] = true;
}

const gUp = () => {
	console.log("g up");

	keys[6] = false;
}

module.exports = {
	nextEffect,
	previousEffect,
	randomEffect,
	increaseOctave,
	decreaseOctave,
	increaseMix,
	decreaseMix,
	increaseVolume,
	decreaseVolume,
	nextAdsr,
	previousAdsr,
	aDown,
	aUp,
	bDown,
	bUp,
	cDown,
	cUp,
	dDown,
	dUp,
	eDown,
	eUp,
	fDown,
	fUp,
	gDown,
	gUp
}
