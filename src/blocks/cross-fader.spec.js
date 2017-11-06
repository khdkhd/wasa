import test from 'ava'
import sinon from 'sinon'
import { CrossFader } from './cross-fader'
import { AudioContextMock } from '../mock/audio-context.mock'

test('CrossFader factory creates an object', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	t.true(typeof crossFader === 'object')
})

test('CrossFader factory creates an object with a fadeLeft method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	t.true(typeof crossFader.fadeLeft === 'function')
})

test('CrossFader factory creates an object with a fadeRight method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	t.true(typeof crossFader.fadeRight === 'function')
})

test('CrossFader connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const nextInChain = {
		input: audioContext.createGain(),
		connect() {},
	}
	t.true(typeof crossFader.connect(nextInChain).connect === 'function')
})

test('CrossFader connect method returns an object with a left gain node getter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const leftGainNode = crossFader.getLeftGainNode()
	t.true(typeof leftGainNode === 'object')
})

test('CrossFader connect method returns an object with a right gain node getter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const rightGainNode = crossFader.getRightGainNode()
	t.true(typeof rightGainNode === 'object')
})

test('CrossFader connect method returns an object with a left input setter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const crossFaderLeftInput = audioContext.createOscillator()
	t.true(typeof crossFader.setLeftInput(crossFaderLeftInput) === 'object')
})

test('CrossFader connect method returns an object with a right input setter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const crossFaderRightInput = audioContext.createOscillator()
	t.true(typeof crossFader.setRightInput(crossFaderRightInput) === 'object')
})

test('CrossFader fadeRight method affects audioContext gains', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const gainValues = audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
	crossFader.fadeRight(1)
	let modified = false
	audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
		.forEach((value, i) => {
			if (value !== gainValues[i]) {
				modified = true
			}
		})
	t.true(modified)
})
test('CrossFader fadeLeft method affects audioContext gains', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const crossFader = CrossFader(audioContext)
	const gainValues = audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
	crossFader.fadeLeft(1)
	let modified = false
	audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
		.forEach((value, i) => {
			if (value !== gainValues[i]) {
				modified = true
			}
		})
	t.true(modified)
})
