const fs1 = (stringA) => {
  const res = stringA.replace("damn", "");
  const res1 = res.replace("bullshit", "");
  const replacedWSP = res1.replace(/\s+/, " ");
  console.log(replacedWSP);
};

fs1("Hel  lop damn hi bullshit");
