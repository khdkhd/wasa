import test from 'ava'
import sinon from 'sinon'
import { RingModulator } from './ring-modulator'

import { AudioContextMock } from '../../mock/audio-context.mock'

test('Ring modulator factory returns an object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	t.true(typeof ringModulator === 'object')
})

test('Ring modulator connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	}
	t.true(typeof ringModulator.connect(nextInChain).connect === 'function')
})

test('Ring modulator factory returns an object with a getInput method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	t.true(typeof ringModulator.getInput() === 'object')
})

test('Ring modulator factory  returns object with a output gain getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	ringModulator.setOutputGainValue(1)
	t.is(1, ringModulator.getOutputGainValue())
})

test('Ring modulator factory returns object with a delay time gain getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	ringModulator.setDelayTimeValue(0.1)
	t.is(0.1, ringModulator.getDelayTimeValue())
})

test('Ring modulator factory returns object with a delay time ring modulation getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	const ringModulationValue = ringModulator.setRingModulationValue(1).getRingModulationValue()
	t.is(1, ringModulationValue)
})


test('Ring modulator factory returns object with a release time gain getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	const releaseTimeValue = ringModulator.setReleaseTimeValue(1).getReleaseTimeValue()
	t.is(1, releaseTimeValue)
})

test('R ng modulator noteOn method call create oscillators in the audio context', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	ringModulator.noteOn()
	t.true(audioContext.createOscillator.called)
})

test('Ring modulator noteOff method call stop on oscillators', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const ringModulator = RingModulator(audioContext)
	ringModulator.noteOn()
	ringModulator.noteOff()
	audioContext.getOscillatorNodes()
		.forEach((osc) => {
			t.true(osc.stop.called)
		})
})
