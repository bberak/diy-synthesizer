const { synthesizer, loop, compose, map, scale, sum, split, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g, saw, pulse, triangle, square, perlin, sine } = require("node-sfx/waves");
const { lowPass, movingAverage } = require("node-sfx/filters");
const { log } = require("node-sfx/utils");
const sampleRate = 16000;

const remap = (n, start1, stop1, start2, stop2) => {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

const sawInverse = (freq) => saw(freq, true);

const triangle25 = (freq) => triangle(freq, 0.25);

const triangle75 = (freq) => triangle(freq, 0.75);

const pulse25 = (freq) => square(freq, 0.25); 

const pulse75 = (freq) => square(freq, 0.75); 

const envelope = () => {
	let keyDown = false;
	let start = null;
	let release = null;

	return (onOrOff, time, { attackDuration, decayDuration, releaseDuration, peak, sustain }) => {
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
				return remap(duration, 0, attackDuration, 0, peak);
			} else if (duration < (attackDuration + decayDuration)) {
				// decaying
				return remap(duration - attackDuration, 0, decayDuration, peak, sustain);
			} else {
				// sustaining
				return sustain;
			}
		}

		if (release) {
			const duration = time - release;

			if (duration < releaseDuration) {
				// releasing
				return remap(duration, 0, releaseDuration, sustain, 0);
			}
		}

		return 0;
	}
}

let lfoFrequency = 1;
let cutOffFrequency = 440 * 2 * 2 * 2 * 2;
let octave = 4;
let volume = 0.15
let cap = limit(-0.99, 0.99);
let keys = [false, false, false, false, false, false, false]
let volumeEnvelopes = [envelope(), envelope(), envelope(), envelope(), envelope(), envelope(), envelope()]
let wavePresets = [
	freq => time =>  pulse75(log("freq")( Math.abs(freq * sine(lfoFrequency)(time)) ))(time),
	sine,
	saw,
	sawInverse,
	triangle,
	triangle25,
	triangle75,
	square,
	pulse25,
	pulse75,
	freq => time => sine(freq)(time) + saw(freq)(time),
	freq => time => sine(freq)(time) + triangle(freq)(time),
	freq => time => sine(freq)(time) + triangle25(freq)(time),
	freq => time => sine(freq)(time) + triang75(freq)(time),
	freq => time => sine(freq)(time) + square(freq)(time),
	freq => time => sine(freq)(time) + pulse25(freq)(time),
	freq => time => sine(freq)(time) + pulse75(freq)(time),
	freq => time => sine(freq)(time) * saw(freq)(time),
	freq => time => sine(freq)(time) * triangle(freq)(time),
	freq => time => sine(freq)(time) * triangle25(freq)(time),
	freq => time => sine(freq)(time) * triang75(freq)(time),
	freq => time => sine(freq)(time) * square(freq)(time),
	freq => time => sine(freq)(time) * pulse25(freq)(time),
	freq => time => sine(freq)(time) * pulse75(freq)(time)
];
let wave = wavePresets[0];
let adsrPresets = [
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 }
]
let adsr = adsrPresets[0];

synthesizer((time) => {
 	const base = (
		a(octave, wave)(time) * volumeEnvelopes[0](keys[0], time, adsr) +
		b(octave, wave)(time) * volumeEnvelopes[1](keys[1], time, adsr) +
		c(octave, wave)(time) * volumeEnvelopes[2](keys[2], time, adsr) +
		d(octave, wave)(time) * volumeEnvelopes[3](keys[3], time, adsr) +
		e(octave, wave)(time) * volumeEnvelopes[4](keys[4], time, adsr) +
		f(octave, wave)(time) * volumeEnvelopes[5](keys[5], time, adsr) +
		g(octave, wave)(time) * volumeEnvelopes[6](keys[6], time, adsr)
	);

	return cap(base) * volume;
}).play({
	sampleRate,
	channels: 2,
	byteOrder: "LE",
	bitDepth: 16,
	signed: true,
	float: false,
	interleaved: true,
});

const nextWave = () => {
	console.log("nextWave");

	wave = wavePresets[wavePresets.indexOf(wave) + 1] || wavePresets[0];
};

const previousWave = () => {
	console.log("previousWave");

	wave = wavePresets[wavePresets.indexOf(wave) - 1] || wavePresets[wavePresets.length - 1];
};

const increaseOctave = () => {
	console.log("increaseOctave");

	octave += 0.2;
};

const decreaseOctave = () => {
	console.log("decreaseOctave");

	octave -= 0.2;
};

const increaseCutoff = () => {
	console.log("increaseCutoff");

	cutOffFrequency += 200;
};

const decreaseCutoff = () => {
	console.log("decreaseCutoff");

	cutOffFrequency -= 200;
};

const increaseLFO = () => {
	console.log("increaseLFO");

	lfoFrequency += 0.1;
};

const decreaseLFO = () => {
	console.log("decreaseLFO");

	lfoFrequency -= 0.1;
};

const increaseVolume = () => {
	console.log("increaseVolume");

	volume = limit(0, 1)(volume + 0.05);
};

const decreaseVolume = () => {
	console.log("decreaseVolume");

	volume = limit(0, 1)(volume - 0.05);
};

const nextAdsr = () => {
	console.log("nextAdsr");

	adsr = adsrPresets[adsrPresets.indexOf(adsr) + 1] || adsrPresets[0];
};

const previousAdsr = () => {
	console.log("previousAdsr");

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
	nextWave,
	previousWave,
	increaseLFO,
	decreaseLFO,
	increaseOctave,
	decreaseOctave,
	increaseCutoff,
	decreaseCutoff,
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
