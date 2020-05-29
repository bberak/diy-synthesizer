const { synthesizer, loop, compose, map, scale } = require("node-sfx/core");
const { a, b, c, d, e, f, g } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");
const { listenForExit } = require("node-sfx/utils");

// synthesizer(
// 	compose(
// 		loop(
// 			[
// 				[c(4), e(4), g(4), b(4), c(5), b(4), g(4), e(4)],
// 				[c(2), e(2), g(2), b(2), c(3), b(2), g(2), e(2)]
// 			],
// 			275 // beats per minute
// 		),
// 		map(scale(0.5), scale(1)),
// 		map(lowPass("l")(440), lowPass("r")(440))
// 	)
// ).play();

// listenForExit();

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
};

const decreaseOctave = () => {
	console.log("decrease octave");
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
}

const aUp = () => {
	console.log("a up");
}

const bDown = () => {
	console.log("b down");
}

const bUp = () => {
	console.log("b up");
}

const cDown = () => {
	console.log("c down");
}

const cUp = () => {
	console.log("c up");
}

const dDown = () => {
	console.log("d down");
}

const dUp = () => {
	console.log("d up");
}

const eDown = () => {
	console.log("e down");
}

const eUp = () => {
	console.log("e up");
}

const fDown = () => {
	console.log("f down");
}

const fUp = () => {
	console.log("f up");
}

const gDown = () => {
	console.log("g down");
}

const gUp = () => {
	console.log("g up");
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