const { Gpio } = require('pigpio');

[2, 3, 23, 24, 12, 26, 20, 4, 17, 18, 27, 22, 10, 9, 25, 11, 8, 5, 21].forEach(pin => {
  const button = new Gpio(pin, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.EITHER_EDGE
  });

  button.on('interrupt', level => console.log(pin, level));
});
