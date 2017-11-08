export const Kick = (audioContext) => {
	const output = audioContext.createGain()
	output.gain.value = 0.5
	const gains = [
		audioContext.createGain(),
		audioContext.createGain(),
	]
	const filter = audioContext.createBiquadFilter()
	filter.type = 'lowshelf'
	filter.frequency.value = 150
	filter.gain.value = -0.9
	gains.forEach((gain) => {
		gain.connect(filter)
	})
	filter.connect(output)
	let oscs = []
	let freq = 100
	let finalFreq = 1
	let duration = 0.25
	let attack = 0.01

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
				gain.gain.linearRampToValueAtTime(0.5 * velocity, time + attack)
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
		setFinalFrequencyValue(value) {
			finalFreq = value
			return this
		},
		getFinalFrequencyValue() {
			return finalFreq
		},
		setFrequencyValue(value) {
			freq = value
			return this
		},
		getFrequencyValue() {
			return freq
		},
		setDurationValue(value) {
			duration = value
			return this
		},
		getDurationValue() {
			return duration
		},
		setOutputGainValue(value) {
			output.gain.value = value
			return this
		},
		getOutputGainValue() {
			return output.gain.value
		},
		getAttackValue() {
			return attack
		},
		setAttackValue(value) {
			attack = value
			return this
		},
	}
}
