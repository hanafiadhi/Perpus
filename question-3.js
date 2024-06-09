function question3(input, query) {
  const wordCount = {};
  input.forEach((word) => {
    if (wordCount[word]) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  });

  const result = query.map((q) => wordCount[q] || 0);

  return result;
}

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

console.log({
  question: 3,
  result: question3(INPUT, QUERY),
});
