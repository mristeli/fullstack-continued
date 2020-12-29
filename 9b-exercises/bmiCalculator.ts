const calculateBmi = (height: number, weight: number): string => {
  const height_m = height / 100;
  const bmi  = weight / height_m / height_m;
  if (bmi < 15) {
    return "Very severely underweight";
  }
  if (bmi < 16) {
    return "Severely underweight";
  }
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi < 25) {
    return "Normal (healthy weight)";
  }
  if (bmi < 30) {
    return "Overweight";
  }
  if (bmi < 35) {
    return "Obese Class I (Moderately obese)";
  }
  if (bmi < 40) {
    return "Obese Class II (Severely obese)";
  }
  return "Obese Class III (Very severely obese)";
};

const parseBmiArguments = (args: Array<string>): [number, number] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [Number(args[2]), Number(args[3])];
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const [height, weight] = parseBmiArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(`Your height is ${height} and your weight is ${weight}.`);
  console.log(`Your BMI classification is ${bmi}.`);
} catch (e) {
  console.log('Error, something bad happened, message: ', (<Error> e).message);
}

export { calculateBmi };
