'use strict'

// utility: fill a string with a char
function fillStr (num, char) { return Array(num + 1).join(char) }

var LETTERS = 'CDEFGAB'
var REGEX = /^([a-gA-G])(#{1,4}|b{1,4}|x{1,2}|)(\d*)$/

var cache = {}

/**
 * Converts pitches between strings and [array notation](https://github.com/danigb/a-pitch)
 *
 * This functions parses a string in the form `'letter + accidentals [+ octave]'`.
 * The letter can be upper or down case and the accidentals can be sharps `#`
 * flats `b` or double sharps `x`.
 *
 * The pitch array notation is 3 integers is in the form `[letter, accidentals, octave]`.
 *
 * This function caches the result to get better performance. If for some
 * reason you don't want to cache, use `pitch.parse` and `pitch.build`
 *
 * @param {String|Array} val - the pitch (can be a string or array)
 * @return {Array|String} the converted val (string if it was an array,
 * and array if it was string)
 *
 * @example
 * var pitch = require('pitch-parser')
 * pitch('C4') // => [0, 0, 4]
 * pitch([0, 0, 4]) // => 'C4'
 *
 * @example // parse
 * pitch('c2') // => [0, 0, 2]
 * pitch('F#') // => [4, 1, null] (no octave)
 *
 * @example // build
 * pitch([2, -1, 3]) // => 'Eb3'
 * pitch([6, -2, null]) // => 'Bbb'
 *
 * @example // return scientific notation
 * pitch(pitch('cbb')) // => 'Cbb'
 * pitch(pitch('fx')) // => 'F##'
 */
function pitch (val) {
  if (Array.isArray(val)) {
    var str = '|' + val[0] + '|' + val[1] + '|' + val[2]
    return str in cache ? cache[str] : cache[str] = pitch.build(val)
  } else {
    return val in cache ? cache[val] : cache[val] = pitch.parse(val)
  }
}

/**
 * Get a pitch array from a pitch string in scientific notation
 *
 * The pitch array of 3 integers is in the form `[letter, accidentals, octave]`
 *
 * This function is non cached. Prefer `pitch` where possible.
 *
 * @param {String} str - the pitch string
 * @return {Array} the pitch array
 *
 * @example
 * pitch.parse('C2') // => [0, 0, 2]
 * pitch.parse('C3') // => [0, 0, 3]
 * pitch.parse('C#3') // => [0, 1, 3]
 * pitch.parse('Cb3') // => [0, -1, 3]
 * pitch.parse('D##4') // => [1, 2, 4]
 * pitch.parse('F#') // => [4, 1, null]
 */
pitch.parse = function (str) {
  var m = REGEX.exec(str)
  if (!m) return null

  var step = LETTERS.indexOf(m[1].toUpperCase())
  var alt = m[2].replace(/x/g, '##').length
  if (m[2][0] === 'b') alt *= -1
  var oct = m[3] ? +m[3] : null
  return [step, alt, oct]
}

/**
 * Get a pitch string from a pitch array
 *
 * This function is non cached. Prefer `pitch` where possible.
 *
 * @name pitch.build
 * @param {Array} arr - the pitch array
 * @return {String} the pitch string in scientific notation
 *
 * @example
 * pitch.build([2, -1, 3]) // => 'Eb3'
 * pitch.build([5, 2, 2]) // => 'A##2'
 * pitch.build([6, -2, null]) // => 'Bbb'
 */
pitch.build = function (arr) {
  if (!arr || arr.length < 2) return null
  var letter = LETTERS.charAt(Math.abs(arr[0]) % 7)
  var acc = fillStr(Math.abs(arr[1]), arr[1] < 0 ? 'b' : '#')
  var oct = arr[2] || arr[2] === 0 ? arr[2] : ''
  return letter + acc + oct
}

module.exports = pitch
