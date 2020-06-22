const { Gpio } = require("pigpio");

const createRotaryEncoder = ({
	buttonPin,
	channelAPin,
	channelBPin,
	onButtonDown = () => {},
	onButtonUp = () => {},
	onClockwiseTurn = () => {},
	onCounterClockwiseTurn = () => {},
	buttonGlitchFilter = 10000,
	channelAGlitchFilter = 1000,
	channelBGlitchFilter = 1000
} = {}) => {
	if (buttonPin) {
		const switchButton = new Gpio(buttonPin, {
			mode: Gpio.INPUT,
			pullUpDown: Gpio.PUD_UP,
			alert: true
		});
		
		switchButton.glitchFilter(buttonGlitchFilter);		

		const _onPushButton = () => {
			const level = switchButton.digitalRead();

			if (level === 0)
				onButtonDown();
			else
				onButtonUp();
		};

		switchButton.on("alert", _onPushButton);
	}

	if (channelAPin && channelBPin) {
		const channelA = new Gpio(channelAPin, {
			mode: Gpio.INPUT,
			pullUpDown: Gpio.PUD_UP,
			edge: Gpio.RISING_EDGE,
			alert: true
		});

		channelA.glitchFilter(channelAGlitchFilter);

		const channelB = new Gpio(channelBPin, {
			mode: Gpio.INPUT,
			pullUpDown: Gpio.PUD_UP,
			edge: Gpio.RISING_EDGE,
			alert: true
		});

		channelB.glitchFilter(channelBGlitchFilter);

		const _onTurn = () => {
			const a = channelA.digitalRead();
			const b = channelB.digitalRead();

			if (a === 1 && b === 1) onClockwiseTurn();
			else if (a === 1 && b === 0) onCounterClockwiseTurn();
		};

		channelA.on("alert", _onTurn);
		channelB.on("alert", _onTurn);
	}
};

module.exports = createRotaryEncoder;
