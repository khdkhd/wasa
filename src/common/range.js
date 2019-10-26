import { isNil } from 'ramda';

/**
 * De-normalizes a [0-1] range value back to the given range
 * @param range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - De-normalized value in range
 */
export function unscale(range, value) {
	if (isNil(range) || isNil(value)) {
		throw new Error('range and value are mandatory');
	}
	return ((range.max - range.min) * value) + range.min;
}

/**
 * Normalizes value to a [0,1] range given its original range.min and range.max
 * @param range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - Normalized value in range [0,1]
 */
export function scale(range, value) {
	if (isNil(range) || isNil(value)) {
		throw new Error('range and value are mandatory');
	}
	return (value - range.min) / (range.max - range.min);
}
