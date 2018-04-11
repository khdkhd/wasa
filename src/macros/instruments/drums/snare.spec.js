import test from 'ava'
import sinon from 'sinon'
import { AudioContextMock } from '../../../mock/audio-context.mock'
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

test('Snare noteOn method call exponentialRampToValueAtTime on osc gain node', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.noteOn()
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called)
	t.truthy(modifiedGain)
})


test('Snare noteOff method call exponentialRampToValueAtTime on osc gain node', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const snare = Snare(audioContext)
	snare.noteOn()
	snare.noteOff()
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called)
	t.truthy(modifiedGain)
})
