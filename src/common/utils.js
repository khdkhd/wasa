import { times } from 'ramda';
import { WaveForms } from '../constants/wave-forms';

export function mandatory(parameterName = '') {
	throw new Error(`Missing mandatory parameter ${parameterName}`);
}

export function createRandomWaveForm(audioContext = mandatory(), complexity = 8) {
	const i = Float32Array.from(times(Math.random, complexity));
	const r = Float32Array.from(times(Math.random, complexity));
	return audioContext.createPeriodicWave(r, i);
}

export function createNoiseBuffer(audioContext = mandatory()) {
	const bufferSize = audioContext.sampleRate;
	const numChannels = 1;
	const buffer = audioContext.createBuffer(numChannels, bufferSize, bufferSize);
	const o = buffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random();
	}
	return buffer;
}

export function createGenerator(audioContext, waveForm) {
	if (waveForm === WaveForms.WHITE_NOISE) {
		return createNoiseBuffer(audioContext);
	}
	const osc = audioContext.createOscillator();
	if (waveForm === WaveForms.RANDOM) {
		osc.setPeriodicWave(createRandomWaveForm(audioContext));
		return osc;
	}
	osc.type = waveForm;
	return osc;
}

export function wrapNode(audioNode = mandatory()) {
	return {
		getNode() {
			return audioNode;
		},
		getInput() {
			return audioNode;
		},
		connect({ getInput, connect }) {
			audioNode.connect(getInput());
			return { connect };
		},
	};
}

