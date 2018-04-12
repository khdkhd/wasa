import * as R from 'ramda'

export const NoiseConvolver = (audioContext) => {
	const convolver = audioContext.createConvolver()
	const bufferSize = audioContext.sampleRate
	const buffer = audioContext.createBuffer(2, bufferSize / 2, bufferSize)
	const left = buffer.getChannelData(0)
	const right = buffer.getChannelData(1)
	R.times((i) => {
		left[i] = Math.random()
		right[i] = Math.random()
	}, buffer.length)
	convolver.buffer = buffer

	return {
		connect({ connect, getInput }) {
			convolver.connect(getInput())
			return { connect }
		},
		getInput() {
			return convolver
		},
	}
}
