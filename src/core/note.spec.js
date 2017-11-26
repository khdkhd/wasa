import test from 'ava'
import { frequencyFromSymbol, frequencyFromMidi } from '.'


test('Note C3 converts to 130.81 Hz', (t) => {
	const frequency = frequencyFromSymbol('C', 3)
	t.is(130.81, Number(frequency.toFixed(2)))
})

test('Note A3 converts to 220 Hz', (t) => {
	const frequency = frequencyFromSymbol('A', 3)
	t.is(220, frequency)
})

test('Note A#3 converts to 233.08 Hz', (t) => {
	const frequency = frequencyFromSymbol('A#', 3)
	t.is(233.08, Number(frequency.toFixed(2)))
})

test('Note A4 converts to 440 Hz', (t) => {
	const frequency = frequencyFromSymbol('A', 4)
	t.is(440, frequency)
})

test('Note A5 converts to 880 Hz', (t) => {
	const frequency = frequencyFromSymbol('A', 5)
	t.is(880, frequency)
})

test('Midi value 69 converts to 400 Hz with a 440 tuning value', (t) => {
	const frequency = frequencyFromMidi(440, 69)
	t.is(440, frequency)
})

test('Midi value 69 converts to 400 Hz with a 440 tuning value (curry)', (t) => {
	const frequencyFromMidiPartial = frequencyFromMidi(/* defaults to 440 */)
	const frequency = frequencyFromMidiPartial(69)
	t.is(440, frequency)
})
