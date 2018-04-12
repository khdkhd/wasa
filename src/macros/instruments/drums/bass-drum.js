import { WaveForms } from '../../../constants/wave-forms'
import { mandatory } from '../../../common/utils'

export const createBassDrum = (audioContext = mandatory('audioContext')) => {
	const output = audioContext.createGain()
	const oscGain = audioContext.createGain()
	const comp = audioContext.createDynamicsCompressor()
	const filter = audioContext.createBiquadFilter()
	const osc = audioContext.createOscillator()

	filter.frequency.value = 2500

	comp.threshold.value = 0.0 // this is the pitfall, leave some headroom
	comp.knee.value = 0.0 // brute force
	comp.ratio.value = 20.0 // max compression
	comp.attack.value = 0.05 // 5ms attack
	comp.release.value = 0.050 // 50ms release

	const finalFrequency = 0.01

	let initialFrequency = 200
	let duration = 0.15
	let isMuted = false
	let outputGainValue = 1E-10

	/* routing */
	osc.connect(oscGain).connect(filter).connect(comp).connect(output)

	output.gain.value = outputGainValue
	oscGain.gain.value = 1E-10
	osc.type = WaveForms.SINE
	osc.start(audioContext.currentTime)

	return {
		noteOn(velocity = 0.8, time = audioContext.currentTime) {
			oscGain.gain.exponentialRampToValueAtTime(velocity, time)
			osc.frequency.exponentialRampToValueAtTime(initialFrequency, time)
			osc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration)
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + duration)
		},
		noteOff(time = audioContext.currentTime + duration) {
			oscGain.gain.cancelScheduledValues(time)
			osc.frequency.cancelScheduledValues(time)
			osc.frequency.exponentialRampToValueAtTime(finalFrequency, time)
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time)
		},
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		setFrequencyValue(value) {
			initialFrequency = value
			return this
		},
		getFrequencyValue() {
			return initialFrequency
		},
		setDurationValue(value) {
			duration = value
			return this
		},
		getDurationValue() {
			return duration
		},
		setOutputGainValue(value) {
			outputGainValue = value
			if (!isMuted) {
				output.gain.value = outputGainValue
			}
			return this
		},
		getOutputGainValue() {
			return outputGainValue
		},
		mute() {
			isMuted = true
			output.gain.value = 1E-10
		},
		unMute() {
			output.gain.value = outputGainValue
			isMuted = false
		},
	}
}
