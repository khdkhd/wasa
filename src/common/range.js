import { isNil } from 'ramda'

/**
 * Unnormalizes a [0-1] range value back to the given range
 * @param {Object} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 */
export const unscale = (range, value) => {
	if (isNil(range)) {
		return value
	}
	return ((range.max - range.min) * value) + range.min
}

/**
 * Normalizes value to a [0,1] range given its original range.min and range.max
 * @param {Object} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 */
export const scale = (range, value) => {
	if (isNil(range)) {
		return value
	}
	return (value - range.min) / (range.max - range.min)
}
