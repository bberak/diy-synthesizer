const { Gpio } = require("pigpio");

const createRotaryEncoder = ({
	buttonPin,
	channelAPin,
	channelBPin,
	onPushButton = () => {},
	onClockwise = () => {},
	onCounterClockwise = () => {},
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
				onPushButton();
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

		const _onClockwise = () => {
			const a = channelA.digitalRead();
			const b = channelB.digitalRead();

			if (a === 1 && b === 0) onClockwise();
		};

		channelA.on("alert", _onClockwise);

		const _onCounterClockwise = () => {
			const a = channelA.digitalRead();
			const b = channelB.digitalRead();

			if (a === 0 && b === 1) onCounterClockwise();
		};

		channelB.on("alert", _onCounterClockwise);
	}
};

let count = 0;

const encoder = createRotaryEncoder({
	channelAPin: 17,
	channelBPin: 18,
	onClockwise: () => console.log(++count),
	onCounterClockwise: () => console.log(--count),
	//buttonPin: 17,
	//onPushButton: () => console.log(++count)
});
