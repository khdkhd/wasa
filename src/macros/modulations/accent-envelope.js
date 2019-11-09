import { isNil } from 'ramda';
import { mandatory } from '../../common/utils';

export const createAccentEnvelope = (audioContext = mandatory()) => {
	let attackTime = 0;
	let decayTime = 0;
	let accentValue = 0;
	let peakValue = 0;
	let sustainValue = peakValue;
	let isActive = true;

	let parameter;

	const assertMandatoryParameter = () => {
		if (isNil(parameter)) {
			throw new Error('Missing envelope parameter, use connect(audioParam) before calling method');
		}
	};

	return {
		connect(audioParam = mandatory()) {
			parameter = audioParam;
			sustainValue = parameter.value;
			return this;
		},
		on(time = audioContext.currentTime) {
			assertMandatoryParameter();
			if (isActive) {
				peakValue = sustainValue + accentValue;
				parameter.setValueAtTime(sustainValue, time);
				parameter.linearRampToValueAtTime(peakValue, time + attackTime);
				parameter.exponentialRampToValueAtTime(sustainValue, time + attackTime + decayTime);
			}
		},
		off(time = audioContext.currentTime) {
			assertMandatoryParameter();
			if (isActive) {
				parameter.setValueAtTime(sustainValue, time);
				parameter.cancelScheduledValues(time);
			}
		},
		isActive() {
			return isActive;
		},
		setActive(value = mandatory()) {
			isActive = value;
			return this;
		},
		setAccentValue(value = mandatory()) {
			accentValue = value;
			return this;
		},
		getAccentValue() {
			return accentValue;
		},
		setAttackTime(time = mandatory()) {
			attackTime = time;
			return this;
		},
		getAttackTime() {
			return attackTime;
		},
		setDecayTime(time = mandatory()) {
			decayTime = time;
			return this;
		},
		getDecayTime() {
			return decayTime;
		},
		setSustainValue(value = mandatory()) {
			sustainValue = value;
			return this;
		},
		getSustainValue() {
			return sustainValue;
		},
	};
};
