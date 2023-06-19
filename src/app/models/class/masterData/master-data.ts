import { Features } from "../../interface/masterData.model";

export class MasterData {
  public static features:Features[] =[
    {
      title:"Achievements",
      icon:"trophy",
      color:"warning",
      path:"achievement"
    },
    {
      title:"Expenses",
      icon:"cash",
      color:"success",
      path:"expenses"
    },
    {
      title:"Studies",
      icon:"book",
      color:"tertiary",
      path:"studies"
    },
    {
      title:"Time",
      icon:"hourglass",
      color:"danger",
      path:"time"
    }
  ]
}
