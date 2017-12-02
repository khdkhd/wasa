export const Delay = (audioContext) => {
	const output = audioContext.createGain()
	const filter = audioContext.createBiquadFilter()
	const delay = audioContext.createDelay()
	const feedback = audioContext.createGain()
	delay.connect(feedback)
	feedback.connect(filter)
	filter.connect(delay)
	filter.type = 'lowpass'
	delay.connect(output)
	let tempo = 120
	let division = 4
	delay.delayTime.value = 60 / (tempo * division)

	return {
		connect({ connect, input }) {
			output.connect(input)
			return { connect }
		},
		input: delay,
		setTempoValue(value) {
			tempo = value
			delay.delayTime.value = 60 / (tempo * division)
			return this
		},
		getTempoValue() {
			return tempo
		},
		setDivisionValue(value) {
			division = value
			delay.delayTime.value = 60 / (tempo * division)
			return this
		},
		getDivisionValue() {
			return division
		},
		setFrequencyValue(value) {
			filter.frequency.value = value
			return this
		},
		getFrequencyValue() {
			return filter.frequency.value
		},
		setFeedbackValue(value) {
			feedback.gain.value = value
			return this
		},
		getFeedbackValue() {
			return feedback.gain.value
		}

	}

}
