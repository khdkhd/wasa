import test from 'ava'
import { symbolToFrequency, midiToFrequency } from '.'
import { frequencyToMidi, frequencyToSymbol, midiToSymbol, symbolToMidi } from './note'


test('Note C3 converts to 130.81 Hz', (t) => {
	const frequency = symbolToFrequency('C', 3)
	t.is(130.81, Number(frequency.toFixed(2)))
})

test('Note A3 converts to 220 Hz', (t) => {
	const frequency = symbolToFrequency('A', 3)
	t.is(220, frequency)
})

test('Note A#3 converts to 233.08 Hz', (t) => {
	const frequency = symbolToFrequency('A#', 3)
	t.is(233.08, Number(frequency.toFixed(2)))
})

test('Note A4 converts to 440 Hz', (t) => {
	const frequency = symbolToFrequency('A', 4)
	t.is(440, frequency)
})

test('Note A5 converts to 880 Hz', (t) => {
	const frequency = symbolToFrequency('A', 5)
	t.is(880, frequency)
})

test('Midi value 69 converts to 400 Hz with a 440 tuning value', (t) => {
	const frequency = midiToFrequency(440, 69)
	t.is(440, frequency)
})

test('Midi value 69 converts to 400 Hz with a 440 tuning value (curry)', (t) => {
	const frequencyFromMidiPartial = midiToFrequency(/* defaults to 440 */)
	const frequency = frequencyFromMidiPartial(69)
	t.is(440, frequency)
})

test('Midi value 60 converts to 261.63 Hz with a 440 tuning value (curry)', (t) => {
	const frequencyFromMidiPartial = midiToFrequency(/* defaults to 440 */)
	const frequency = frequencyFromMidiPartial(60)
	t.is(261.63, Number(frequency.toFixed(2)))
})

test('Frequency 440 Hz converts to midi value 69 with a 440 tuning value (curry)', (t) => {
	const frequencyToMidiPartial = frequencyToMidi(/* defaults to 440 */)
	const midiValue = frequencyToMidiPartial(440)
	t.is(69, midiValue)
})

test('Frequency 261.63 Hz converts to midi value 60 with a 440 tuning value (curry)', (t) => {
	const frequencyToMidiPartial = frequencyToMidi(/* defaults to 440 */)
	const midiValue = frequencyToMidiPartial(261.63)
	t.is(60, Number(midiValue.toFixed(0)))
})

test('Symbol A octave 4 converts to midi value 69', (t) => {
	const midiValue = symbolToMidi('A', 4)
	t.is(69, midiValue)
})


test('Midi value 69 converts to pitchClass A, octave 4', (t) => {
	const symbol = midiToSymbol(69)
	t.is('A', symbol.pitchClass)
	t.is(4, symbol.octave)
})

test('Frequency 440 Hz converts to pitchClass A, octave 4', (t) => {
	const symbol = frequencyToSymbol(440)
	t.is('A', symbol.pitchClass)
	t.is(4, symbol.octave)
})
