const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  };
  return sum;
};

process.on('message', (message) => {
  const sum = longComputation();
  console.log("bulk-create");	
  process.send(sum);
});