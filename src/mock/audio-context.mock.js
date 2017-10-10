import WorkerTimer from 'worker-timer'

export const AudioContextMock = (sandbox) => {
	const oscillators = []
	const gains = []

	let currentTime = 0

	WorkerTimer.setInterval(() => {
		currentTime += 1
	}, 1000)

	const AudioParam = () => ({
		setValueAtTime: sandbox.spy(),
		cancelScheduledValues: sandbox.spy(),
		linearRampToValueAtTime: sandbox.spy(),
		value: undefined,
	})

	const createGain = () => ({
		gain: AudioParam(),
		connect: sandbox.spy(),
	})

	const createOscillator = () => ({
		frequency: AudioParam(),
		connect: sandbox.spy(),
		start: sandbox.spy(),
	})

	const createChannelMerger = () => ({
		connect: sandbox.spy(),
	})

	const createBiquadFilter = () => ({
		frequency: AudioParam(),
		gain: AudioParam(),
		Q: AudioParam(),
		connect: sandbox.spy(),
	})

	const AudioContextMethods = {
		createOscillator() {
			const osc = createOscillator()
			oscillators.push(osc)
			return osc
		},
		createGain() {
			const gain = createGain()
			gains.push(gain)
			return gain
		},
		createBiquadFilter,
		createChannelMerger,
	}


	return Object.assign({},
		Object.keys(AudioContextMethods).reduce((a, k) => {
			const c = Object.create(null)
			c[k] = sandbox.spy(AudioContextMethods, k)
			return Object.assign({}, a, c)
		}, {}),
		{
			getOscillatorNodes() {
				return oscillators
			},
			getGainNodes() {
				return gains
			},
			currentTime,
		})
}

