import test from 'ava'
import { scale, unscale } from '.'

test('Normalizes value from [min,max] to [0,1]', (t) => {
	const range = {
		min: 5,
		max: 15,
	}
	const value = scale(range, 10)
	t.is(0.5, value)
})

test('Returns value unchanged if range is undefined', (t) => {
	const range = undefined
	const value = scale(range, 10)
	t.is(value, value)
})

test('Unormalizes value from [0,1] to [min,max]', (t) => {
	const range = {
		min: 5,
		max: 15,
	}
	const value = unscale(range, 0.5)
	t.is(10, value)
})


test('Returns value unchanged if range is undefined', (t) => {
	const range = undefined
	const value = unscale(range, 10)
	t.is(value, value)
})
