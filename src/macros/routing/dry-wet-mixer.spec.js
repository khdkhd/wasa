import test from 'ava'
import sinon from 'sinon'
import { createDryWetMixer } from './dry-wet-mixer'
import { AudioContextMock } from '../../mock/audio-context.mock'

test('createDryWetMixer factory creates an object', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = createDryWetMixer(audioContext)
	t.true(typeof audioNodeMixer === 'object')
})

test('createDryWetMixer connect method returns an object with a getInput method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const dryWetMixer = createDryWetMixer(audioContext)
	t.true(typeof dryWetMixer.getInput() === 'object')
})

test('createDryWetMixer connect method returns an object with a fluent setWetNode method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const dryWetMixer = createDryWetMixer(audioContext)
	t.true(typeof dryWetMixer.setWetNode(audioContext.createGain()) === 'object')
})

test('createDryWetMixer connect method returns an object with a fluent setWetNode method working on macros', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const dryWetMixer = createDryWetMixer(audioContext)
	t.true(typeof dryWetMixer.setWetNode(createDryWetMixer(audioContext)) === 'object')
})
