import test from 'ava'
import sinon from 'sinon'
import { AudioNodeMixer } from './audio-node-mixer'
import { AudioContextMock } from '../mock/audio-context.mock'

test('AudioNodeMixer factory creates an object', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	t.true(typeof audioNodeMixer === 'object')
})

test('AudioNodeMixer factory creates an object with a fadeLeft method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	t.true(typeof audioNodeMixer.fadeLeft === 'function')
})

test('AudioNodeMixer factory creates an object with a fadeRight method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	t.true(typeof audioNodeMixer.fadeRight === 'function')
})

test('AudioNodeMixer connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const nextInChain = {
		input: audioContext.createGain(),
		connect() {},
	}
	t.true(typeof audioNodeMixer.connect(nextInChain).connect === 'function')
})

test('AudioNodeMixer connect method returns an object with a left gain node getter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const leftGainNode = audioNodeMixer.getLeftGainNode()
	t.true(typeof leftGainNode === 'object')
})

test('AudioNodeMixer connect method returns an object with a right gain node getter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const rightGainNode = audioNodeMixer.getRightGainNode()
	t.true(typeof rightGainNode === 'object')
})

test('AudioNodeMixer connect method returns an object with a left input setter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const audioNodeMixerLeftInput = audioContext.createOscillator()
	t.true(typeof audioNodeMixer.setLeftInput(audioNodeMixerLeftInput) === 'object')
})

test('AudioNodeMixer connect method returns an object with a right input setter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const audioNodeMixerRightInput = audioContext.createOscillator()
	t.true(typeof audioNodeMixer.setRightInput(audioNodeMixerRightInput) === 'object')
})

test('AudioNodeMixer fadeRight method affects audioContext gains', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const gainValues = audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
	audioNodeMixer.fadeRight(1)
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
test('AudioNodeMixer fadeLeft method affects audioContext gains', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = AudioNodeMixer(audioContext)
	const gainValues = audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
	audioNodeMixer.fadeLeft(1)
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
