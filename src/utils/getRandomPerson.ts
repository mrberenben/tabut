export const getRandomPerson: (max: number, expect?: number) => number = (
  max,
  expect
) => {
  const person_id = Math.floor(Math.random() * max + 1);

  if (person_id !== expect) return person_id;

  return getRandomPerson(expect);
};

export const getOptionsForVote = (count: number) => {
  const first_id = getRandomPerson(count);
  const second_id = getRandomPerson(count, first_id);

  return [first_id, second_id];
};
