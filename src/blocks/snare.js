import { CrossFader } from './cross-fader'

export const Snare = (audioContext) => {
	const bufferSize = audioContext.sampleRate
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
	const o = buffer.getChannelData(0)
	for (let i = 0; i < bufferSize; i += 1) {
		o[i] = (Math.random() * 2) - 1
	}

	const output = audioContext.createGain()
	const noiseGain = audioContext.createGain()
	const filter = audioContext.createBiquadFilter()
	const oscGain = audioContext.createGain()
	const crossFader = CrossFader(audioContext)

	filter.type = 'highpass'
	filter.frequency.value = 1000
	filter.connect(noiseGain)
	crossFader.setLeftInput(noiseGain)
	crossFader.setRightInput(oscGain)
	crossFader.connect({ input: output })

	let osc
	let noise
	let duration = 0.25
	let frequency = 80

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			osc = audioContext.createOscillator()
			osc.type = 'triangle'
			osc.connect(oscGain)
			noise = audioContext.createBufferSource()
			noise.buffer = buffer
			noise.connect(filter)
			noiseGain.gain.setValueAtTime(1 * velocity, time)
			noiseGain.gain.exponentialRampToValueAtTime(0.01, time + (duration - 0.1))
			noise.start(time)
			osc.frequency.setValueAtTime(frequency, time)
			oscGain.gain.setValueAtTime(1 * velocity, time)
			oscGain.gain.exponentialRampToValueAtTime(0.01, time + (duration - 0.1))
			osc.start(time)
			osc.stop(time + duration)
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
		setDuration(value) {
			duration = value
			return this
		},
		getDuration() {
			return duration
		},
		setFrequency(value) {
			frequency = value
			return this
		},
		getFrequency() {
			return frequency
		},
		setOutputGain(value) {
			output.gain.value = value
		},
	}
}
