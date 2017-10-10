export const Hat = ({ audioContext }) => {
	const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]
	const bandpass = audioContext.createBiquadFilter()
	const output = audioContext.createGain()
	const highpass = audioContext.createBiquadFilter()
	const fundamental = 35
	let duration = 0.25
	let osc

	bandpass.type = 'bandpass'
	bandpass.frequency.value = 10000

	highpass.type = 'highpass'
	highpass.frequency.value = 7000

	bandpass.connect(highpass)
	highpass.connect(output)

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
			output.gain.setValueAtTime(0.00001, time)
			output.gain.exponentialRampToValueAtTime(1 * velocity, time + 0.02)
			output.gain.exponentialRampToValueAtTime(0.3, time + 0.03)
			output.gain.exponentialRampToValueAtTime(0.00001, time + duration)
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (osc) {
				output.gain.cancelScheduledValues(time)
				osc.stop(time)
			}
		},
		connect({ connect, input }) {
			output.connect(input)
			return { connect }
		},
		setDuration(value) {
			duration = value
			return this
		},
	}
}
