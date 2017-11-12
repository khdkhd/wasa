export const Kick = (audioContext) => {
	const output = audioContext.createGain()
	output.gain.value = 0.5
	const gains = [
		audioContext.createGain(),
		audioContext.createGain(),
	]
	const filter = audioContext.createBiquadFilter()
	filter.type = 'lowshelf'
	filter.frequency.value = 200
	filter.gain.value = -0.9
	gains.forEach((gain) => {
		gain.connect(filter)
	})
	filter.connect(output)
	let oscs = []
	let subOscEnabled = false
	let mainOsc
	let subOsc
	let freq = 100
	let finalFreq = 1
	let duration = 0.25
	let attack = 0.01

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			mainOsc = audioContext.createOscillator()
			mainOsc.type = 'triangle'
			mainOsc.frequency.setValueAtTime(freq, time)
			mainOsc.frequency.exponentialRampToValueAtTime(finalFreq, time + duration)
			oscs = [
				mainOsc,
			]
			if (subOscEnabled) {
				subOsc = audioContext.createOscillator()
				subOsc.type = 'sine'
				subOsc.frequency.setValueAtTime(freq / 2, time)
				subOsc.frequency.exponentialRampToValueAtTime(finalFreq / 2, time + duration)
				oscs.push(subOsc)
			}
			oscs.forEach((osc, i) => {
				osc.connect(gains[i])
				osc.start(time)
				osc.stop(time + duration)
			})
			gains.forEach((gain) => {
				gain.gain.linearRampToValueAtTime((1 / gains.length) * velocity, time + attack)
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
		getIsSubOscEnabled() {
			return subOscEnabled
		},
		setIsSubOscEnabled(value) {
			subOscEnabled = value
			return this
		},
	}
}
