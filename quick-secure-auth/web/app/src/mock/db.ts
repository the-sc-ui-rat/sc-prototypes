import type React from "react";
import { illustrations } from "./illustrations";
import type { Template, TemplateRecord, Inspection, InspectionRecord, Course, CourseRecord, User } from "./types";
import usersData from "./data/users.json";
import templatesData from "./data/templates.json";
import inspectionsData from "./data/inspections.json";
import coursesData from "./data/courses.json";

const resolveIllustration = <T extends { illustrationKey: string }>(
  record: T
): Omit<T, "illustrationKey"> & { Illustration: React.FC } => {
  const { illustrationKey, ...rest } = record;
  if (import.meta.env.DEV && !illustrations[illustrationKey]) {
    console.warn(`[mock] Unknown illustrationKey: "${illustrationKey}". Check illustrations.ts`);
  }
  return { ...rest, Illustration: illustrations[illustrationKey] };
};

export const db = {
  users: usersData as User[],
  templates: (): Template[] =>
    (templatesData as TemplateRecord[]).map(resolveIllustration) as Template[],
  inspections: (): Inspection[] =>
    (inspectionsData as InspectionRecord[]).map(resolveIllustration) as Inspection[],
  courses: (): Course[] =>
    (coursesData as CourseRecord[]).map(resolveIllustration) as Course[],
};
