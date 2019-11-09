import test from 'ava';
import { scale, unscale } from '.';

test('Normalizes value from [min,max] to [0,1]', (t) => {
	const range = {
		min: 5,
		max: 15,
	};
	const value = scale(range, 10);
	t.is(0.5, value);
});

test('scale throws error if value is undefined', (t) => {
	const range = {
		min: 5,
		max: 15,
	};
	t.throws(() => scale(range, undefined), Error);
});

test('scale throws error if range is undefined', (t) => {
	t.throws(() => scale(undefined, undefined), Error);
});

test('unscale throws error if value is undefined', (t) => {
	const range = {
		min: 5,
		max: 15,
	};
	t.throws(() => unscale(range, undefined), Error);
});

test('unscale throws error if range is undefined', (t) => {
	t.throws(() => unscale(undefined, undefined), Error);
});

test('De-normalizes value from [0,1] to [min,max]', (t) => {
	const range = {
		min: 5,
		max: 15,
	};
	const value = unscale(range, 0.5);
	t.is(10, value);
});

