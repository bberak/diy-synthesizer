const { Gpio } = require("pigpio");

const createPupButton = ({ pin, onButtonDown = () => {}, onButtonUp = () => {} } = {}) => {
	const button = new Gpio(pin, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_UP,
		edge: Gpio.EITHER_EDGE,
	});

	button.on("interrupt", (level) => {
		if (level)
			onButtonDown();
		else
			onButtonUp();
	});
};

module.exports = createPupButton;