import type React from "react";

export type User = {
  id: string;
  name: string;
  initials: string;
};

export type TemplateRecord = {
  id: string;
  name: string;
  description: string;
  owner: string;
  availableTo: string;
  lastPublished: string;
  color: string;
  illustrationKey: string;
};

export type Template = Omit<TemplateRecord, "illustrationKey"> & {
  Illustration: React.FC;
};

export type InspectionStatus = "in-progress" | "completed";

export type InspectionRecord = {
  id: string;
  templateName: string;
  description: string;
  site: string;
  conductedBy: string;
  completedDate: string | null;
  status: InspectionStatus;
  color: string;
  illustrationKey: string;
};

export type Inspection = Omit<InspectionRecord, "illustrationKey"> & {
  Illustration: React.FC;
};

export type CourseStatus = "not-started" | "in-progress" | "completed";

export type CourseRecord = {
  id: string;
  name: string;
  description: string;
  category: string;
  assignedTo: string;
  dueDate: string;
  status: CourseStatus;
  color: string;
  illustrationKey: string;
};

export type Course = Omit<CourseRecord, "illustrationKey"> & {
  Illustration: React.FC;
};
