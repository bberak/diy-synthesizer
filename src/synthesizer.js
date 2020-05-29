const { synthesizer, loop, compose, map, scale, passThrough, sum, split } = require("node-sfx/core");
const { a, b, c, d, e, f, g } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");

let octave = 4;
let keys = [passThrough, passThrough, passThrough, passThrough, passThrough, passThrough, passThrough]

synthesizer(
	compose(
		map(keys),
		sum(),
		lowPass("lr")(440),
		split(2)
	)
).play();

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

	octave++;
};

const decreaseOctave = () => {
	console.log("decrease octave");

	octave--;
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

	keys[0] = a(octave);
}

const aUp = () => {
	console.log("a up");

	keys[0] = passThrough;
}

const bDown = () => {
	console.log("b down");

	keys[1] = b(octave);
}

const bUp = () => {
	console.log("b up");

	keys[1] = passThrough;
}

const cDown = () => {
	console.log("c down");

	keys[2] = c(octave)
}

const cUp = () => {
	console.log("c up");

	keys[2] = passThrough;
}

const dDown = () => {
	console.log("d down");

	keys[3] = d(octave);
}

const dUp = () => {
	console.log("d up");

	keys[3] = passThrough;
}

const eDown = () => {
	console.log("e down");

	keys[4] = e(octave);
}

const eUp = () => {
	console.log("e up");

	keys[4] = passThrough;
}

const fDown = () => {
	console.log("f down");

	keys[5] = f(octave);
}

const fUp = () => {
	console.log("f up");

	keys[5] = passThrough;
}

const gDown = () => {
	console.log("g down");

	keys[6] = g(octave);
}

const gUp = () => {
	console.log("g up");

	keys[6] = passThrough;
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