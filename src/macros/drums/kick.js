export const Kick = (audioContext) => {
	const output = audioContext.createGain()
	const gains = [
		audioContext.createGain(),
		audioContext.createGain(),
	]
	const filter = audioContext.createBiquadFilter()

	filter.connect(output)
	gains.forEach((gain) => {
		gain.connect(filter)
	})
	let oscs = []
	let mainOsc
	let subOsc
	let initialFrequency = 150
	let duration = 0.15
	let subOscEnabled = true

	const finalFrequency = 0.01

	output.gain.value = 1
	filter.type = 'allpass'
	filter.frequency.value = 40
	filter.gain.value = -50

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			mainOsc = audioContext.createOscillator()
			mainOsc.type = 'triangle'
			mainOsc.frequency.setValueAtTime(initialFrequency, time)
			mainOsc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration)
			oscs = [
				mainOsc,
			]
			if (subOscEnabled) {
				subOsc = audioContext.createOscillator()
				subOsc.type = 'sine'
				subOsc.frequency.setValueAtTime(initialFrequency / 2, time)
				subOsc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration)
				oscs.push(subOsc)
			}
			gains.forEach((gain) => {
				gain.gain.linearRampToValueAtTime((1 / oscs.length) * velocity, time)
				gain.gain.exponentialRampToValueAtTime(1E-10, time + duration)
			})
			oscs.forEach((osc, i) => {
				osc.connect(gains[i])
				osc.start(time)
				osc.stop(time + duration)
			})
		},
		noteOff(time = audioContext.currentTime + duration) {
			oscs.forEach((osc, i) => {
				osc.stop(time)
				osc.frequency.cancelScheduledValues(time)
				gains[i].gain.cancelScheduledValues(time)
			})
		},
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		setFrequencyValue(value) {
			initialFrequency = value
			return this
		},
		getFrequencyValue() {
			return initialFrequency
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
		getIsSubOscEnabled() {
			return subOscEnabled
		},
		setIsSubOscEnabled(value) {
			subOscEnabled = value
			return this
		},
	}
}
