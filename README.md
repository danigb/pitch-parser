# pitch-parser

[![Build Status](https://travis-ci.org/danigb/pitch-parser.svg?branch=master)](https://travis-ci.org/danigb/pitch-parser)
[![Code Climate](https://codeclimate.com/github/danigb/pitch-parser/badges/gpa.svg)](https://codeclimate.com/github/danigb/pitch-parser)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Music pitch parser for javascript.

Given a pitch string it returns a [pitch array](https://github.com/danigb/a-pitch):

```js
var pitch = require('pitch-parser')
pitch.parse('C#4') // => [0, 2, 4]
pitch.parse('Ebb3') // => [2, -2, 2]
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
<h4 class="name" id="parse"><span class="type-signature"></span>parse<span class="signature">(str)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get a pitch array from a pitch string in scientific notation</p>
<p>The pitch array of 3 integers is in the form <code>[letter, accidentals, octave]</code></p>
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
<td class="name"><code>str</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>the pitch string</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/pitch-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/pitch-parser/blob/master/index.js#L25">lineno 25</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch array</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.patse('C2') // => [0, 0, 2]
pitch.patse('C3') // => [0, 0, 3]
pitch.patse('C#3') // => [0, 1, 3]
pitch.patse('Cb3') // => [0, -1, 3]
pitch.parse('D##4') // => [1, 2, 4]
pitch.parse('F#') // => [4, 1, null]</code></pre>
</dd>
<dt>
<h4 class="name" id="str"><span class="type-signature"></span>str<span class="signature">(arr)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get a pitch string from a pitch array</p>
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
<td class="name"><code>arr</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch array</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/pitch-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/pitch-parser/blob/master/index.js#L46">lineno 46</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch string in scientific notation</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.str([2, -1, 3]) // => 'Eb3'
pitch.str([5, 2, 2]) // => 'A##2'</code></pre>
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
