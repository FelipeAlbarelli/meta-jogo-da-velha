const docsForAll = ['identificação', 'renda'];

const docsOnlyStudent = [
  'residência',
  'dados bancarios',
  'docs complementares', // aka formularios auxilios
];

export type BaseStudentDocItem = {
  person: string;
  docName: string;
};

export const getDataJoao = () => {
  const studentName = 'João';
  const family = ['Maria', 'Pedro'];
  const allPersons = [studentName, ...family];
  const result: BaseStudentDocItem[] = [];
  allPersons.forEach((personName) => {
    docsForAll.forEach((doc) => {
      result.push({
        person: personName,
        docName: doc,
      });
    });
  });

  docsOnlyStudent.forEach((doc) => {
    result.push({
      docName: doc,
      person: studentName,
    });
  });

  return result.map((item, index) => ({
    ...item,
    id: index,
  }));
};
