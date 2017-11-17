import { AudioNodeMixer } from './audio-node-mixer'
// @flow
export const Snare = (audioContext: Object): Object => {
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
	const nodeMixer = AudioNodeMixer(audioContext)

	let osc
	let noise
	let duration = 0.25
	let frequency = 100
	let oscMixValue = 0.5
	let noiseFilterValue = 1000

	const real = new Float32Array([0, 0, 1, 0, 1])
	const imag = new Float32Array(real.length)
	const customWave = audioContext.createPeriodicWave(real, imag)

	noiseFilter.type = 'lowpass'
	noiseFilter.frequency.value = noiseFilterValue
	noiseFilter.connect(noiseGain)
	nodeMixer.setLeftInput(noiseGain)
	nodeMixer.setRightInput(oscGain)
	nodeMixer.connect({ input: output })

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			osc = audioContext.createOscillator()
			osc.setPeriodicWave(customWave)
			osc.connect(oscGain)
			noise = audioContext.createBufferSource()
			noise.buffer = buffer
			noise.connect(noiseFilter)
			noiseGain.gain.setValueAtTime(0.5 * velocity, time)
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time + duration)
			noise.start(time)
			osc.frequency.setValueAtTime(frequency, time)
			oscGain.gain.setValueAtTime(0.5 * velocity, time)
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + 0.15)
			osc.start(time)
			osc.stop(time + 0.15)
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
		connect({ connect, input }) {
			output.connect(input)
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
			nodeMixer.fade(oscMixValue - 0.5)
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
