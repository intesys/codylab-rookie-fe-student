import { PatientFilterDTO } from "@generated/axios";
import React, { Dispatch } from "react";
import { Action } from "./lib";

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {} as PatientFilterDTO,
  dispatch: (action: Action) => {},
});
