
import { times } from 'ramda'
import { WaveForms } from '../constants/wave-forms'

export const mandatory = (parameterName = '') => {
	throw new Error(`Missing mandatory parameter ${parameterName}`)
}

export const createRandomWaveForm = (audioContext = mandatory(), complexity = 8) => {
	const i = Float32Array.from(times(Math.random, complexity))
	const r = Float32Array.from(times(Math.random, complexity))
	return audioContext.createPeriodicWave(r, i)
}

export const createNoiseBuffer = (audioContext = mandatory()) => {
	const bufferSize = audioContext.sampleRate
	const numChannels = 1
	const buffer = audioContext.createBuffer(numChannels, bufferSize, bufferSize)
	const o = buffer.getChannelData(0)
	for (let i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random()
	}
	return buffer
}

export const wrapNode = (audioNode = mandatory()) => ({
	getNode() {
		return audioNode
	},
	getInput() {
		return audioNode
	},
	connect({ getInput, connect }) {
		audioNode.connect(getInput())
		return { connect }
	},
})

