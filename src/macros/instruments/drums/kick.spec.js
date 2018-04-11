import test from 'ava'
import sinon from 'sinon'
import { Kick } from './kick'
import { AudioContextMock } from '../../../mock/audio-context.mock'

test('Kick factory returns object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	t.true(typeof kick === 'object')
})

test('Kick factory returns object with a duration getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.setDurationValue(1)
	t.is(1, kick.getDurationValue())
})

test('Kick factory returns object with a frequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.setFrequencyValue(440)
	t.is(440, kick.getFrequencyValue())
})

test('Kick factory returns object with an outputGain getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.setOutputGainValue(0.25)
	t.is(0.25, kick.getOutputGainValue())
})


test('Kick connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	}
	t.true(typeof kick.connect(nextInChain).connect === 'function')
})


test('Kick noteOn method call exponentialRampToValueAtTime on osc gain node', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.noteOn()
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called)
	t.truthy(modifiedGain)
})


test('Kick noteOff method call exponentialRampToValueAtTime on osc gain node', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.noteOn()
	kick.noteOff()
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called)
	t.truthy(modifiedGain)
})
