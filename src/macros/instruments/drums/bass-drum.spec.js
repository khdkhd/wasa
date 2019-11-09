import test from 'ava';
import sinon from 'sinon';
import { createBassDrum } from './bass-drum';
import { AudioContextMock } from '../../../mock/audio-context.mock';

test('createBassDrum factory returns object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	t.true(typeof kick === 'object');
});

test('createBassDrum factory returns object with a duration getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	kick.setDurationValue(1);
	t.is(1, kick.getDurationValue());
});

test('createBassDrum factory returns object with a frequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	kick.setFrequencyValue(440);
	t.is(440, kick.getFrequencyValue());
});

test('createBassDrum factory returns object with an outputGain getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	kick.setOutputGainValue(0.25);
	t.is(0.25, kick.getOutputGainValue());
});


test('createBassDrum connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	};
	t.true(typeof kick.connect(nextInChain).connect === 'function');
});


test('createBassDrum noteOn method call exponentialRampToValueAtTime on osc gain node', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	kick.noteOn();
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called);
	t.truthy(modifiedGain);
});


test('createBassDrum noteOff method call exponentialRampToValueAtTime on osc gain node', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const kick = createBassDrum(audioContext);
	kick.noteOn();
	kick.noteOff();
	const modifiedGain = audioContext.getGainNodes()
		.find(node => node.gain.exponentialRampToValueAtTime.called);
	t.truthy(modifiedGain);
});
