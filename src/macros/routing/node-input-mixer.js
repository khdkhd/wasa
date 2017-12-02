export const NodeInputMixer = (audioContext) => {
	const outputGainNode = audioContext.createGain()
	const inputGainNode = audioContext.createGain()
	const leftGainNode = audioContext.createGain()
	const rightGainNode = audioContext.createGain()
	inputGainNode.connect(leftGainNode)
	inputGainNode.connect(rightGainNode)
	leftGainNode.gain.value = 0.5
	rightGainNode.gain.value = 0.5

	return {
		connect({ connect, getInput }) {
			outputGainNode.connect(getInput())
			return { connect }
		},
		getInput() {
			return inputGainNode
		},
		fade(value) {
			leftGainNode.gain.value = 1 - Math.abs(value)
			rightGainNode.gain.value = Math.abs(value)
		},
		setLeftOutput(audioNode) {
			leftGainNode.connect(audioNode)
			audioNode.connect(outputGainNode)
			return this
		},
		setRightOutput(audioNode) {
			rightGainNode.connect(audioNode)
			audioNode.connect(outputGainNode)
			return this
		},
		getLeftGainNode() {
			return leftGainNode
		},
		getRightGainNode() {
			return rightGainNode
		},
	}
}
