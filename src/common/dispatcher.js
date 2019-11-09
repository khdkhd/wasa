import { Subject } from 'rxjs';

export const Events = Object.freeze({
	SEQUENCER_START: 0,
	SEQUENCER_STOP: 1,
	SEQUENCER_TICK: 2,
	TEMPO_CHANGE: 3,
	CHANGE: 999,
});


export const Dispatcher = (() => {
	const subject = new Subject();

	return {
		dispatch(type, data) {
			subject.next({ type, data });
		},
		as(type) {
			return subject
				.filter(action => action.type === type)
				.map(action => action.data);
		},
	};
})();
