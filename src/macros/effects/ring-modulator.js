import { clamp } from 'ramda'
import { scale } from '../../common/range'

export const RingModulator = (audioContext) => {
	/* web audio nodes */
	const input = audioContext.createGain()
	const attenuator = audioContext.createGain()
	const channelSplitter = audioContext.createChannelSplitter(2)
	const stereoLeftDelay = audioContext.createDelay()
	const stereoRightDelay = audioContext.createDelay()
	const lfoGain = audioContext.createGain()
	const feedbackLeftToRight = audioContext.createGain()
	const feedbackRightToLeft = audioContext.createGain()
	const feedbackFilter = audioContext.createBiquadFilter()
	const channelMerger = audioContext.createChannelMerger(2)
	const output = audioContext.createGain()
	const real = new Float32Array([0, 0, 1, 0, 1])
	const imaginary = new Float32Array([0, 1, 0, 0, 0])
	const lfoWave = audioContext.createPeriodicWave(real, imaginary)

	/* parameters values */
	let delayTimeValue = 0.01
	let releaseTimeValue = 0.1
	let outputGainValue = 0.9
	let frequencyValue = 18000
	let lfoGainValue = 1
	let lfo

	/* constant values (caution with your speakers !) */
	const MAX_LFO_HZ_FREQUENCY = 18000
	const MAX_DELAY_TIME_IN_SECONDS = 1
	const MAX_LFO_GAIN_IN_DB = 1

	/* routing */
	input.connect(attenuator)
	attenuator.connect(output)
	attenuator.connect(channelSplitter)
	channelSplitter.connect(stereoLeftDelay, 0)
	channelSplitter.connect(stereoRightDelay, 1)
	stereoLeftDelay.connect(feedbackLeftToRight)
	stereoRightDelay.connect(feedbackRightToLeft)
	feedbackLeftToRight.connect(feedbackFilter)
	feedbackRightToLeft.connect(feedbackFilter)
	feedbackFilter.connect(stereoLeftDelay)
	feedbackFilter.connect(stereoRightDelay)
	feedbackRightToLeft.connect(stereoLeftDelay)
	stereoLeftDelay.connect(channelMerger, 0, 0)
	stereoRightDelay.connect(channelMerger, 0, 1)
	lfoGain.connect(stereoRightDelay.delayTime)
	lfoGain.connect(stereoLeftDelay.delayTime)
	lfoGain.connect(feedbackFilter.frequency)
	channelMerger.connect(output)

	/* setting default values */
	feedbackRightToLeft.gain.value = 0.2
	feedbackLeftToRight.gain.value = 0.2
	feedbackFilter.type = 'bandpass'
	feedbackFilter.Q.value = 100
	feedbackFilter.gain.value = 0.5
	lfoGain.gain.value = lfoGainValue
	stereoLeftDelay.delayTime.value = delayTimeValue
	stereoRightDelay.delayTime.value = delayTimeValue

	attenuator.gain.value = 0.6
	output.gain.value = 1E-100
	return {
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		getInput() {
			return input
		},
		noteOn(time = audioContext.currentTime) {
			lfo = audioContext.createOscillator()
			lfo.connect(lfoGain)
			lfo.frequency.value = 278
			lfo.setPeriodicWave(lfoWave)
			lfo.start(time)
			output.gain.linearRampToValueAtTime(outputGainValue, time)
		},
		noteOff(time = audioContext.currentTime) {
			output.gain.linearRampToValueAtTime(0, time + releaseTimeValue)
			lfo.stop(time + releaseTimeValue)
		},
		setRingModulationValue(value) {
			const normalizedValue = clamp(0, 1, value)
			frequencyValue = MAX_LFO_HZ_FREQUENCY * normalizedValue
			return this
		},
		getRingModulationValue() {
			return scale({ min: 0, max: MAX_LFO_HZ_FREQUENCY }, frequencyValue)
		},
		setDelayTimeValue(value) {
			const normalizedValue = clamp(0, 1, value)
			delayTimeValue = MAX_DELAY_TIME_IN_SECONDS * normalizedValue
			return this
		},
		getDelayTimeValue() {
			return scale({ min: 0, max: MAX_DELAY_TIME_IN_SECONDS }, delayTimeValue)
		},
		setReleaseTimeValue(value) {
			releaseTimeValue = value
			return this
		},
		getReleaseTimeValue() {
			return releaseTimeValue
		},
		setLfoGainValue(value) {
			const normalizedValue = clamp(0, 1, value)
			lfoGainValue = MAX_LFO_GAIN_IN_DB * normalizedValue
			return this
		},
		getLfoGainValue() {
			return scale({ min: 0, max: MAX_LFO_GAIN_IN_DB }, lfoGainValue)
		},
		setOutputGainValue(value) {
			outputGainValue = value
			return this
		},
		getOutputGainValue() {
			return outputGainValue
		},
	}
}
