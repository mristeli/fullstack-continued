import React from "react";
import ReactDOM from "react-dom";

interface CoursePart {
  name: string;
  exerciseCount: number
}

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
}

const Content: React.FC<{ parts: Array<CoursePart>}> = ({ parts }) => {
  return (
    <div> 
      { parts.map(part => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )

  // return (
  //   <div>
  //     <h1>{courseName}</h1>
  //     <p>
  //       {courseParts[0].name} {courseParts[0].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[1].name} {courseParts[1].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[2].name} {courseParts[2].exerciseCount}
  //     </p>
  //     <p>
  //       Number of exercises{" "}
  //       {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  //     </p>
  //   </div>
  // );
};

ReactDOM.render(<App />, document.getElementById("root"));
