var vows = require('vows')
var assert = require('assert')
var pitch = require('../')

vows.describe('pitch').addBatch({
  'parse': {
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
  'stringify': {
    'pitch string': function () {
      assert.equal(pitch.stringify([0, 0, 4]), 'C4')
      assert.equal(pitch.stringify([4, 0, 4]), 'G4')
      assert.equal(pitch.stringify([5, 0, 4]), 'A4')
      assert.equal(pitch.stringify([6, 1, 3]), 'B#3')
      assert.equal(pitch.stringify([1, -1, 4]), 'Db4')
      assert.equal(pitch.stringify([4, -3, 1]), 'Gbbb1')
      assert.equal(pitch.stringify([-1, 0, 0]), 'D0')
    },
    'pitch class string': function () {
      assert.equal(pitch.stringify([0, 0, null]), 'C')
      assert.equal(pitch.stringify([0, -3, null]), 'Cbbb')
      assert.equal(pitch.stringify([4, 1, null]), 'G#')
    }
  }
}).export(module)
