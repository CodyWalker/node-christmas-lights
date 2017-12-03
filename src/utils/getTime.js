module.exports = function() {
  const NS_PER_SEC = 1e9;

  const hrtime = process.hrtime();
  return (hrtime[0] + (hrtime[1] / NS_PER_SEC)) * 1000;
}
