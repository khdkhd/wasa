export const NodeOutputMixer = (audioContext) => {
	/* web audio nodes */
	const outputGainNode = audioContext.createGain()
	const leftGainNode = audioContext.createGain()
	const rightGainNode = audioContext.createGain()

	/* constant values */
	const MIDDLE_GAIN_VALUE = 0.5

	/* parameter values */
	let fadeValue = 0

	/* routing */
	leftGainNode.connect(outputGainNode)
	rightGainNode.connect(outputGainNode)
	leftGainNode.gain.value = MIDDLE_GAIN_VALUE
	rightGainNode.gain.value = MIDDLE_GAIN_VALUE

	return {
		setFadeValue(value) {
			leftGainNode.gain.value = MIDDLE_GAIN_VALUE - (value * MIDDLE_GAIN_VALUE)
			rightGainNode.gain.value = MIDDLE_GAIN_VALUE + (value * MIDDLE_GAIN_VALUE)
			fadeValue = value
			return this
		},
		getFadeValue() {
			return fadeValue
		},
		setLeftInput(audioNode) {
			audioNode.connect(leftGainNode)
			return this
		},
		setRightInput(audioNode) {
			audioNode.connect(rightGainNode)
			return this
		},
		connect({ connect, getInput }) {
			outputGainNode.connect(getInput())
			return { connect }
		},
		getLeftGainNode() {
			return leftGainNode
		},
		getRightGainNode() {
			return rightGainNode
		},
	}
}
