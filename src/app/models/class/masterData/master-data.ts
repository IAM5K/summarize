import { Features } from "../../interface/masterData.model";

export class MasterData {
  public static features:Features[] =[
    {
      title:"Goal",
      icon:"bulb",
      color:"secondary",
      path:"goal"
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
      title:"Achievements",
      icon:"trophy",
      color:"warning",
      path:"achievement"
    },
    {
      title:"Time",
      icon:"hourglass",
      color:"danger",
      path:"time"
    }
  ]
}
