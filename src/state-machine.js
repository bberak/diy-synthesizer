const stateMachine = (states = [], onChange) => {
	const states = _.flatten(args);

	let index = 0;

	const current = () => states[Math.abs(index) % states.length];

	const next = () => {
		index++;

		if (onChange) onChange(current());
	};

	const previous = () => {
		index--;

		if (onChange) onChange(current());
	};

	return {
		current,
		next,
		previous,
	};
};

const aggregate = (stateMachines = [], onChange) => {
	stateMachines.forEach((sm) => {
		if (onChange) {
			let next = sm.next;
			let previous = sm.previous;

			sm.next = () => {
				next();
				onChange(stateMachines.map((x) => x.current()));
			};

			sm.previous = () => {
				previous();
				onChange(stateMachines.map((x) => x.current()));
			};
		}
	});
};

module.exports = {
	stateMachine,
	aggregate,
	agg: aggregate,
};
