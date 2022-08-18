import { Suspense } from "react";
import { useAtomValue } from "jotai";
import { peopleAtom } from "./atom";

const People = () => {
  const people = useAtomValue(peopleAtom);
  return (
    <ul>
      {people.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

const App = () => (
  <div>
    <Suspense fallback="loading...">
      <People />
    </Suspense>
  </div>
);

export default App;
