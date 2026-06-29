import { appointments } from "@mocks/fixtures/appointments";
import { doctors } from "@mocks/fixtures/doctors";
import { materials } from "@mocks/fixtures/materials";
import { patients } from "@mocks/fixtures/patients";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/msw/appointmentsByDate", () => HttpResponse.json(appointments)),
  http.get("/msw/materials", () => HttpResponse.json(materials)),
  http.post("http://localhost:8090/api/patient/filter", () => HttpResponse.json(patients)),
  http.get("http://localhost:8090/api/patient/:id", ({ params }) => {
    const patient = patients.find((p) => p.id === Number(params.id));
    return patient ? HttpResponse.json(patient) : HttpResponse.json(null, { status: 404 });
  }),
  http.post("http://localhost:8090/api/doctor/filter", () => HttpResponse.json(doctors)),
  http.get("http://localhost:8090/api/doctor/:id", ({ params }) => {
    const doctor = doctors.find((d) => d.id === Number(params.id));
    return doctor ? HttpResponse.json(doctor) : HttpResponse.json(null, { status: 404 });
  }),
];
