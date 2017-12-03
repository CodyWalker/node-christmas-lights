// Modified from https://github.com/colorjs/color-composite/blob/master/index.js
// Despite being from the same org as color-manipulate the original wasn't compatible

// The MIT License (MIT)
//
// Copyright (c) 2017 Jamen Marz
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

module.exports = composite
composite.over = over

function composite (layers, space) {
  var output = layers[0]
  for (var i = 1, max = layers.length; i < max; i++) {
    output = over(output, layers[i])
  }
  return output
}

function over (a, b) {
  if (a._alpha === 1) return a
  if (a._alpha === 0) return b

  var o = {
    space: b._space,
    values: b.toArray().slice(),
    alpha: a._alpha + b._alpha * (1 - a._alpha)
  }

  // Color channels
  for (var i = 0; i < 3; i++) {
    var preA = a.toArray()[i] * a._alpha
    var preB = b.toArray()[i] * b._alpha
    o.values[i] = Math.round((preA + preB * (1 - a._alpha)) / o.alpha)
  }

  return o
}
