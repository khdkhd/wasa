import { NodeOutputMixer } from '../routing/node-output-mixer'

export const Snare = (audioContext) => {
	const bufferSize = audioContext.sampleRate
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
	const o = buffer.getChannelData(0)
	for (let i = 0; i < bufferSize; i += 1) {
		o[i] = (Math.random() * 2) - 1
	}

	const output = audioContext.createGain()
	const noiseGain = audioContext.createGain()
	const noiseFilter = audioContext.createBiquadFilter()
	const oscGain = audioContext.createGain()
	const nodeMixer = NodeOutputMixer(audioContext)

	let osc
	let noise
	let duration = 0.25
	let frequency = 80
	let oscMixValue = -0.2
	let noiseFilterValue = 1000

	const real = new Float32Array([0, 0, 1, 0, 1])
	const imaginary = new Float32Array([0, 1, 0, 0, 0])
	const customWave = audioContext.createPeriodicWave(real, imaginary)

	noiseFilter.type = 'lowpass'
	noiseFilter.frequency.value = noiseFilterValue
	noiseFilter.connect(noiseGain)
	nodeMixer.setLeftInput(oscGain)
	nodeMixer.setRightInput(noiseGain)
	nodeMixer.connect({ getInput: () => output })

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			osc = audioContext.createOscillator()
			osc.setPeriodicWave(customWave)
			osc.connect(oscGain)
			noise = audioContext.createBufferSource()
			noise.buffer = buffer
			noise.connect(noiseFilter)
			osc.frequency.setValueAtTime(frequency, time)
			osc.frequency.exponentialRampToValueAtTime(frequency / 2, time + 0.15)
			oscGain.gain.setValueAtTime(0.5 * velocity, time)
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + 0.15)
			osc.start(time)
			osc.stop(time + 0.15)
			noiseGain.gain.setValueAtTime(0.5 * velocity, time)
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time + duration)
			noise.start(time)
			noise.stop(time + duration)
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (osc) {
				osc.frequency.cancelScheduledValues(time)
				oscGain.gain.cancelScheduledValues(time)
				noiseGain.gain.cancelScheduledValues(time)
				osc.stop(time)
				noise.stop(time)
			}
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
