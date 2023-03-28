
// shuffle a given array
const shuffle = function (array) {
  return array.sort(() => Math.random() -0.5);
}

export default shuffle;
