import { EducationLevel, Options } from "../interface/masterData.model";

export class StudyOptionsData {
  public static matriculationSubjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "Computer",
    "Hindi",
    "Sanskrit",
    "Telugu",
    "Malayalam",
  ];
  public static intermediateSubjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "Computer",
    "Hindi",
    "Sanskrit",
    "Telugu",
    "Malayalam",
  ];
  public static educationLevel: EducationLevel[] = [
    {
      level: "Matriculation",
      subjects: this.matriculationSubjects,
    },
    {
      level: "Intermediate",
      subjects: this.intermediateSubjects,
    },
  ];

  public static studiesTypes: Options[] = [
    { title: "Break", value: "break" },
    { title: "Learn", value: "learn" },
    { title: "Listen", value: "listen" },
    { title: "Practice", value: "practice" },
    { title: "Read", value: "read" },
    { title: "Slept", value: "slept" },
    { title: "Write", value: "write" },
    { title: "Test", value: "test" },
  ];
  public static studyMode: Options[] = [
    { title: "Self", value: "self" },
    { title: "Group", value: "group" },
    { title: "Teacher", value: "teacher" },
    { title: "Online", value: "online" },
  ];
}
