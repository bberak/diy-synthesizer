const { synthesizer, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g, saw, triangle, square, pulse, sine } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");
const { remap } = require("node-sfx/utils");
const sampleRate = 16000;

const sawInverse = (freq) => saw(freq, true);

const triangle25 = (freq) => triangle(freq, 0.25);

const triangle75 = (freq) => triangle(freq, 0.75);

const pulse25 = (freq) => pulse(freq, 0.25); 

const pulse75 = (freq) => pulse(freq, 0.75); 

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
let cutOffFrequency = 440 * 2 * 2 * 2;
let resonance = 0.7;
let octave = 4;
let volume = 0.15
let cap = limit(-0.99, 0.99);
let filter = lowPass("lp", sampleRate);
let keys = [false, false, false, false, false, false, false]
let volumeEnvelopes = [envelope(), envelope(), envelope(), envelope(), envelope(), envelope(), envelope()]
let wavePresets = [
	//-- Core waves
	pulse25,
	square,
	pulse75,
	sine,
	saw,
	sawInverse,
	triangle25,
	triangle,
	triangle75,
	//-- Simple additive
	freq => time => sine(freq)(time) + saw(freq)(time),
	freq => time => sine(freq)(time) + triangle(freq)(time),
	freq => time => sine(freq)(time) + triangle25(freq)(time),
	freq => time => sine(freq)(time) + triangle75(freq)(time),
	freq => time => sine(freq)(time) + square(freq)(time),
	freq => time => sine(freq)(time) + pulse25(freq)(time),
	freq => time => sine(freq)(time) + pulse75(freq)(time),
	freq => time => sine(freq)(time) * saw(freq)(time),
	freq => time => sine(freq)(time) * triangle(freq)(time),
	freq => time => sine(freq)(time) * triangle25(freq)(time),
	freq => time => sine(freq)(time) * triangle75(freq)(time),
	freq => time => sine(freq)(time) * square(freq)(time),
	freq => time => sine(freq)(time) * pulse25(freq)(time),
	freq => time => sine(freq)(time) * pulse75(freq)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + square(freq)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse25(freq)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse75(freq)(time),
	//-- Core with harmonics
	freq => time => sine(freq)(time) + sine(freq * 2)(time) * 0.3 + sine(freq * 3)(time) * 0.17 + sine(freq * 4)(time) * 0.11 + sine(freq * 5)(time) * 0.9,
	freq => time => saw(freq)(time) + saw(freq * 2)(time) * 0.3 + saw(freq * 3)(time) * 0.17 + saw(freq * 4)(time) * 0.11 + saw(freq * 5)(time) * 0.9,
	freq => time => sawInverse(freq)(time) + sawInverse(freq * 2)(time) * 0.3 + sawInverse(freq * 3)(time) * 0.17 + sawInverse(freq * 4)(time) * 0.11 + sawInverse(freq * 5)(time) * 0.9,
	freq => time => triangle(freq)(time) + triangle(freq * 2)(time) * 0.3 + triangle(freq * 3)(time) * 0.17 + triangle(freq * 4)(time) * 0.11 + triangle(freq * 5)(time) * 0.9,
	freq => time => triangle25(freq)(time) + triangle25(freq * 2)(time) * 0.3 + triangle25(freq * 3)(time) * 0.17 + triangle25(freq * 4)(time) * 0.11 + triangle25(freq * 5)(time) * 0.9,
	freq => time => triangle75(freq)(time) + triangle75(freq * 2)(time) * 0.3 + triangle75(freq * 3)(time) * 0.17 + triangle75(freq * 4)(time) * 0.11 + triangle75(freq * 5)(time) * 0.9,
	freq => time => square(freq)(time) + square(freq * 2)(time) * 0.3 + square(freq * 3)(time) * 0.17 + square(freq * 4)(time) * 0.11 + square(freq * 5)(time) * 0.9,
	freq => time => pulse25(freq)(time) + pulse25(freq * 2)(time) * 0.3 + pulse25(freq * 3)(time) * 0.17 + pulse25(freq * 4)(time) * 0.11 + pulse25(freq * 5)(time) * 0.9,
	freq => time => pulse75(freq)(time) + pulse75(freq * 2)(time) * 0.3 + pulse75(freq * 3)(time) * 0.17 + pulse75(freq * 4)(time) * 0.11 + pulse75(freq * 5)(time) * 0.9,
	//-- Complex additive
	freq => time => saw(freq)(time) + triangle(freq)(time) + square(freq)(time) + saw(freq + 0.5)(time) + triangle(freq + 0.5)(time) + square(freq + 0.5)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse25(freq)(time) + saw(freq + 0.5)(time) + triangle(freq + 0.5)(time) + pulse25(freq + 0.5)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse75(freq)(time) + saw(freq + 0.5)(time) + triangle(freq + 0.5)(time) + pulse75(freq + 0.5)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + square(freq)(time) + saw(freq + 1)(time) + triangle(freq + 1)(time) + square(freq + 1)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse25(freq)(time) + saw(freq + 1)(time) + triangle(freq + 1)(time) + pulse25(freq + 1)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse75(freq)(time) + saw(freq + 1)(time) + triangle(freq + 1)(time) + pulse75(freq + 1)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + square(freq)(time) + saw(freq + 2)(time) + triangle(freq + 2)(time) + square(freq + 2)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse25(freq)(time) + saw(freq + 2)(time) + triangle(freq + 2)(time) + pulse25(freq + 2)(time),
	freq => time => saw(freq)(time) + triangle(freq)(time) + pulse75(freq)(time) + saw(freq + 2)(time) + triangle(freq + 2)(time) + pulse75(freq + 2)(time),
	//-- LFO driven
	freq => time => triangle25(remap(square(lfoFrequency)(time), -1, 1, freq * 0.25, freq))(time),
	freq => time => triangle25(remap(square(lfoFrequency)(time), -1, 1, freq * 0.25, freq))(time),
	freq => time => triangle25(remap(square(lfoFrequency)(time), -1, 1, freq * 0.5, freq))(time),
	freq => time => triangle25(remap(square(lfoFrequency)(time), -1, 1, freq * 0.5, freq))(time),
	freq => time => triangle25(remap(square(lfoFrequency)(time), -1, 1, freq * 0.75, freq))(time),
	freq => time => triangle25(remap(square(lfoFrequency)(time), -1, 1, freq * 0.75, freq))(time),
	freq => time => triangle25(remap(pulse25(lfoFrequency)(time), -1, 1, freq * 0.25, freq))(time),
	freq => time => triangle75(remap(pulse25(lfoFrequency)(time), -1, 1, freq * 0.25, freq))(time),
	freq => time => square(remap(pulse25(lfoFrequency)(time), -1, 1, freq * 0.25, freq))(time)
];
let wave = wavePresets[0];
let adsrPresets = [
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.2, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.02, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.1, decayDuration: 0.25, releaseDuration: 0.25, peak: 0.45, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.25, releaseDuration: 0.25, peak: 0.45, sustain: 0.25 },
	{ attackDuration: 0.01, decayDuration: 0.25, releaseDuration: 0.25, peak: 0.45, sustain: 0.05 },
	{ attackDuration: 0.01, decayDuration: 0.25, releaseDuration: 0.25, peak: 0.45, sustain: 0.25 },
	{ attackDuration: 0.01, decayDuration: 0.05, releaseDuration: 0.05, peak: 0.75, sustain: 0.25 },
	{ attackDuration: 0.01, decayDuration: 0.05, releaseDuration: 0.05, peak: 0.75, sustain: 0.05 },
	{ attackDuration: 0.01, decayDuration: 0.05, releaseDuration: 0.3, peak: 0.75, sustain: 0.25 },
	{ attackDuration: 0.01, decayDuration: 0.05, releaseDuration: 0.3, peak: 0.75, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.05, releaseDuration: 0.05, peak: 0.75, sustain: 0.25 },
	{ attackDuration: 0.1, decayDuration: 0.05, releaseDuration: 0.05, peak: 0.75, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.05, releaseDuration: 0.3, peak: 0.75, sustain: 0.25 },
	{ attackDuration: 0.1, decayDuration: 0.05, releaseDuration: 0.3, peak: 0.75, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.05, peak: 0.75, sustain: 0.25 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.05, peak: 0.75, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.3, peak: 0.75, sustain: 0.25 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.3, peak: 0.75, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.05, peak: 0.5, sustain: 0.25 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.05, peak: 0.5, sustain: 0.05 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.3, peak: 0.5, sustain: 0.25 },
	{ attackDuration: 0.1, decayDuration: 0.5, releaseDuration: 0.3, peak: 0.5, sustain: 0.05 },
	{ attackDuration: 0.5, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.5, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.5, decayDuration: 0.01, releaseDuration: 0.5, peak: 0.85, sustain: 0.1 },
	{ attackDuration: 0.5, decayDuration: 0.01, releaseDuration: 0.5, peak: 0.85, sustain: 0.5 },
	{ attackDuration: 0.5, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.5, decayDuration: 0.5, releaseDuration: 0.5, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.5, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.5, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.1, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.1, peak: 0.05, sustain: 0.025 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.1, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0.1, decayDuration: 0.1, releaseDuration: 0.1, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0, decayDuration: 0.1, releaseDuration: 0.5, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0, decayDuration: 0.1, releaseDuration: 0.1, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0, decayDuration: 0.1, releaseDuration: 0.05, peak: 0.6, sustain: 0.4 },
	{ attackDuration: 0, decayDuration: 0.7, releaseDuration: 0.5, peak: 0.6, sustain: 0.3 },
	{ attackDuration: 0, decayDuration: 0.7, releaseDuration: 0.1, peak: 0.6, sustain: 0.3 },
	{ attackDuration: 0, decayDuration: 0.7, releaseDuration: 0.05, peak: 0.6, sustain: 0.3 },
	{ attackDuration: 0, decayDuration: 0, releaseDuration: 0.5, peak: 0.6, sustain: 0.6 },
	{ attackDuration: 0, decayDuration: 0, releaseDuration: 0.1, peak: 0.6, sustain: 0.6 },
	{ attackDuration: 0, decayDuration: 0, releaseDuration: 0.05, peak: 0.6, sustain: 0.6 }
]
let adsr = adsrPresets[0];

