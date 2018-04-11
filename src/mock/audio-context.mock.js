import WorkerTimer from 'worker-timer'
import { identity } from 'ramda'

export const AudioContextMock = (sandbox) => {
	const oscillators = []
	const gains = []

	let currentTime = 0

	const sampleRate = 44000

	WorkerTimer.setInterval(() => {
		currentTime += 1
	}, 1000)

	const AudioNode = {
		disconnect: sandbox.spy(),
		connect() {},
	}

	AudioNode.connect = sandbox.stub(AudioNode, 'connect').callsFake(identity)

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

	const createBuffer = () => {
		const audioBuffer = {
			length: sampleRate,
			sampleRate,
			getChannelData() {},
		}
		const createFloat32Array = () => new Float32Array(sampleRate)
		audioBuffer.getChannelData = sandbox.stub(audioBuffer, 'getChannelData').callsFake(createFloat32Array)
		return audioBuffer
	}

	const createPeriodicWave = () => ({})

	const createChannelMerger = () => ({
		...AudioNode,
	})

	const createChannelSplitter = () => ({
		...AudioNode,
	})

	const createDynamicsCompressor = () => ({
		...AudioNode,
		threshold: { ...AudioParam },
		knee: { ...AudioParam },
		ratio: { ...AudioParam },
		attack: { ...AudioParam },
		release: { ...AudioParam },
	})

	const createBiquadFilter = () => ({
		...AudioNode,
		frequency: { ...AudioParam },
		gain: { ...AudioParam },
		Q: { ...AudioParam },
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
		createDynamicsCompressor,
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
			sampleRate,
		})
}
