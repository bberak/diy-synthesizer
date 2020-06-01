const { synthesizer, loop, compose, map, scale, sum, split, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g, saw, pulse } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");
const { log } = require("node-sfx/utils");

let octave = 4;
let mix = 0.5
let keys = [false, false, false, false, false, false, false]

// synthesizer(
// 	compose(
// 		split(7),
// 		map(keys),
// 		sum,
// 		//lowPass("lr")(440)
// 	)
// ).play();

const filter = lowPass("lp")(440);
const cap = limit(-0.99, 0.99);

synthesizer((time) => {
 	let base = (
		(keys[0] ? a(octave)(time) : 0) +
		(keys[1] ? b(octave)(time) : 0) +
		(keys[2] ? c(octave)(time) : 0) +
		(keys[3] ? d(octave)(time) : 0) +
		(keys[4] ? e(octave)(time) : 0) +
		(keys[5] ? f(octave)(time) : 0) +
		(keys[6] ? g(octave)(time) : 0)
	);

 	let result = base + (saw(2)(time) + pulse(0.1)(time)) * mix,

	return cap(result);
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
};

const previousEffect = () => {
	console.log("previous effect");
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
};

const decreaseMix = () => {
	console.log("decrease mix");
};

const increaseVolume = () => {
	console.log("increase volume");
};

const decreaseVolume = () => {
	console.log("decrease volume");
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
