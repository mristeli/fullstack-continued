type Rating = 1 | 2 | 3;

interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  description: string;
}

const calculateExercises = (target: number, hours: Array<number>): ExerciseData => {
  const average = hours.reduce((acc, next) => acc + next) / hours.length;
  const rawRating = (average / target * 2) + 1;

  console.log(`Raw rating ${rawRating}`);
  
  let [rating, description] : [Rating, string] = [3, "perfect!"];
  if (rawRating < 2) {
    description = "try harder";
    rating = 1;
  } 
  if (rawRating < 3) {
    description = "keep up the good work";
    rating = 2;
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h => h > 0)).length,
    target,
    rating,
    average,
    description,
    success: average >= target,
  };
};

const parseNumberArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');

  return args.slice(2).map( next => {
    const nextAsNum = Number(next);
    if(isNaN(nextAsNum)) {
      throw new Error('Provided values were not numbers!');
    }
    return nextAsNum;
  });
};
// [3, 0, 2, 4.5, 0, 3, 1]

try {
  const numbers = parseNumberArguments(process.argv);
  const exerciseData = calculateExercises(numbers[0], numbers.slice(1));
  console.log('Parse exercise data is', exerciseData);
} catch (e) {
  console.log('Error, something bad happened, message:', (<Error> e).message);
}

export { calculateExercises, Rating, ExerciseData };