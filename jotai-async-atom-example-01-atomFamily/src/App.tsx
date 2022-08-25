import { Suspense } from "react";
import { useAtomValue, useAtom } from "jotai";
import { peopleFamily, peopleUrlAtom } from "./atom";

const People = () => {
  const [peopleUrl, setPeopleUrl] = useAtom(peopleUrlAtom);
  const { people, nextUrl, previousUrl } = useAtomValue(
    peopleFamily(peopleUrl)
  );
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
