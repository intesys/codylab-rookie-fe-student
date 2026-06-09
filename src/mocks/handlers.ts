import { appointments } from "@mocks/fixtures/appointments";
import { materials } from "@mocks/fixtures/materials";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/msw/appointmentsByDate", () => HttpResponse.json(appointments)),

  http.get("/msw/materials", () => HttpResponse.json(materials)),
];
