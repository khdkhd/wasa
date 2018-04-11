import { mandatory } from '../../../common/utils'
import { FilterTypes } from '../../../constants/filter-types'
import { WaveForms } from '../../../constants/wave-forms'

export const Hat = (audioContext = mandatory('audioContext')) => {
	const output = audioContext.createGain()
	const gate = audioContext.createGain()
	const bandpassFilter = audioContext.createBiquadFilter()
	const highpassFilter = audioContext.createBiquadFilter()

	const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]
	const oscs = []

	let fundamental = 35
	let duration = 0.25

	/* routing */
	bandpassFilter
		.connect(highpassFilter)
		.connect(gate)
		.connect(output)

	bandpassFilter.type = FilterTypes.BAND_PASS
	bandpassFilter.frequency.value = 9000
	highpassFilter.type = FilterTypes.HIGH_PASS
	highpassFilter.frequency.value = 9000

	return {
		noteOn(velocity = 1, time = audioContext.currentTime) {
			ratios.forEach((ratio) => {
				const osc = audioContext.createOscillator()
				osc.type = WaveForms.SQUARE
				// Frequency is the fundamental * this oscillator's ratio
				osc.frequency.value = fundamental * ratio
				osc.connect(bandpassFilter)
				osc.start(time)
				oscs.push(osc)
			})
			gate.gain.setValueAtTime(1E-10, time)
			gate.gain.exponentialRampToValueAtTime(velocity / ratios.length, time + 0.02)
			gate.gain.exponentialRampToValueAtTime((velocity / ratios.length) * 0.3, time + 0.03)
			gate.gain.exponentialRampToValueAtTime(1E-10, time + duration)
		},
		noteOff(time = audioContext.currentTime + duration) {
			gate.gain.cancelScheduledValues(time)
			oscs.forEach(() => {
				oscs.pop().stop(time)
			})
		},
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		setDurationValue(value) {
			duration = value
			return this
		},
		getDurationValue() {
			return duration
		},
		setFundamentalValue(value) {
			fundamental = value
			return this
		},
		getFundamentalValue() {
			return fundamental
		},
		setOutputGainValue(value) {
			output.gain.value = value
			return this
		},
		getOutputGainValue() {
			return output.gain.value
		},
	}
}
