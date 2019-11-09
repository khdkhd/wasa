/**
 * sequencer module exports a factory function creating a sequencer tied to an AudioContext
 * @module sequencer
 */
import { mandatory } from '../common/utils';


/**
 * @function
 * @param audioContext
 * @returns {Sequencer}
 */
export function createSequencer(audioContext = mandatory()) {
    /* time values */
	let ticksPerQuarterNote = 4;
	let startTime = 0;
	let nextTickTime = 0;
	let tick = 0;
    /* state change callbacks */
	const onTick = [];
	const onStop = [];
	const onStart = [];
	const onLoop = [];
    /* state */
	let stop = true;
	let loop = true;
	let tempo = 130;
	let length = 16;

	let timer;

    /**
     * Schedule is called every time a new tick occurs
     * @param {Array} ops - on tick callbacks functions
     */
	const schedule = (onTickOps = []) => {
		const currentTime = (audioContext.currentTime - startTime);
		if (!stop && currentTime >= nextTickTime) {
			tick += 1;
			nextTickTime = currentTime + (60 / (tempo * ticksPerQuarterNote));
			onTickOps.forEach(op => op(tick, tempo, ticksPerQuarterNote, nextTickTime));
			if (loop && tick === length) {
				tick = 0;
				onLoop.forEach(op => op());
			}
		}
	};

	const play = () => {
		timer = setInterval(() => {
			schedule(onTick);
		}, 1);
	};

	return {
		start() {
			onStart.forEach(op => op());
			startTime = audioContext.currentTime;
			stop = false;
			play();
			return this;
		},
		stop() {
			clearInterval(timer);
			stop = true;
			nextTickTime = 0;
			tick = 0;
			onStop.forEach(op => op());
			return this;
		},
		isStarted() {
			return !stop;
		},
		setLoopMode(value) {
			loop = value;
			return this;
		},
		getLoopMode() {
			return loop;
		},
		setLength(value) {
			length = value;
			return this;
		},
		getLength() {
			return length;
		},
		setDivision(value) {
			ticksPerQuarterNote = value;
			return this;
		},
		getDivision() {
			return ticksPerQuarterNote;
		},
		setTempo(value) {
			tempo = value;
			return this;
		},
		getTempo() {
			return tempo;
		},
		getTime() {
			return audioContext.currentTime - startTime;
		},
		onStart(op) {
			onStart.push(op);
			return this;
		},
		onStop(op) {
			onStop.push(op);
			return this;
		},
		onTick(op) {
			onTick.push(op);
			return this;
		},
		onLoop(op) {
			onLoop.push(op);
			return this;
		},
	};
}
