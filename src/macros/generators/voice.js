import { WaveForms } from '../../constants/wave-forms'
import { frequencyToMidi, midiToFrequency } from '../../core/note'
import { mandatory, createRandomWaveForm } from '../../common/utils'

export const createVoice = (audioContext = mandatory('AudioContext')) => {
	const setWaveForm = (waveForm, osc) => {
		if (waveForm === WaveForms.RANDOM) {
			osc.setPeriodicWave(createRandomWaveForm(audioContext))
		} else { // eslint-disable-next-line no-param-reassign
			osc.type = waveForm
		}
	}
	const getFrequency = midiToFrequency(440)
	const osc = audioContext.createOscillator()
	let waveForm = WaveForms.TRIANGLE

	setWaveForm(waveForm, osc)

	const output = audioContext.createGain()


	return {
		...osc,
		...{
			noteOn(value, time = audioContext.currentTime) {
				const frequency = getFrequency(value)
				osc.frequency.value = frequency
				osc.connect(output)
				osc.start(time)
			},
			noteOff(time = audioContext.currentTime) {
				osc.stop(time)
			},
			pitch(multiplier = mandatory('multiplier')) {
				/* retrieve midi note value from actual frequency */
				const lastMidiValue = Math.round(frequencyToMidi(440, osc.frequency.value))
				/* pitch actual frequency */
				const newFrequencyValue = osc.frequency.value * multiplier
				/* get midi note value back from pitched frequency */
				const newMidiValue = Math.round(frequencyToMidi(440, newFrequencyValue))
				/* apply new frequency */
				osc.frequency.setValueAtTime(newFrequencyValue, audioContext.currentTime)
				return { lastMidiValue, newMidiValue }
			},
			connect({ getInput = mandatory('input'), connect }) {
				output.connect(getInput())
				return { connect }
			},
			getWaveForm() {
				return osc.type
			},
			setWaveForm(value = mandatory('waveForm')) {
				waveForm = value
				setWaveForm(waveForm, osc)
			},
			getWaveForms() {
				return Object.values(WaveForms)
			},
			get output() {
				return output
			},
		},
	}
}
