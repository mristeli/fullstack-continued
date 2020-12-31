import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const q = req.query;
  const height = Number(q.height), weight = Number(q.weight);

  if (isNaN(height) || isNaN(weight) ) {
    res.status(400).json({
      error: 'Malformatted parameters'
    });
  } else {
    res.send({ 
      height,
      weight,
      bmi : calculateBmi(height, weight)
    });
  }
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  const targetAsNum = Number(target);
  
  if(!isNaN(targetAsNum) && isValidExerciseInput(daily_exercises)) {
    const exerciseData = calculateExercises(target, daily_exercises);
    return res.json(exerciseData);
  }
  return res.status(400).json({
    error: "malformatted parameters"      
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidExerciseInput = (data: any): data is Array<number> => {
  return Array.isArray(data) && data.every(next => typeof next === "number");
};

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
