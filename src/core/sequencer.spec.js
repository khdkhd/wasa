import test from 'ava'
import sinon from 'sinon'
import { Sequencer } from '.'
import { AudioContextMock } from '../mock/audio-context.mock'

test('Sequencer factory creates a sequencer object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = Sequencer(audioContext)
	t.true(typeof sequencer === 'object')
})

test('Calling start triggers onPlay handler', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	Sequencer(audioContext)
		.onTick(() => {
			t.pass()
		})
		.start()
})

test('Calling stop triggers onStop handler', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	Sequencer(audioContext)
		.onStop(() => {
			t.pass()
		})
		.start()
		.stop()
})

test('Sequencer factory returns object with a loopMode getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = Sequencer(audioContext)
	sequencer.setLoopMode(true)
	t.is(true, sequencer.getLoopMode())
})

test('Sequencer factory returns object with a length getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = Sequencer(audioContext)
	sequencer.setLength(16)
	t.is(16, sequencer.getLength())
})

test('Sequencer factory returns object with a division getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = Sequencer(audioContext)
	sequencer.setDivision(4)
	t.is(4, sequencer.getDivision())
})

test('Sequencer factory returns object with a tempo getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const sequencer = Sequencer(audioContext)
	sequencer.setTempo(120)
	t.is(120, sequencer.getTempo())
})
