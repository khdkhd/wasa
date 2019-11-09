import * as R from 'ramda';

export function createDistortion(audioContext) {

	const makeDistortionCurve = (amount) => {
		const { sampleRate } = audioContext;
		const curve = new Float32Array(sampleRate);
		const deg = Math.PI / 180;
		R.times((i) => {
			const x = (i * 2) / (sampleRate - 1);
			const a = (3 + amount) * x * 20 * deg;
			const b = Math.PI + (amount * Math.abs(x));
			curve[i] = a / b;
		}, sampleRate);
		return curve;
	};

	const preGain = audioContext.createGain();
	const postGain = audioContext.createGain();
	const dist = audioContext.createWaveShaper();
	preGain.connect(dist).connect(postGain);
	dist.curve = makeDistortionCurve(1	);
	dist.oversample = '4x';
	preGain.gain.value = 50;
	postGain.gain.value = 0.8;
	return {
		connect({ connect, getInput }) {
			postGain.connect(getInput());
			return { connect };
		},
		getInput() {
			return preGain;
		},
		setCurveAmount(amount) {
			dist.curve = makeDistortionCurve(amount);
			return this;
		},
		setPreGainValue(value) {
			preGain.gain.value = value;
			return this;
		},
		getPreGainValue() {
			return preGain.gain.value;
		},
		setPostGainValue(value) {
			postGain.gain.value = value;
			return this;
		},
		getPostGainValue() {
			return postGain.gain.value;
		},
	};
}
