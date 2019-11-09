import test from 'ava';
import sinon from 'sinon';
import { createDelay } from './delay';

import { AudioContextMock } from '../../mock/audio-context.mock';

test('createDelay factory returns an object', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	t.true(typeof delay === 'object');
});

test('createDelay connect method returns an object with a connect method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	const nextInChain = {
		getInput: () => audioContext.createGain(),
		connect() {},
	};
	t.true(typeof delay.connect(nextInChain).connect === 'function');
});

test('createDelay connect method returns an object with a getInput method', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	t.true(typeof delay.getInput() === 'object');
});

test('createDelay factory returns object with a tempo getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	delay.setTempoValue(120);
	t.is(120, delay.getTempoValue());
});

test('createDelay factory returns object with a division getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	delay.setDivisionValue(4);
	t.is(4, delay.getDivisionValue());
});

test('createDelay factory returns object with a feedback getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	delay.setFeedbackValue(0.8);
	t.is(0.8, delay.getFeedbackValue());
});

test('createDelay factory returns object with a frequency getter and setter', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create());
	const delay = createDelay(audioContext);
	delay.setFrequencyValue(200);
	t.is(200, delay.getFrequencyValue());
});
