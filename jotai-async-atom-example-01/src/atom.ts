import { atom } from "jotai";

import { fetchPeople } from "./api";

export const peopleUrlAtom = atom<string>("https://swapi.dev/api/people");

export const peopleAtom = atom(async (get) => {
  // It's a dependency atom.
  // When it's changed, the read function of peopleAtom will be executed.
  const url = get(peopleUrlAtom);
  const {
    results: people,
    next: nextUrl,
    previous: previousUrl
  } = await fetchPeople(url);
  return { people, nextUrl, previousUrl };
});
