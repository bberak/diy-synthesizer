
module.exports = (states = [], onChange) => {
	const states = _.flatten(args);

	let index = 0;

	const current = () => states[Math.abs(index) % states.length];

	const next = () => {
		index++;

		const state = current();

		if (onChange)
			onChange(state);

		return state;
	};

	const previous = () => {
		index--;

		const state = current();

		if (onChange)
			onChange(state);

		return state;
	};

	return {
		current,
		next,
		previous,
	};
};
