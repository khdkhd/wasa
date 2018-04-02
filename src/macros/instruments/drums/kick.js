import { WaveForms } from '@/constants/wave-forms'
import { mandatory } from '@/common/utils'

export const Kick = (audioContext = mandatory('audioContext')) => {
	const output = audioContext.createGain()
	const oscGain = audioContext.createGain()
	const comp = audioContext.createDynamicsCompressor()

	comp.threshold.value = 0.0 // this is the pitfall, leave some headroom
	comp.knee.value = 0.0 // brute force
	comp.ratio.value = 20.0 // max compression
	comp.attack.value = 0.05 // 5ms attack
	comp.release.value = 0.050 // 50ms release

	const finalFrequency = 0.01

	let initialFrequency = 150
	let duration = 0.15
	let isMuted = false
	let outputGainValue = 1E-10

	const oscs = {}

	/* routing */
	oscGain.connect(comp).connect(output)

	output.gain.value = outputGainValue
	oscGain.gain.value = 1E-10

	function resetScheduledOscs(time = audioContext.currentTime) {
		Object.entries(oscs)
			.forEach(([t, o]) => {
				if (Number(t) <= time) {
					o.frequency.exponentialRampToValueAtTime(finalFrequency, time)
					o.stop(time)
					delete oscs[t]
				}
			})
	}

	function toKey(time) {
		return Number(time).toFixed(12)
	}

	function store(osc, time) {
		const key = toKey(time + duration)
		oscs[key] = osc
	}

	function pop(time) {
		const key = toKey(time)
		delete oscs[key]
	}

	function remap(offset) {
		Object.entries(oscs)
			.forEach(([t, o]) => {
				store(o, t + offset)
				delete oscs[t]
			})
	}

	return {
		noteOn(velocity = 0.8, time = audioContext.currentTime) {
			resetScheduledOscs(time)
			oscGain.gain.cancelScheduledValues(time - 0.009)
			oscGain.gain.setValueAtTime(0, time - 0.008)
			const osc = audioContext.createOscillator()
			osc.type = WaveForms.SINE
			osc.connect(oscGain)
			osc.start(time)
			osc.frequency.setTargetAtTime(initialFrequency, time, 0.007)
			oscGain.gain.linearRampToValueAtTime(velocity, time)
			store(osc, time)
		},
		noteOff(time = audioContext.currentTime + duration) {
			Object.values(oscs)
				.forEach((osc) => {
					osc.frequency.exponentialRampToValueAtTime(finalFrequency, time)
					osc.stop(time)
					pop(time)
				})
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time)
		},
		connect({ connect, getInput }) {
			output.connect(getInput())
			return { connect }
		},
		setFrequencyValue(value) {
			initialFrequency = value
			return this
		},
		getFrequencyValue() {
			return initialFrequency
		},
		setDurationValue(value) {
			remap(duration - value)
			duration = value
			return this
		},
		getDurationValue() {
			return duration
		},
		setOutputGainValue(value) {
			outputGainValue = value
			if (!isMuted) {
				output.gain.value = outputGainValue
			}
			return this
		},
		getOutputGainValue() {
			return outputGainValue
		},
		mute() {
			isMuted = true
			output.gain.value = 1E-10
		},
		unMute() {
			output.gain.value = outputGainValue
			isMuted = false
		},
	}
}
