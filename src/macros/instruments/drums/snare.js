import { NodeOutputMixer } from '../../routing/node-output-mixer'
import { FilterTypes } from '../../../constants/filter-types'

export const Snare = (audioContext) => {
	const bufferSize = 2 * audioContext.sampleRate
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
	const o = noiseBuffer.getChannelData(0)
	for (let i = 0; i < bufferSize; i += 1) {
		o[i] = (Math.random() * 2) - 1
	}

	const output = audioContext.createGain()
	const noiseGain = audioContext.createGain()
	const noiseFilter = audioContext.createBiquadFilter()
	const oscGain = audioContext.createGain()
	const nodeMixer = NodeOutputMixer(audioContext)
	const osc = audioContext.createOscillator()
	const noise = audioContext.createBufferSource()

	let duration = 0.25
	let frequency = 80
	let oscMixValue = 0.2
	let noiseFilterValue = 4000

	const real = new Float32Array([0, 0, 1, 0, 1])
	const imaginary = new Float32Array([0, 1, 0, 0, 0])
	const customWave = audioContext.createPeriodicWave(real, imaginary)

	noiseFilter.type = FilterTypes.BAND_PASS
	noiseFilter.frequency.value = noiseFilterValue
	osc.frequency.value = frequency
	oscGain.gain.value = 1E-10
	noiseGain.gain.value = 1E-10
	noise.buffer = noiseBuffer
	noise.loop = true

	osc.setPeriodicWave(customWave)

	osc.connect(oscGain)
	noise.connect(noiseFilter).connect(noiseGain)
	nodeMixer.setLeftInput(noiseGain)
	nodeMixer.setRightInput(noiseGain)
	nodeMixer.connect({ getInput: () => output })

	osc.start(audioContext.currentTime)
	noise.start(audioContext.currentTime)

	return {
		noteOn(velocity = 1, time = audioContext.currentTime) {
			osc.frequency.setValueAtTime(frequency, time)
			oscGain.gain.setValueAtTime(velocity, time)
			noiseGain.gain.setValueAtTime(velocity, time)
			osc.frequency.exponentialRampToValueAtTime(frequency / 2, time + 0.15)
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + 0.15)
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time + duration)
		},
		noteOff(time = audioContext.currentTime + duration) {
			osc.frequency.cancelScheduledValues(time)
			oscGain.gain.cancelScheduledValues(time)
			noiseGain.gain.cancelScheduledValues(time)
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time)
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time)
		},
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		setDurationValue(value) {
			duration = value
			return this
		},
		getDurationValue() {
			return duration
		},
		setFrequencyValue(value) {
			frequency = value
			return this
		},
		getFrequencyValue() {
			return frequency
		},
		setOscMixValue(value) {
			oscMixValue = value
			nodeMixer.setFadeValue(oscMixValue)
			return this
		},
		getOscMixValue() {
			return oscMixValue
		},
		setNoiseFilterValue(value) {
			noiseFilterValue = value
			noiseFilter.frequency.value = value
			return this
		},
		getNoiseFilterValue() {
			return noiseFilterValue
		},
		setOutputGainValue(value) {
			output.gain.value = value
			return this
		},
		getOutputGainValue() {
			return output.gain.value
		},
	}
}
