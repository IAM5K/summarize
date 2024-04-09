export function extractSubjects(examAspirations, allExamsList) {
  const selectedExams = allExamsList.filter((exam) => {
    return examAspirations.some((aspiration) => exam.examShortName === aspiration.name);
  });
  const subjects = [];
  selectedExams.forEach((exam) => {
    exam.subjects.forEach((subject) => {
      if (subject.name) {
        const existingSubject = subjects.find((s) => s.name === subject.name);
        if (existingSubject) {
          // Subject already exists, add new subcategories
          existingSubject.subcategories.push(...subject.subcategories);
        } else {
          // Subject doesn't exist, add it to subjects array
          subjects.push({ name: subject.name, subcategories: subject.subcategories });
        }
      } else {
        console.log("Sub without name", subject);
        subjects.push({ name: subject, subcategories: [] });
      }
    });
  });

  // Remove duplicate subcategories within each subject
  subjects.forEach((subject) => {
    subject.subcategories = [...new Set(subject.subcategories)];
  });
  console.log(subjects);

  return subjects;
}
