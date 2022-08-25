import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { fetchPeople } from "./api";

export const peopleUrlAtom = atom<string>(
  "https://swapi.dev/api/people/?page=1"
);

export const peopleFamily = atomFamily((url: string) =>
  atom(async () => {
    const {
      results: people,
      next: nextUrl,
      previous: previousUrl
    } = await fetchPeople(url);
    return { people, nextUrl, previousUrl };
  })
);
