export const DURATIONS = Object.freeze({
	WHOLE: 1,
	HALF: 1 / 2,
	QUARTER: 1 / 4,
	EIGHTH: 1 / 8,
})

export const Note = ({ note, octave, duration }) => ({
	getNote() {
		return note
	},
	getOctave() {
		return octave
	},
	getDuration() {
		return DURATIONS[duration] || duration
	},
})

/**
 * Computes the frequency value of the given note in the given octave
 * @param {string} note - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
export const getFrequency = (note, octave) => {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
	const o = 4 // base octave
	const n = 'A' // base note
	const f = 440 // base frequency
	const d = notes.indexOf(note) - notes.indexOf(n) // delta
	const a = 2 ** (1 / 12) // semi tone factor
	const m = octave - o >= 0 ? ((octave - o) + 1) : 1 / ((o - octave) + 1) // multiplier
	return f * (a ** d) * m
}
