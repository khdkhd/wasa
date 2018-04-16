import test from 'ava'
import sinon from 'sinon'
import { createSequencer } from '.'
import { AudioContextMock } from '../mock/audio-context.mock'

test('createSequencer factory creates a sequencer object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = createSequencer(audioContext)
	t.true(typeof sequencer === 'object')
})

test('Calling start triggers onStart handler', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	createSequencer(audioContext)
		.onStart(() => {
			t.pass()
		})
		.start()
})

test('Calling stop triggers onStop handler', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	createSequencer(audioContext)
		.onStop(() => {
			t.pass()
		})
		.start()
		.stop()
})

test('createSequencer factory returns object with a loopMode getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = createSequencer(audioContext)
	sequencer.setLoopMode(true)
	t.is(true, sequencer.getLoopMode())
})

test('createSequencer factory returns object with a length getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = createSequencer(audioContext)
	sequencer.setLength(16)
	t.is(16, sequencer.getLength())
})

test('createSequencer factory returns object with a division getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = createSequencer(audioContext)
	sequencer.setDivision(4)
	t.is(4, sequencer.getDivision())
})

test('createSequencer factory returns object with a tempo getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = createSequencer(audioContext)
	sequencer.setTempo(120)
	t.is(120, sequencer.getTempo())
})
