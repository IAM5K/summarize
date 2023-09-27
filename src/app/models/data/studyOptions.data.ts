import { EducationLevel } from '../interface/masterData.model';

export class StudyOptionsData {
  public static matriculationSubjects = [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'English',
    'Computer',
    'Hindi',
    'Sanskrit',
    'Telugu',
    'Malayalam',
  ];
  public static intermediateSubjects = [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'English',
    'Computer',
    'Hindi',
    'Sanskrit',
    'Telugu',
    'Malayalam',
  ];
  public static educationLevel: EducationLevel[] = [
    {
      level: 'Matriculation',
      subjects: this.matriculationSubjects,
    },
    {
      level: 'Intermediate',
      subjects: this.intermediateSubjects,
    },
  ];
}
