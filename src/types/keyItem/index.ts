import { EOperator } from "../operator";

export enum EKeyItemType {
  OPERATOR = "operator",
  VALUE = "value",
}

export interface IKeyItem {
  key: string | EOperator;
  label: string;
  type: EKeyItemType;
}
