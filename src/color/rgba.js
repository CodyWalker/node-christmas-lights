'use strict';

function create() {
  return {
    values: new Uint8ClampedArray(3),
    alpha: 0,
  }
}

function clone(rgba) {
  const result = {
    values: new Uint8ClampedArray(3),
    alpha: rgba.alpha,
  }

  result.values[0] = rgba.values[0];
  result.values[1] = rgba.values[1];
  result.values[2] = rgba.values[2];

  return result;
}

function fromValues(r, g, b, a) {
  const result = {
    values: new Uint8ClampedArray(3),
    alpha: a,
  }

  result.values[0] = r;
  result.values[1] = g;
  result.values[2] = b;

  return result;
}

function fromHex(hexColor) {
  const result = {
    values: new Uint8ClampedArray(3),
    alpha: 1,
  }

  result.values[0] = hexColor >> 16;
  result.values[1] = (hexColor >> 8) & 0xff;
  result.values[2] = hexColor & 0xff;

  return result;
}

function copy(out, rgba) {
  out.values[0] = rgba.values[0];
  out.values[1] = rgba.values[1];
  out.values[2] = rgba.values[2];
  out.alpha = rgba.alpha;

  return out;
}

function setasdf(out, r, g, b, a) {
  out.values[0] = r;
  out.values[1] = g;
  out.values[2] = b;
  out.alpha = a;

  return out;
}

// Adapted from https://github.com/colorjs/color-composite/blob/master/index.js
function composite(out, top, bottom) {
  if (top.a === 1) {
    copy(out, top);
    return out;
  } else if (top.a === 0) {
    copy(out, bottom);
    return out;
  }

  const alpha = top.alpha + bottom.alpha * (1 - top.alpha)

  for (var i = 0; i < 3; i++) {
    var preTop = top.values[i] * top.alpha
    var preBottom = bottom.values[i] * bottom.alpha
    out.values[i] = (preTop + preBottom * (1 - top.alpha)) / alpha
  }

  out.alpha = alpha

  return out;
}

function mix(out, color1, color2, ratio) {
  const inverseRatio = 1 - ratio;

  out.values[0] = color1.values[0] * inverseRatio + color2.values[0] * ratio;
  out.values[1] = color1.values[1] * inverseRatio + color2.values[1] * ratio;
  out.values[2] = color1.values[2] * inverseRatio + color2.values[2] * ratio;
  out.alpha = color1.alpha * inverseRatio + color2.alpha * ratio;

  return out;
}

module.exports = {
  create,
  clone,
  fromValues,
  fromHex,
  copy,
  setasdf,
  composite,
  mix,
}
