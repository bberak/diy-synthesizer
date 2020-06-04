const { synthesizer, loop, compose, map, scale, sum, split, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g, saw, pulse, triangle, square, perlin, sine } = require("node-sfx/waves");
const { lowPass, movingAverage } = require("node-sfx/filters");
const { log } = require("node-sfx/utils");
const sampleRate = 16000;

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
	{ wave: sine, effect: time => 1 },
	{ wave: saw, effect: time => 1 },
	{ name: "pulse", wave: pulse, effect: time => 1 },
	{ wave: triangle, effect: time => 1 },
	{ wave: square, effect: time => 1 },
	{ wave: sine, effect: time => saw(2)(time) + pulse(0.1)(time) },
	{ wave: sine, effect: time => saw(2)(time) + pulse(0.2)(time) + square(1)(time) },
	{ wave: sine, effect: time => saw(2)(time) + pulse(0.2)(time) + square(5)(time) },
	{ wave: sine, effect: time => compose(triangle(4), lowPass("lp1", sampleRate)(220))(time) },
	{ wave: sine, effect: time => sine(2)(time) * 4 },
	{ wave: sine, effect: time => compose(sine(8), lowPass("lp2", sampleRate)(120))(time) },
	{ wave: sine, effect: time => compose(sine(2), lowPass("lp2", sampleRate)(120))(time) },
	{ wave: sine, effect: time => perlin(1)(time) },
];
let sfx = sfxPresets[0];
let cap = limit(-0.99, 0.99);
let filter = lowPass("f1", sampleRate)(880, 0.35);
let volume = 0.15
let adsrPresets = [
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 }
]
let adsr = adsrPresets[0];

synthesizer((time) => {
	const { wave, effect } = sfx;
 	const base = (
		envelopes[0](a(octave, wave)(time), keys[0], time, adsr) +
		envelopes[1](b(octave, wave)(time), keys[1], time, adsr) +
		envelopes[2](c(octave, wave)(time), keys[2], time, adsr) +
		envelopes[3](d(octave, wave)(time), keys[3], time, adsr) +
		envelopes[4](e(octave, wave)(time), keys[4], time, adsr) +
		envelopes[5](f(octave, wave)(time), keys[5], time, adsr) +
		envelopes[6](g(octave, wave)(time), keys[6], time, adsr)
	);

 	const result = base ? base + effect(time) * mix : 0;

	return cap(filter(result)) * volume;
}).play({
	sampleRate,
	channels: 2,
	byteOrder: "LE",
	bitDepth: 16,
	signed: true,
	float: false,
	interleaved: true,
});

const nextEffect = () => {
	sfx = sfxPresets[sfxPresets.indexOf(sfx) + 1] || sfxPresets[0];

	if (sfx.name)
		console.log(sfx.name);
};

const previousEffect = () => {
	sfx = sfxPresets[sfxPresets.indexOf(sfx) - 1] || sfxPresets[sfxPresets.length - 1];

	if (sfx.name)
		console.log(sfx.name);
};

const randomEffect = () => {
	console.log("random effect");
};

const increaseOctave = () => {
	octave += 0.2;
};

const decreaseOctave = () => {
	octave -= 0.2;
};

const increaseMix = () => {
	mix += 0.02;
};

const decreaseMix = () => {
	mix += 0.02;
};

const increaseVolume = () => {
	volume = limit(0, 1)(volume + 0.05);
};

const decreaseVolume = () => {
	volume = limit(0, 1)(volume - 0.05);
};

const nextAdsr = () => {
	adsr = adsrPresets[adsrPresets.indexOf(adsr) + 1] || adsrPresets[0];
};

const previousAdsr = () => {
	adsr = adsrPresets[adsrPresets.indexOf(adsr) - 1] || adsrPresets[adsrPresets.length - 1];
};

const aDown = () => {
	keys[0] = true;
}

const aUp = () => {
	keys[0] = false;
}

const bDown = () => {
	keys[1] = true;
}

const bUp = () => {
	keys[1] = false;
}

const cDown = () => {
	keys[2] = true
}

const cUp = () => {
	keys[2] = false;
}

const dDown = () => {
	keys[3] = true;
}

const dUp = () => {
	keys[3] = false;
}

const eDown = () => {
	keys[4] = true;
}

const eUp = () => {
	keys[4] = false;
}

const fDown = () => {
	keys[5] = true;
}

const fUp = () => {
	keys[5] = false;
}

const gDown = () => {
	keys[6] = true;
}

const gUp = () => {
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