synthesizer((time) => {
	let tempA = volumeEnvelopes[0](keys[0], time, adsr);
	let tempB = volumeEnvelopes[1](keys[1], time, adsr);
	let tempC = volumeEnvelopes[2](keys[2], time, adsr);
	let tempD = volumeEnvelopes[3](keys[3], time, adsr);
	let tempE = volumeEnvelopes[4](keys[4], time, adsr);
	let tempF = volumeEnvelopes[5](keys[5], time, adsr);
	let tempG = volumeEnvelopes[6](keys[6], time, adsr);

	tempA = tempA ? tempA * a(octave, wave)(time) : tempA;
	tempB = tempB ? tempB * b(octave, wave)(time) : tempB;
	tempC = tempC ? tempC * c(octave, wave)(time) : tempC;
	tempD = tempD ? tempD * d(octave, wave)(time) : tempD;
	tempE = tempE ? tempE * e(octave, wave)(time) : tempE;
	tempF = tempF ? tempF * f(octave, wave)(time) : tempF;
	tempG = tempG ? tempG * g(octave, wave)(time) : tempG;

 	const base = (tempA + tempB + tempC + tempD + tempE + tempF + tempG)

	return cap(filter(cutOffFrequency, resonance)(base)) * volume;
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
	wave = wavePresets[wavePresets.indexOf(wave) + 1] || wavePresets[0];

	console.log("wave", wavePresets.indexOf(wave));
};

const previousWave = () => {
	wave = wavePresets[wavePresets.indexOf(wave) - 1] || wavePresets[wavePresets.length - 1];

	console.log("wave", wavePresets.indexOf(wave));
};

const increaseOctave = () => {
	octave += 0.2;

	console.log("octave", octave);
};

const decreaseOctave = () => {
	octave -= 0.2;

	console.log("octave", octave);
};

const increaseCutoff = () => {
	cutOffFrequency = limit(200, 7800)(cutOffFrequency + 200);

	console.log("cutOffFrequency", cutOffFrequency);
};

const decreaseCutoff = () => {
	cutOffFrequency = limit(200, 7800)(cutOffFrequency - 200);

	console.log("cutOffFrequency", cutOffFrequency);
};

const increaseResonance = () => {
	resonance = limit(0, Infinity)(resonance + 0.1);

	console.log("resonance", resonance);
};

const decreaseResonance = () => {
	resonance = limit(0, Infinity)(resonance - 0.1);

	console.log("resonance", resonance);
};

const increaseLFO = () => {
	lfoFrequency += 0.1;

	console.log("lfoFrequency", lfoFrequency);
};

const decreaseLFO = () => {
	lfoFrequency -= 0.1;

	console.log("lfoFrequency", lfoFrequency);
};

const increaseVolume = () => {
	volume = limit(0, 1)(volume + 0.025);

	console.log("volume", volume);
};

const decreaseVolume = () => {
	volume = limit(0, 1)(volume - 0.025);

	console.log("volume", volume);
};

const nextAdsr = () => {
	adsr = adsrPresets[adsrPresets.indexOf(adsr) + 1] || adsrPresets[0];

	console.log("adsr", adsrPresets.indexOf(adsr));
};

const previousAdsr = () => {
	adsr = adsrPresets[adsrPresets.indexOf(adsr) - 1] || adsrPresets[adsrPresets.length - 1];

	console.log("adsr", adsrPresets.indexOf(adsr));
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
	increaseResonance,
	decreaseResonance,
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
