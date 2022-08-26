import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";

import { fetchPeople } from "./api";

export const peopleUrlAtom = atom<string>(
  "https://swapi.dev/api/people/?page=1"
);

export const peopleAtom = atomWithQuery((get) => ({
  queryKey: [get(peopleUrlAtom)],
  queryFn: async () => {
    const {
      results: people,
      next: nextUrl,
      previous: previousUrl
    } = await fetchPeople(get(peopleUrlAtom));
    const time = new Date();
    return {
      people,
      nextUrl,
      previousUrl,
      fetchedAt: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    };
  },
  staleTime: 5000
}));
