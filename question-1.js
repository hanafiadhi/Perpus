function qustion1(str) {
  const string = str.replace(/[0-9]/g, "");
  const number = str.replace(/[^0-9]/g, "");

  return string.split("").reverse().join("") + number;
}

console.log({
  question: 1,
  input: "NEGIE1",
  result: qustion1("NEGIE1"),
});
