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
 * @param {String|Array} value - the pitch (can be a string or array)
 * @return {Array|String} the converted value (string if it was an array,
 * and array if it was string)
 *
 * @example
 * pitch('C4') // => [0, 0, 4]
 * pitch([0, 0, 4]) // => 'C4'
 *
 * @example // parse
 * pitch('c2') // => [0, 0, 2]
 * pitch('C3') // => [0, 0, 3]
 * pitch('C#3') // => [0, 1, 3]
 * pitch('Cb3') // => [0, -1, 3]
 * pitch('D##4') // => [1, 2, 4]
 * pitch('F#') // => [4, 1, null] (no octave)
 *
 * @example // build
 * pitch([2, -1, 3]) // => 'Eb3'
 * pitch([5, 2, 2]) // => 'A##2'
 * pitch([6, -2, null]) // => 'Bbb'
 *
 * @example // return scientific notation
 * pitch(pitch('cbb')) // => 'Cbb'
 * pitch(pitch('fx')) // => 'F##'
 */
function pitch (value) {
  if (typeof value === 'string') {
    return cache[value] ? cache[value] : cache[value] = parse(value)
  } else if (Array.isArray(value)) {
    var str = '|' + value[0] + '|' + value[1] + '|' + value[2]
    return cache[str] ? cache[str] : cache[str] = build(value)
  } else {
    return null
  }
}

/*
 * Get a pitch array from a pitch string in scientific notation
 *
 * The pitch array of 3 integers is in the form `[letter, accidentals, octave]`
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
function parse (str) {
  var m = REGEX.exec(str)
  if (!m) return null

  var step = LETTERS.indexOf(m[1].toUpperCase())
  var alt = m[2].replace(/x/g, '##').length
  if (m[2][0] === 'b') alt *= -1
  var oct = m[3] ? +m[3] : null
  return [step, alt, oct]
}

/*
 * Get a pitch string from a pitch array
 *
 * @param {Array} arr - the pitch array
 * @return {String} the pitch string in scientific notation
 *
 * @example
 * pitch.build([2, -1, 3]) // => 'Eb3'
 * pitch.build([5, 2, 2]) // => 'A##2'
 * pitch.build([6, -2, null]) // => 'Bbb'
 */
function build (arr) {
  if (!arr || arr.length < 2) return null
  var letter = LETTERS.charAt(Math.abs(arr[0]) % 7)
  var acc = fillStr(Math.abs(arr[1]), arr[1] < 0 ? 'b' : '#')
  var oct = arr[2] || arr[2] === 0 ? arr[2] : ''
  return letter + acc + oct
}

pitch.parse = parse
pitch.build = build

module.exports = pitch
