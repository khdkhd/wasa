import test from 'ava';
import { Dispatcher, Events } from '.';

test('Events has a CHANGE entry', (t) => {
	t.truthy(Object.keys(Events).includes('CHANGE'));
});

test('Dispatcher catches dispatched events', (t) => {
	t.plan(1);
	Dispatcher.as(Events.CHANGE)
		.subscribe((data) => {
			t.deepEqual(data, { value: 1 });
		});
	Dispatcher.dispatch(Events.CHANGE, { value: 1 });
});
