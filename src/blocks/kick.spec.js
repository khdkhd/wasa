import test from 'ava'
import sinon from 'sinon'
import { Kick } from './kick'
import { AudioContextMock } from '../mock/audio-context.mock'

test('Kick factory returns object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	t.true(typeof kick === 'object')
})

test('Kick factory returns object with a duration getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.setDuration(1)
	t.is(1, kick.getDuration())
})

test('Kick factory returns object with a frequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.setFrequency(440)
	t.is(440, kick.getFrequency())
})

test('Kick factory returns object with a finalFrequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.setFinalFrequency(220)
	t.is(220, kick.getFinalFrequency())
})

test('Kick connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	const nextInChain = {
		input: audioContext.createGain(),
		connect() {},
	}
	t.true(typeof kick.connect(nextInChain).connect === 'function')
})

test('Kick noteOn method call create oscillators in the audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.noteOn()
	t.true(audioContext.createOscillator.called)
})

test('Kick noteOff method call stop on oscillator nodes', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.noteOn()
	kick.noteOff()
	audioContext.getOscillatorNodes()
		.forEach((osc) => {
			t.true(osc.stop.called)
		})
})

test('Kick noteOff method cancel scheduled values on osc gain nodes', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const kick = Kick(audioContext)
	kick.noteOn()
	kick.noteOff()
	let nG = 0 // number of gain nodes
	audioContext.getGainNodes()
		.forEach((gain) => {
			nG += gain.gain.cancelScheduledValues.called ? 1 : 0
		})
	t.is(audioContext.getGainNodes().length - 1, nG)
})