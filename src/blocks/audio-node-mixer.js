export const AudioNodeMixer = (audioContext) => {
	const outputGainNode = audioContext.createGain()
	const leftGainNode = audioContext.createGain()
	const rightGainNode = audioContext.createGain()

	leftGainNode.connect(outputGainNode)
	rightGainNode.connect(outputGainNode)

	return {
		fadeRight(value) {
			leftGainNode.gain.value -= value
			rightGainNode.gain.value += value
		},
		fadeLeft(value) {
			rightGainNode.gain.value -= value
			leftGainNode.gain.value += value
		},
		setLeftInput(audioNode) {
			audioNode.connect(leftGainNode)
			return this
		},
		setRightInput(audioNode) {
			audioNode.connect(rightGainNode)
			return this
		},
		connect({ input, connect }) {
			outputGainNode.connect(input)
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
