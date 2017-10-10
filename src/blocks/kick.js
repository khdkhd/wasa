export const Kick = ({ audioContext }) => {
	const output = audioContext.createGain()
	const gains = [
		audioContext.createGain(),
		audioContext.createGain(),
	]
	gains.forEach((gain) => {
		gain.connect(output)
	})
	let oscs = []
	let freq = 100
	let finalFreq = 1
	let duration = 0.25

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			oscs = [
				audioContext.createOscillator(),
				audioContext.createOscillator(),
			]
			oscs[0].type = 'triangle'
			oscs[1].type = 'sine'
			oscs.forEach((osc, i) => {
				osc.frequency.setValueAtTime(freq, time)
				osc.frequency.exponentialRampToValueAtTime(finalFreq, time + duration)
				osc.connect(gains[i])
				osc.start(time)
				osc.stop(time + duration)
			})
			gains.forEach((gain) => {
				gain.gain.setValueAtTime(1 * velocity, time)
				gain.gain.exponentialRampToValueAtTime(0.001, time + duration)
			})
		},
		noteOff(time = audioContext.currentTime + duration) {
			oscs.forEach((osc, i) => {
				osc.stop(time)
				osc.frequency.cancelScheduledValues(time)
				gains[i].gain.cancelScheduledValues(time)
			})
		},
		connect({ connect, input }) {
			output.connect(input)
			return { connect }
		},
		setFinalFreq(value) {
			finalFreq = value
			return this
		},
		setFreq(value) {
			freq = value
			return this
		},
		setDuration(value) {
			duration = value
			return this
		},
		getOutputGain() {
			return output.gain
		},
	}
}
