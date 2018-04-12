import test from 'ava'
import sinon from 'sinon'
import { createNodeOutputMixer } from './node-output-mixer'
import { AudioContextMock } from '../../mock/audio-context.mock'

test('createNodeOutputMixer factory creates an object', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	t.true(typeof audioNodeMixer === 'object')
})

test('createNodeOutputMixer factory creates an object with a setFadeValue method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	t.true(typeof audioNodeMixer.setFadeValue === 'function')
})

test('createNodeOutputMixer connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	}
	t.true(typeof audioNodeMixer.connect(nextInChain).connect === 'function')
})

test('createNodeOutputMixer connect method returns an object with a left gain node getter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	const leftGainNode = audioNodeMixer.getLeftGainNode()
	t.true(typeof leftGainNode === 'object')
})

test('createNodeOutputMixer connect method returns an object with a right gain node getter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	const rightGainNode = audioNodeMixer.getRightGainNode()
	t.true(typeof rightGainNode === 'object')
})

test('createNodeOutputMixer connect method returns an object with a left input setter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	const audioNodeMixerLeftInput = audioContext.createOscillator()
	t.true(typeof audioNodeMixer.setLeftInput(audioNodeMixerLeftInput) === 'object')
})

test('createNodeOutputMixer connect method returns an object with a right input setter', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	const audioNodeMixerRightInput = audioContext.createOscillator()
	t.true(typeof audioNodeMixer.setRightInput(audioNodeMixerRightInput) === 'object')
})

test('createNodeOutputMixer setFadeValue method affects audioContext gains', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createNodeOutputMixer(audioContext)
	const gainValues = audioContext.getGainNodes()
		.map(gainNode => gainNode.gain.value)
	audioNodeMixer.setFadeValue(1)
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

