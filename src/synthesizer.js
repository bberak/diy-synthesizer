const { synthesizer, loop, compose, map, scale, sum, split, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g, saw, pulse, triangle, square, perlin, sine } = require("node-sfx/waves");
const { lowPass, movingAverage } = require("node-sfx/filters");
const { log } = require("node-sfx/utils");

const remap = (n, start1, stop1, start2, stop2) => {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

const envelope = () => {
	let keyDown = false;
	let start = null;
	let release = null;

	return (amplitude, onOrOff, time, { attackDuration, decayDuration, releaseDuration, peak, sustain }) => {
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
let sfxPresets = [
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
let sfx = sfxPresets[0];
let cap = limit(-0.99, 0.99);
let filter = lowPass("f1", 22050)(880, 0.35);
let volume = 0.15
let adsrPresets = [
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 }
]
let adsr = adsrPresets[0];

synthesizer((time) => {
 	const base = (
		envelopes[0](a(octave)(time), keys[0], time, adsr) +
		envelopes[1](b(octave)(time), keys[1], time, adsr) +
		envelopes[2](c(octave)(time), keys[2], time, adsr) +
		envelopes[3](d(octave)(time), keys[3], time, adsr) +
		envelopes[4](e(octave)(time), keys[4], time, adsr) +
		envelopes[5](f(octave)(time), keys[5], time, adsr) +
		envelopes[6](g(octave)(time), keys[6], time, adsr)
	);

 	const result = base ? base + sfx(time) * mix : 0;

	return cap(filter(result)) * volume;
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

	sfx = sfxPresets[sfxPresets.indexOf(sfx) + 1] || sfxPresets[0];
};

const previousEffect = () => {
	console.log("previous effect");

	sfx = sfxPresets[sfxPresets.indexOf(sfx) - 1] || sfxPresets[sfxPresets.length - 1];
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

	volume = limit(0, 1)(volume + 0.05);
};

const decreaseVolume = () => {
	console.log("decrease volume");

	volume = limit(0, 1)(volume - 0.05);
};

const nextAdsr = () => {
	console.log("next adsr");

	adsr = adsrPresets[adsrPresets.indexOf(adsr) + 1] || adsrPresets[0];
};

const previousAdsr = () => {
	console.log("previous adsr");

	adsr = adsrPresets[adsrPresets.indexOf(adsr) - 1] || adsrPresets[adsrPresets.length - 1];
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
