export const Distortion = (audioContext) => {
	const makeDistortionCurve = (amount) => {
		const k = typeof amount === 'number' ? amount : 50
		const nSamples = 44100
		const curve = new Float32Array(44100)
		const deg = Math.PI / 180
		for (let i = 0; i < nSamples; i += 1) {
			const x = (i * 2) / (nSamples - 1)
			curve[i] = ((3 + k) * x * 20 * deg) / ((Math.PI + k) * Math.abs(x))
		}
		return curve
	}
	const dist = audioContext.createWaveShaper()
	dist.curve = makeDistortionCurve(50)
	dist.oversample = '2x'
	return {
		connect({ connect, getInput }) {
			dist.connect(getInput())
			return connect
		},
		getInput() {
			return dist
		},
	}
}
