import * as R from 'ramda'
import { createBassDrum } from './drums/bass-drum'
import { createSnare } from '../../macros/instruments/drums/snare'
import { createHat } from '../../macros/instruments/drums/hat'
import { mandatory, wrapNode } from '../../common/utils'

export const GMDrumSynth = (audioContext = mandatory('audioContext')) => {
	const bd = createBassDrum(audioContext).setDurationValue(0.1)
	const sn = createSnare(audioContext).setDurationValue(0.5)
	const hi = createHat(audioContext).setDurationValue(0.1)
	const hat = createHat(audioContext).setDurationValue(0.5)

	const output = wrapNode(audioContext.createGain())

	bd.connect(output)
	sn.connect(output)
	hi.connect(output)
	hat.connect(output)

	return {
		noteOn(midiValue, velocity, time = audioContext.currentTime) {
			R.cond([
				[
					R.equals(35),
					() => bd.noteOn(time),
				],
				[
					R.equals(36),
					() => bd.noteOn(time),
				],
				[
					R.equals(38),
					() => sn.noteOn(time),
				],
				[
					R.equals(40),
					() => sn.noteOn(time),
				],
				[
					R.equals(42),
					() => hi.noteOn(time),
				],
				[
					R.equals(46),
					() => hat.noteOn(time),
				],
				[
					R.T,
					() => {},
				],
			])(midiValue)
		},
		noteOff(midiValue, time = audioContext.currentTime) {
			R.cond([
				[
					R.equals(36),
					() => bd.noteOff(time),
				],
				[
					R.equals(38),
					() => sn.noteOff(time),
				],
				[
					R.T,
					() => {},
				],
			])(midiValue)
		},
		connect({ connect, getInput }) {
			output.connect({ getInput })
			return { connect }
		},
	}
}
