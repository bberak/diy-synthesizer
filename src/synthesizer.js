const { synthesizer, loop, compose, map, scale, sum, split, limit } = require("node-sfx/core");
const { a, b, c, d, e, f, g } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");
const { log } = require("node-sfx/utils");
const nothing = () => 0;

let octave = 4;
let keys = [nothing, nothing, nothing, nothing, nothing, nothing, nothing]

// synthesizer(
// 	compose(
// 		split(7),
// 		map(keys),
// 		sum,
// 		//lowPass("lr")(440)
// 	)
// ).play();

const filter = lowPass("lr")(440);
const ceiling = limit(-0.8, 0.8);

synthesizer(time => {
	return limit(filter(keys[0](time) + keys[1](time) + keys[2](time) + keys[3](time) + keys[4](time) + keys[5](time) + keys[6](time)));
}).play();

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

	keys[0] = nothing;
}

const bDown = () => {
	console.log("b down");

	keys[1] = b(octave);
}

const bUp = () => {
	console.log("b up");

	keys[1] = nothing;
}

const cDown = () => {
	console.log("c down");

	keys[2] = c(octave)
}

const cUp = () => {
	console.log("c up");

	keys[2] = nothing;
}

const dDown = () => {
	console.log("d down");

	keys[3] = d(octave);
}

const dUp = () => {
	console.log("d up");

	keys[3] = nothing;
}

const eDown = () => {
	console.log("e down");

	keys[4] = e(octave);
}

const eUp = () => {
	console.log("e up");

	keys[4] = nothing;
}

const fDown = () => {
	console.log("f down");

	keys[5] = f(octave);
}

const fUp = () => {
	console.log("f up");

	keys[5] = nothing;
}

const gDown = () => {
	console.log("g down");

	keys[6] = g(octave);
}

const gUp = () => {
	console.log("g up");

	keys[6] = nothing;
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