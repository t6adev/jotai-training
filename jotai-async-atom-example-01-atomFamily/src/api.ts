export const fetchPeople = async (url: string) => {
  const res = await fetch(url);
  const { results, next, previous } = (await res.json()) as {
    count: number;
    next: string;
    previous: null | string;
    results: { name: string; url: string }[]; // see more derails at https://swapi.dev/
  };
  return { results, next, previous };
};
