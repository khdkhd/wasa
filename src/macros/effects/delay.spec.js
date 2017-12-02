import test from 'ava'
import sinon from 'sinon'
import { Delay } from './delay'

import { AudioContextMock } from '../../mock/audio-context.mock'

test('Delay factory returns an object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	t.true(typeof delay === 'object')
})

test('Delay connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	}
	t.true(typeof delay.connect(nextInChain).connect === 'function')
})

test('Delay connect method returns an object with a getInput method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	t.true(typeof delay.getInput() === 'object')
})

test('Delay factory returns object with a tempo getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	delay.setTempoValue(120)
	t.is(120, delay.getTempoValue())
})

test('Delay factory returns object with a division getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	delay.setDivisionValue(4)
	t.is(4, delay.getDivisionValue())
})

test('Delay factory returns object with a feedback getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	delay.setFeedbackValue(0.8)
	t.is(0.8, delay.getFeedbackValue())
})

test('Delay factory returns object with a frequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const delay = Delay(audioContext)
	delay.setFrequencyValue(200)
	t.is(200, delay.getFrequencyValue())
})
