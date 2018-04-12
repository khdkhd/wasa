export const createDelay = (audioContext) => {
	/* audio nodes */
	const output = audioContext.createGain()
	const filter = audioContext.createBiquadFilter()
	const delay = audioContext.createDelay(5.0)
	const feedback = audioContext.createGain()
	/* routing */
	delay.connect(feedback)
			.connect(filter)
			.connect(delay)
			.connect(output)
	/* parameters */
	filter.type = 'lowpass'
	let tempo = 120
	let division = 3
	/* convert beat division to delay time in seconds */
	const divisionToDelayTime = (_division, _tempo) => 60 / (_tempo * _division)
	let delayTimeSeconds = divisionToDelayTime(division, tempo)

	delay.delayTime.value = delayTimeSeconds

	return {
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		getInput() {
			return delay
		},
		setTempoValue(value) {
			tempo = value
			delay.delayTime.value = divisionToDelayTime(division, tempo)
			return this
		},
		getTempoValue() {
			return tempo
		},
		setDivisionValue(value) {
			division = value
			delayTimeSeconds = divisionToDelayTime(division, tempo)
			delay.disconnect(feedback)
			delay.delayTime.value = delayTimeSeconds
			delay.connect(feedback)
			return this
		},
		getDivisionValue() {
			return division
		},
		setDelayTimeValue(value) {
			delayTimeSeconds = value
			delay.delayTime.value = delayTimeSeconds
			return this
		},
		getDelayTimeValue() {
			return delayTimeSeconds
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
		},
	}
}
