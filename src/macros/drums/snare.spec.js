import test from 'ava'
import sinon from 'sinon'
import { AudioContextMock } from '../../mock/audio-context.mock'
import { Snare } from './snare'

test('Snare factory returns object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	t.true(typeof snare === 'object')
})

test('Snare factory returns object with a duration getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.setDurationValue(1)
	t.is(1, snare.getDurationValue())
})

test('Snare factory returns object with a frequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.setFrequencyValue(440)
	t.is(440, snare.getFrequencyValue())
})


test('Snare factory returns object with an outputGain getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.setOutputGainValue(0.25)
	t.is(0.25, snare.getOutputGainValue())
})

test('Snare factory returns object with a filter value getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.setNoiseFilterValue(0.25)
	t.is(0.25, snare.getNoiseFilterValue())
})

test('Snare factory returns object with a osc mix value value getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.setOscMixValue(0.25)
	t.is(0.25, snare.getOscMixValue())
})

test('Snare connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	const nextInChain = {
		getInput() {
			return audioContext.createGain()
		},
		connect() {
		},
	}
	t.true(typeof snare.connect(nextInChain).connect === 'function')
})

test('Snare noteOn method call create oscillators in the audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.noteOn()
	t.true(audioContext.createOscillator.called)
})

test('Snare noteOn method call create oscillators in the audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.noteOn()
	t.true(audioContext.createOscillator.called)
})

test('Snare noteOff method call stop on oscillator nodes', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.noteOn()
	snare.noteOff()
	audioContext.getOscillatorNodes()
		.forEach((osc) => {
			t.true(osc.stop.called)
		})
})

test('Snare noteOff method cancel scheduled values on osc gain nodes', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.noteOn()
	snare.noteOff()
	let nG = 0 // number of gain nodes
	audioContext.getGainNodes()
		.forEach((gain) => {
			nG += gain.gain.cancelScheduledValues.called ? 1 : 0
		})
	t.is(audioContext.getGainNodes().length - 4, nG)
})
