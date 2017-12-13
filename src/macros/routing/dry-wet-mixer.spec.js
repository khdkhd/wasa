import test from 'ava'
import sinon from 'sinon'
import { DryWetMixer } from './dry-wet-mixer'
import { AudioContextMock } from '../../mock/audio-context.mock'

test('DryWetMixer factory creates an object', (t) => {
	const audioContext = AudioContextMock(sinon.createSandbox())
	const audioNodeMixer = DryWetMixer(audioContext)
	t.true(typeof audioNodeMixer === 'object')
})

test('DryWetMixer connect method returns an object with a getInput method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const dryWetMixer = DryWetMixer(audioContext)
	t.true(typeof dryWetMixer.getInput() === 'object')
})

test('DryWetMixer connect method returns an object with a fluent setWetNode method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const dryWetMixer = DryWetMixer(audioContext)
	t.true(typeof dryWetMixer.setWetNode(audioContext.createGain()) === 'object')
})

test('DryWetMixer connect method returns an object with a fluent setWetNode method working on macros', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const dryWetMixer = DryWetMixer(audioContext)
	t.true(typeof dryWetMixer.setWetNode(DryWetMixer(audioContext)) === 'object')
})
