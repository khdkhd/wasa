import test from 'ava'
import sinon from 'sinon'
import * as utils from './utils'
import { AudioContextMock } from '../mock/audio-context.mock'

test('mandatory function enforce mandatory parameters requirements', (t) => {
	// eslint-disable-next-line no-unused-vars
	const functionWithMandatoryParameter = (param = utils.mandatory()) => {}
	t.throws(functionWithMandatoryParameter)
})

test('randomWaveForm calls createPeriodicWave on audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	utils.createRandomWaveForm(audioContext)
	t.true(audioContext.createPeriodicWave.called)
})

test('createNoiseBuffer calls createBuffer on audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	utils.createNoiseBuffer(audioContext)
	t.true(audioContext.createBuffer.called)
})

test('wrapNode returns object with wasa connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const wasaNode = utils.wrapNode(audioContext.createOscillator())
	wasaNode.connect(wasaNode)
	t.pass()
})

test('wrapNode returns object with wasa getinput method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const wasaNode = utils.wrapNode(audioContext.createOscillator())
	wasaNode.getInput()
	t.pass()
})

test('wrapNode returns object with wasa getNode method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const wasaNode = utils.wrapNode(audioContext.createOscillator())
	wasaNode.getNode()
	t.pass()
})
