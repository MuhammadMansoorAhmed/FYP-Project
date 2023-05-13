import React from "react";
import Projects from "./Components/Projects";
import ListProjects from "./Components/ListProjects";

const Charities = ({ state }) => {
  // const { authContract, charityContract } = state;

  return (
    <>
      <section>
        <Projects state={state} />
      </section>
      <section>
        <ListProjects state={state} />
      </section>
    </>
  );
};

export default Charities;
