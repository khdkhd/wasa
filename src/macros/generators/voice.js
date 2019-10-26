import { WaveForms } from '../../constants/wave-forms';
import { frequencyToMidi } from '../../core/note';
import { createRandomWaveForm, mandatory } from '../../common/utils';

export function createVoice(audioContext = mandatory('AudioContext')) {
	const setWaveForm = (waveForm, osc) => {
		if (waveForm === WaveForms.RANDOM) {
			osc.setPeriodicWave(createRandomWaveForm(audioContext));
		} else { // eslint-disable-next-line no-param-reassign
			osc.type = waveForm;
		}
	};
	const osc = audioContext.createOscillator();
	let waveForm = WaveForms.TRIANGLE;

	setWaveForm(waveForm, osc);

	const output = audioContext.createGain();
	osc.connect(output);
	osc.start(audioContext.currentTime);

	return Object.assign(osc, {
		pitch(multiplier = mandatory('multiplier')) {
			/* retrieve midi note value from actual frequency */
			const lastMidiValue = Math.round(frequencyToMidi(440, osc.frequency.value));
			/* pitch actual frequency */
			const newFrequencyValue = osc.frequency.value * multiplier;
			/* get midi note value back from pitched frequency */
			const newMidiValue = Math.round(frequencyToMidi(440, newFrequencyValue));
			/* apply new frequency */
			osc.frequency.setValueAtTime(newFrequencyValue, audioContext.currentTime);
			return { lastMidiValue, newMidiValue };
		},
		connect({ getInput = mandatory('input'), connect }) {
			output.connect(getInput());
			return { connect };
		},
		getWaveForm() {
			return osc.type;
		},
		setWaveForm(value = mandatory('waveForm')) {
			waveForm = value;
			setWaveForm(waveForm, osc);
			return this;
		},
		getWaveForms() {
			return Object.values(WaveForms);
		},
		getOutput() {
			return output;
		},
	});
}
