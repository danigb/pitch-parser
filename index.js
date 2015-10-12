'use strict'

// utility: fill a string with a char
function fillStr (num, char) { return Array(num + 1).join(char) }

var pitch = {}

/**
 * Get a pitch array from a pitch string in scientific notation
 */
var LETTERS = 'CDEFGAB'
var REGEX = /^([a-gA-G])(#{1,4}|b{1,4}|x{1,2}|)(\d*)$/
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
 */
pitch.str = function (arr) {
  var letter = LETTERS.charAt(Math.abs(arr[0]) % 7)
  var acc = fillStr(Math.abs(arr[1]), arr[1] < 0 ? 'b' : '#')
  var oct = arr[2] || arr[2] === 0 ? arr[2] : ''
  return letter + acc + oct
}

var id = function (x) { return x }

pitch.map = function (fn) {
  fn = fn || id
  return function (p) {
    var parsed = Array.isArray(p) ? p : pitch.parse(p)
    return parsed ? pitch.str(fn(parsed)) : null
  }
}

module.exports = pitch
