export const NodeOutputMixer = (audioContext) => {
	const outputGainNode = audioContext.createGain()
	const leftGainNode = audioContext.createGain()
	const rightGainNode = audioContext.createGain()

	leftGainNode.connect(outputGainNode)
	rightGainNode.connect(outputGainNode)
	leftGainNode.gain.value = 0.5
	rightGainNode.gain.value = 0.5

	return {
		fade(value) {
			leftGainNode.gain.value = 1 - Math.abs(value)
			rightGainNode.gain.value = Math.abs(value)
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
