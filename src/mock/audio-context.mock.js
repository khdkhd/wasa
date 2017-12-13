import WorkerTimer from 'worker-timer'

export const AudioContextMock = (sandbox) => {
	const oscillators = []
	const gains = []

	let currentTime = 0

	WorkerTimer.setInterval(() => {
		currentTime += 1
	}, 1000)

	const AudioNode = {
		connect: sandbox.spy(),
		disconnect: sandbox.spy(),
	}

	const AudioParam = {
		setValueAtTime: sandbox.spy(),
		cancelScheduledValues: sandbox.spy(),
		linearRampToValueAtTime: sandbox.spy(),
		exponentialRampToValueAtTime: sandbox.spy(),
		value: undefined,
	}

	const createGain = () => ({
		...AudioNode,
		gain: { ...AudioParam },
	})

	const createOscillator = () => ({
		...AudioNode,
		frequency: { ...AudioParam },
		start: sandbox.spy(),
		stop: sandbox.spy(),
		setPeriodicWave: sandbox.spy(),
	})

	const createBufferSource = () => ({
		...AudioNode,
		start: sandbox.spy(),
		stop: sandbox.spy(),
	})

	const createBuffer = () => ({
		getChannelData: sandbox.spy(),
	})

	const createPeriodicWave = () => ({})

	const createChannelMerger = () => ({
		...AudioNode,
	})

	const createChannelSplitter = () => ({
		...AudioNode,
	})

	const createBiquadFilter = () => ({
		frequency: { ...AudioParam },
		gain: { ...AudioParam },
		Q: { ...AudioParam },
		connect: sandbox.spy(),
	})

	const createDelay = () => ({
		...AudioNode,
		delayTime: { ...AudioParam },
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
		createChannelSplitter,
		createBufferSource,
		createBuffer,
		createPeriodicWave,
		createDelay,
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
