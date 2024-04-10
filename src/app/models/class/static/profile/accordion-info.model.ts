import { AccordionItem } from "src/app/models/interface/masterData.model";

export class AccordionInfo {
  static accordionInfo: { [key: string]: AccordionItem } = {
    project: {
      name: "Projects",
      alert: "Projects List",
      message:
        "Here you can add, view and manage your projects. When a project is added it is considered as active, you can make it inactive by using the toggle and it will not be visible in Time section.",
    },
    aspirant: {
      name: "Aspirant",
      alert: "Aspirant Info",
      message: "Here you can view information about aspirants.",
    },
  };
}
