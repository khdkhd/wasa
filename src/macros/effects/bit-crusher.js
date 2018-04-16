import * as R from 'ramda'

export const createBitCrusher = (audioContext) => {
	const bufferSize = 512
	const scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1)
	let bits = 16
	let normFreq = 0.05
	const step = 0.5 ** bits
	let phaser = 0
	let last = 0
	scriptProcessor.onaudioprocess = (event) => {
		const input = event.inputBuffer.getChannelData(0)
		const output = event.outputBuffer.getChannelData(0)
		R.times((i) => {
			phaser += normFreq
			if (phaser >= 1) {
				phaser -= 1
				last = step * Math.floor((input[i] / step) + 0.5)
			}
			output[i] = last
		}, bufferSize)
	}

	return {
		connect({ connect, getInput }) {
			scriptProcessor.connect(getInput())
			return { connect }
		},
		getInput() {
			return scriptProcessor
		},
		setFrequencyValue(value) {
			normFreq = value
			return this
		},
		setBitsValue(value) {
			bits = value
			return this
		},
	}
}
