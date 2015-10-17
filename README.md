# pitch-parser

[![Build Status](https://travis-ci.org/danigb/pitch-parser.svg?branch=master)](https://travis-ci.org/danigb/pitch-parser)
[![Code Climate](https://codeclimate.com/github/danigb/pitch-parser/badges/gpa.svg)](https://codeclimate.com/github/danigb/pitch-parser)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/pitch-parser.svg)](https://badge.fury.io/js/pitch-parser)

Music pitch parser for javascript.

Given a pitch string it returns a [pitch array](https://github.com/danigb/a-pitch), and given a pitch array it returns a pitch string:

```js
var pitch = require('pitch-parser')
pitch('C#4') // => [0, 2, 4]
pitch([0, 2, 4]) // => 'C#4'
pitch('Ebb3') // => [2, -2, 3]
pitch([2, -2, 3]) // => 'Ebb3'
pitch('A#') // => [5, 1, null]
pitch([5, 1, null]) // => 'A#'
```

The returned value is an array of 3 integers with the following form `[letter, accidentals, octave]` where:

- __letter__: a positive integer between 0 and 6 to represent C, D... to B
- __accidentals__: is an integer to represent pitch accidentals. 0 means no accidentals, negatives values are for flats and positives for sharps
- __octave__: (Optional) the octave number or null if not specified

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="pitch"><span class="type-signature"></span>pitch<span class="signature">(val)</span><span class="type-signature"> &rarr; {Array|String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Converts pitches between strings and <a href="https://github.com/danigb/a-pitch">array notation</a></p>
<p>This functions parses a string in the form <code>'letter + accidentals [+ octave]'</code>.
The letter can be upper or down case and the accidentals can be sharps <code>#</code>
flats <code>b</code> or double sharps <code>x</code>.</p>
<p>The pitch array notation is 3 integers is in the form <code>[letter, accidentals, octave]</code>.</p>
<p>This function caches the result to get better performance. If for some
reason you don't want to cache, use <code>pitch.parse</code> and <code>pitch.build</code></p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>val</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch (can be a string or array)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/pitch-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/pitch-parser/blob/master/index.js#L43">lineno 43</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the converted val (string if it was an array,
and array if it was string)</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
|
<span class="param-type">String</span>
</dd>
</dl>
<h5>Examples</h5>
<pre class="prettyprint"><code>pitch('C4') // => [0, 0, 4]
pitch([0, 0, 4]) // => 'C4'</code></pre>
<pre class="prettyprint"><code> // parse
pitch('c2') // => [0, 0, 2]
pitch('F#') // => [4, 1, null] (no octave)</code></pre>
<pre class="prettyprint"><code> // build
pitch([2, -1, 3]) // => 'Eb3'
pitch([6, -2, null]) // => 'Bbb'</code></pre>
<pre class="prettyprint"><code> // return scientific notation
pitch(pitch('cbb')) // => 'Cbb'
pitch(pitch('fx')) // => 'F##'</code></pre>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT License
