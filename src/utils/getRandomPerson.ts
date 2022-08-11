const MAX_PERSON_ID = 13;

export const getRandomPerson: (expect?: number) => number = expect => {
  const person_id = Math.floor(Math.random() * MAX_PERSON_ID + 1);

  if (person_id !== expect) return person_id;

  return getRandomPerson(expect);
};

export const getOptionsForVote = () => {
  const first_id = getRandomPerson();
  const second_id = getRandomPerson(first_id);

  return [first_id, second_id];
};
