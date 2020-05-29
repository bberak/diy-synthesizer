const { Gpio } = require("pigpio");

const createPupButton = ({ pin, onPress = () => {} } = {}) => {
	const button = new Gpio(pin, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_UP,
		edge: Gpio.EITHER_EDGE,
	});

	button.on("interrupt", (level) => onPress);
};
