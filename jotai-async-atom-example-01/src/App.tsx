import { Suspense } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { peopleAtom, peopleUrlAtom } from "./atom";

const People = () => {
  const setPeopleUrl = useSetAtom(peopleUrlAtom);
  const { people, nextUrl, previousUrl } = useAtomValue(peopleAtom);
  return (
    <ul>
      {people.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
      <button
        disabled={!previousUrl}
        onClick={() => previousUrl && setPeopleUrl(previousUrl)}
      >
        Prev
      </button>
      <button disabled={!nextUrl} onClick={() => setPeopleUrl(nextUrl)}>
        Next
      </button>
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
