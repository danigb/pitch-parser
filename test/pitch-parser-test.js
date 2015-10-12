var vows = require('vows')
var assert = require('assert')
var pitch = require('../')

vows.describe('pitch').addBatch({
  'pitch.parse': {
    'parse pitch': function () {
      assert.deepEqual(pitch.parse('C4'), [0, 0, 4])
      assert.deepEqual(pitch.parse('g4'), [4, 0, 4])
      assert.deepEqual(pitch.parse('a4'), [5, 0, 4])
      assert.deepEqual(pitch.parse('B#3'), [6, 1, 3])
      assert.deepEqual(pitch.parse('Db4'), [1, -1, 4])
    },
    'parse pitch class': function () {
      assert.deepEqual(pitch.parse('C'), [0, 0, null])
      assert.deepEqual(pitch.parse('Ebb'), [2, -2, null])
      assert.deepEqual(pitch.parse('Bb'), [6, -1, null])
      assert.deepEqual(pitch.parse('fx'), [3, 2, null])
    }
  },
  'pitch.str': {
    'pitch string': function () {
      assert.equal(pitch.str([0, 0, 4]), 'C4')
      assert.equal(pitch.str([4, 0, 4]), 'G4')
      assert.equal(pitch.str([5, 0, 4]), 'A4')
      assert.equal(pitch.str([6, 1, 3]), 'B#3')
      assert.equal(pitch.str([1, -1, 4]), 'Db4')
      assert.equal(pitch.str([4, -3, 1]), 'Gbbb1')
      assert.equal(pitch.str([-1, 0, 0]), 'D0')
    },
    'pitch class string': function () {
      assert.equal(pitch.str([0, 0, null]), 'C')
      assert.equal(pitch.str([0, -3, null]), 'Cbbb')
      assert.equal(pitch.str([4, 1, null]), 'G#')
    }
  },
  'pitch.map': {
    'no fn': function () {
      var p = pitch.map()
      assert.equal(p('c3'), 'C3')
      assert.equal(p('bbbbb'), 'Bbbbb')
      assert.equal(p('fx'), 'F##')
    },
    'with fn': function () {
      var p = pitch.map(function (p) {
        return [p[0] + 1, 0, null]
      })
      assert.equal(p('C#4'), 'D')
      assert.equal(p('B'), 'C')
    }
  }
}).export(module)
