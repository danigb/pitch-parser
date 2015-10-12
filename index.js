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
 * pitch.patse('C2') // => [0, 0, 2]
 * pitch.patse('C3') // => [0, 0, 3]
 * pitch.patse('C#3') // => [0, 1, 3]
 * pitch.patse('Cb3') // => [0, -1, 3]
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
 * pitch.str([2, -1, 3]) // => 'Eb3'
 * pitch.str([5, 2, 2]) // => 'A##2'
 */
function str (arr) {
  var letter = LETTERS.charAt(Math.abs(arr[0]) % 7)
  var acc = fillStr(Math.abs(arr[1]), arr[1] < 0 ? 'b' : '#')
  var oct = arr[2] || arr[2] === 0 ? arr[2] : ''
  return letter + acc + oct
}

module.exports = { parse: parse, str: str }
