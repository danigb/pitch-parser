'use strict'

// utility: fill a string with a char
function fillStr (num, char) { return Array(num + 1).join(char) }

var LETTERS = 'CDEFGAB'
var REGEX = /^([a-gA-G])(#{1,4}|b{1,4}|x{1,2}|)(\d*)$/

/**
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

/**
 * Get a pitch string from a pitch array
 *
 * @param {Array} arr - the pitch array
 * @return {String} the pitch string in scientific notation
 *
 * @example
 * pitch.stringify([2, -1, 3]) // => 'Eb3'
 * pitch.stringify([5, 2, 2]) // => 'A##2'
 * pitch.stringify([6, -2, null]) // => 'Bbb'
 */
function stringify (arr) {
  var letter = LETTERS.charAt(Math.abs(arr[0]) % 7)
  var acc = fillStr(Math.abs(arr[1]), arr[1] < 0 ? 'b' : '#')
  var oct = arr[2] || arr[2] === 0 ? arr[2] : ''
  return letter + acc + oct
}

module.exports = { parse: parse, stringify: stringify }
