/**
 * sequencer module exports a factory function creating a sequencer tied to an AudioContext
 * @module sequencer
 */
import WorkerTimer from 'worker-timer'
import { mandatory } from '../common/utils'

/**
 * @function
 * @param audioContext
 * @returns {*}
 * @constructor
 */
export const Sequencer = (audioContext = mandatory()) => {
	/* time values */
	let ticksPerQuarterNote = 4
	let startTime = 0
	let nextTickTime = 0
	let tick = 0
	/* state change callbacks */
	let onTick = () => {}
	let onStop = () => {}
	let onStart = () => {}
	let onLoop = () => {}
	/* state */
	let stop = true
	let loop = true
	let tempo = 130
	let length = 16

	let timer

	/**
	 * Schedule is called every time a new tick occurs
	 * @param {function} op - on tick callback function
	 */
	const schedule = (op) => {
		const currentTime = (audioContext.currentTime - startTime)
		if (!stop && currentTime >= nextTickTime) {
			tick += 1
			nextTickTime = currentTime + (60 / (tempo * ticksPerQuarterNote))
			op(tick, tempo, ticksPerQuarterNote, nextTickTime)
			if (loop && tick === length) {
				tick = 0
				onLoop()
			}
		}
	}

	const play = () => {
		timer = WorkerTimer.setInterval(() => {
			schedule(onTick)
		}, 0)
	}

	return {
		start() {
			onStart()
			startTime = audioContext.currentTime
			stop = false
			play()
			return this
		},
		stop() {
			WorkerTimer.clearInterval(timer)
			stop = true
			nextTickTime = 0
			tick = 0
			onStop()
			return this
		},
		isStarted() {
			return !stop
		},
		setLoopMode(value) {
			loop = value
			return this
		},
		getLoopMode() {
			return loop
		},
		setLength(value) {
			length = value
			return this
		},
		getLength() {
			return length
		},
		setDivision(value) {
			ticksPerQuarterNote = value
			return this
		},
		getDivision() {
			return ticksPerQuarterNote
		},
		setTempo(value) {
			tempo = value
			return this
		},
		getTempo() {
			return tempo
		},
		getTime() {
			return audioContext.currentTime - startTime
		},
		onStart(op) {
			onStart = op
			return this
		},
		onStop(op) {
			onStop = op
			return this
		},
		onTick(op) {
			onTick = op
			return this
		},
		onLoop(op) {
			onLoop = op
			return this
		},
	}
}
