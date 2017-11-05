import test from 'ava'
import { Note, getFrequency, DURATIONS } from '.'

test('Note factory creates an object', (t) => {
	const note = Note({
		note: 'A4',
		octave: 3,
		duration: DURATIONS.WHOLE,
	})
	t.true(typeof note === 'object')
})

test('Note factory creates an object with a note getter', (t) => {
	const note = Note({
		note: 'A4',
		octave: 3,
		duration: DURATIONS.WHOLE,
	})
	t.is('A4', note.getNote())
})

test('Note factory creates an object with an octave getter', (t) => {
	const note = Note({
		note: 'A4',
		octave: 3,
		duration: DURATIONS.WHOLE,
	})
	t.is(3, note.getOctave())
})

test('Note factory creates an object with a duration getter', (t) => {
	const note = Note({
		note: 'A4',
		octave: 3,
		duration: DURATIONS.WHOLE,
	})
	t.is(DURATIONS.WHOLE, note.getDuration())
})
test('Note C3 converts to 130.81 Hz', (t) => {
	const frequency = getFrequency('C', 3)
	t.is(130.81, Number(frequency.toFixed(2)))
})

test('Note A3 converts to 220 Hz', (t) => {
	const frequency = getFrequency('A', 3)
	t.is(220, frequency)
})

test('Note A#3 converts to 233.08 Hz', (t) => {
	const frequency = getFrequency('A#', 3)
	t.is(233.08, Number(frequency.toFixed(2)))
})

test('Note A4 converts to 440 Hz', (t) => {
	const frequency = getFrequency('A', 4)
	t.is(440, frequency)
})

test('Note A5 converts to 880 Hz', (t) => {
	const frequency = getFrequency('A', 5)
	t.is(880, frequency)
})

