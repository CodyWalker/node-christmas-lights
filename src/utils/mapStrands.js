'use strict';

const createStrand = require("opc/strand");

function createStrands(tree) {
  const masterStrand = createStrand(tree.hardware.outputSize);

  const subStrands = tree.hardware.strands.map((strand) => {
    return masterStrand.slice(strand.start, strand.end);
  });

  return {
    masterStrand,
    subStrands
  }
}

function mapPixels(strands, pixels) {
  let accumulator = 0;

  for (let i = 0; i < strands.subStrands.length; i++) {
    const strand = strands.subStrands[i];

    for (let j = 0; j < strand.length; j++) {
      strand.setPixel(
        j,
        pixels[accumulator].values[0],
        pixels[accumulator].values[1],
        pixels[accumulator].values[2]
      );

      accumulator += 1;
    }
  }
}


module.exports = {
  createStrands,
  mapPixels
}
