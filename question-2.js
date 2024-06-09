function qustion2(sentence) {
  const kata = sentence.split(" ");
  let kataPertama = kata[0];
  for (let i = 1; i < kata.length; i++) {
    if (kata[i].length > kata.kataPertama) {
      kataPertama = kata[i];
    }
  }

  return `${kataPertama}: ${kata.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log({
  question: 2,
  input: sentence,
  result: qustion2(sentence),
});
