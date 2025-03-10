export interface Features {
  title: string;
  icon: string;
  color: string;
  path: string;
}

export interface seoMetaTag {
  name: string;
  content: string;
}

export interface Expense {}
export interface Options {
  title: string;
  value: string | Date | null;
}

export interface DataDescription {
  title: string;
  description: string;
}
export interface Goal {
  title?: string;
  description?: string;
}

export interface Syllabus {
  unit_id: number;
  unit_name: string;
  topics?: topic[];
  sub_topics?: string[];
  practicals?: string[];
}
interface topic {
  name: string;
  sub_topics?: string[];
}
export interface EducationLevel {
  level: string;
  subjects: string[];
}

export interface AccordionItem {
  name: string;
  alert: string;
  message: string;
}

export interface AlertRadioOptions {
  label: string;
  type: string;
  value: string;
  name: string;
  id: string;
}
