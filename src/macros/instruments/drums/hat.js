import { Filters, WaveForms } from '../../constants'

export const Hat = (audioContext) => {
	const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]
	const bandpass = audioContext.createBiquadFilter()
	const gate = audioContext.createGain()
	const output = audioContext.createGain()
	const highpass = audioContext.createBiquadFilter()

	let fundamental = 35
	let duration = 0.25
	let osc

	bandpass.type = 'bandpass'
	bandpass.frequency.value = 10000

	highpass.type = 'highpass'
	highpass.frequency.value = 7000

	bandpass.connect(highpass)
	highpass.connect(gate)
	gate.connect(output)

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			ratios.forEach((ratio) => {
				osc = audioContext.createOscillator()
				osc.type = 'square'
				// Frequency is the fundamental * this oscillator's ratio
				osc.frequency.value = fundamental * ratio
				osc.connect(bandpass)
				osc.start(time)
				osc.stop(time + duration)
			})
			gate.gain.setValueAtTime(0.00001, time)
			gate.gain.exponentialRampToValueAtTime(velocity, time + 0.02)
			gate.gain.exponentialRampToValueAtTime(velocity * 0.3, time + 0.03)
			gate.gain.exponentialRampToValueAtTime(0.00001, time + duration)
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (osc) {
				gate.gain.cancelScheduledValues(time)
				osc.stop(time)
			}
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
