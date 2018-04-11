import test from 'ava'
import sinon from 'sinon'
import { Hat } from './hat'
import { AudioContextMock } from '../../../mock/audio-context.mock'

test('Hat factory returns object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const hat = Hat(audioContext)
	t.true(typeof hat === 'object')
})

test('Hat connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const hat = Hat(audioContext)
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	}
	t.true(typeof hat.connect(nextInChain).connect === 'function')
})

test('Hat factory returns object with a duration getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const hat = Hat(audioContext)
	hat.setDurationValue(1)
	t.is(1, hat.getDurationValue())
})

test('Hat noteOn method call create oscillators in the audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const hat = Hat(audioContext)
	hat.noteOn()
	t.true(audioContext.createOscillator.called)
})

test('Hat noteOff method cancel scheduled values on gain nodes', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const hat = Hat(audioContext)
	hat.noteOn()
	hat.noteOff()
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called)
	t.truthy(modifiedGain)
})
