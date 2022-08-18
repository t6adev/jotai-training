import { atom } from "jotai";

import { fetchPeople } from "./api";

export const peopleAtom = atom(async () => {
  const people = await fetchPeople();
  return people;
});
