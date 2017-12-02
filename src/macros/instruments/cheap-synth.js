import { NodeOutputMixer } from '../routing/node-output-mixer'
import { midiToFrequency } from '../../core/note'
import { Delay } from '../effects/delay'
import { RingModulator } from '../effects/ring-modulator'

export const CheapSynth = (audioContext) => {
	const filter = audioContext.createBiquadFilter()
	const oscMix = NodeOutputMixer(audioContext)
	const output = audioContext.createGain()
	const subOscGain = audioContext.createGain()
	const mainOscGain = audioContext.createGain()
	const delay = Delay(audioContext)
	const chorus = RingModulator(audioContext)
	oscMix.setLeftInput(subOscGain)
	oscMix.setRightInput(mainOscGain)
	filter.frequency.value = 800
	oscMix.connect(chorus)
		.connect(delay)
		.connect({ getInput: () => output })
	delay.setTempoValue(120)
		.setDivisionValue(4)
		.setFrequencyValue(400)
		.setFeedbackValue(0.4)
	let mainOsc
	let subOsc

	output.gain.value = 0.1

	return {
		noteOn(time = audioContext.currentTime, velocity = 1, midiValue) {
			mainOsc = audioContext.createOscillator()
			mainOsc.type = 'square'
			mainOsc.frequency.setValueAtTime(midiToFrequency(440, midiValue), time)
			mainOscGain.gain.setValueAtTime(0.5 * velocity, time)
			subOsc = audioContext.createOscillator()
			subOsc.type = 'triangle'
			subOsc.frequency.setValueAtTime(midiToFrequency(440, midiValue - 7), time)
			subOscGain.gain.setValueAtTime(0.5 * velocity, time)
			mainOsc.connect(mainOscGain)
			subOsc.connect(subOscGain)
			mainOsc.start(time)
			subOsc.start(time)
			chorus.noteOn(time)
		},
		noteOff(time = audioContext.currentTime) {
			mainOsc.frequency.cancelScheduledValues(time)
			subOsc.frequency.cancelScheduledValues(time)
			subOscGain.gain.cancelScheduledValues(time)
			mainOscGain.gain.cancelScheduledValues(time)
			mainOsc.stop(time)
			subOsc.stop(time)
			chorus.noteOff(time)
		},
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		getDelay() {
			return delay
		},
	}
}
