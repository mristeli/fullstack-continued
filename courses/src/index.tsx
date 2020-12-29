import React from "react";
import ReactDOM from "react-dom";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface WithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends WithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends WithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends WithDescription {
  name: "Functional patterns with TypeScript";
  url: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Functional patterns with TypeScript",
    exerciseCount: 25,
    description: "Totally needed after fundamentals",
    url: "https://codeburst.io/functional-patterns-with-typescript-7fdb4d6afe8a?gi=82a3037f0c1a"    
  },
];

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
}

const Part: React.FC<{ content: CoursePart}> = ({content}) => {
  switch (content.name) {
    case "Fundamentals":
      return <div>
        <p>description: {content.description}</p>
       </div>
    case "Using props to pass data":
      return <div>
        <p>groupProjectCount: {content.groupProjectCount}</p>
       </div>
    case "Deeper type usage":
      return <div>
        <p>description: {content.description}</p>
        <p>exerciseSubmissionLink: {content.exerciseSubmissionLink}</p>
       </div>
    case "Functional patterns with TypeScript":
      return <div>
        <p>description: {content.description}</p>
        <p>url: {content.url}</p>
       </div>
    default:
      return assertNever(content);
  }
}

const Content: React.FC<{ parts: Array<CoursePart>}> = ({ parts }) => {
  return (
    <div> 
      { parts.map(part => (
        <div key={part.name}>
          <p>Name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <Part key={part.name} content={ part} ></Part>
        </div>
        ))  
    }
    </div>
  )
}

const Total: React.FC<{ parts: Array<CoursePart>}> = ({ parts }) => {
  return (
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
