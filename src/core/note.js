import { isNil } from 'ramda'

/**
 * Notes Durations Constants
 * @type {Object}
 */
export const DURATIONS = Object.freeze({
	WHOLE: 1,
	HALF: 1 / 2,
	QUARTER: 1 / 4,
	EIGHTH: 1 / 8,
})

/**
 * Computes the frequency value of the given note in the given octave
 * @param {string} note - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
export const frequencyFromSymbol = (note, octave) => {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
	const o = 4 // base octave
	const n = 'A' // base note
	const f = 440 // base frequency
	const d = notes.indexOf(note) - notes.indexOf(n) // delta
	const a = 2 ** (1 / 12) // semi tone factor
	const m = octave - o >= 0 ? ((octave - o) + 1) : 1 / ((o - octave) + 1) // multiplier
	return f * (a ** d) * m
}

/**
 * Computes the frequency value of the given midi note
 * with custom, optional tuning (default value for
 * tuning is 440 for A4)
 * This curry function will be partially applied if tuning
 * is the only parameter
 * @param {number} tuning - The frequency associated to midi value 69 (A4)
 * @param {number} midiValue - Midi value (0 to 127) of the note
 */
export const frequencyFromMidi = (tuning = 440, midiValue) => {
	if (isNil(midiValue)) {
		return _ => frequencyFromMidi(tuning, _)
	}
	if (midiValue >= 0 && midiValue <= 127) {
		return tuning * (2 ** ((midiValue - 69) / 12))
	}
	return null
}
