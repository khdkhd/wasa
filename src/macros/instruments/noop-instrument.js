export function NoopInstrument(audioContext) {
	const output = audioContext.createGain();

	return {
		noteOn() {

		},
		noteOff() {

		},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
	};
}
