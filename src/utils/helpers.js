export const sliceZero = value => {
  let processedSentence = undefined;
  for (let index = 0; index < value.length; index++) {
    if (value[index] !== '0') {
      processedSentence = value.slice(index);
      return parseInt(processedSentence);
    }
  }
  return 0;
};
