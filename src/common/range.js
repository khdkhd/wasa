/**
 * range module exports utility function for scaling/unscaling values to range
 * @module range
 */

import { isNil } from 'ramda'

/**
 * @typedef {Object} Range
 * @property {number} min - Range minimum
 * @property {number} max - Range maximum
 */

/**
 * Unnormalizes a [0-1] range value back to the given range
 * @param {module:range~Range} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - Unnormalized value in range
 */
export function unscale(range, value) {
	if (isNil(range)) {
		return value
	}
	return ((range.max - range.min) * value) + range.min
}

/**
 * Normalizes value to a [0,1] range given its original range.min and range.max
 * @param {module:range~Range} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - Normalized value in range [0,1]
 */
export function scale(range, value) {
	if (isNil(range)) {
		return value
	}
	return (value - range.min) / (range.max - range.min)
}
