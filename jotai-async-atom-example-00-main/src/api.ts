export const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people");
  const { results } = (await res.json()) as {
    count: number;
    next: string;
    previous: null | string;
    results: { name: string; url: string }[]; // see more derails at https://swapi.dev/
  };
  return results;
};
