import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import React from "react";

import { Link, useNavigate } from "react-router-dom";

const StaffMember: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* CSS interno per gli effetti visivi di tutti i bottoni e le icone */}
      <style>{`
        .btn-custom-delete {
          background-color: #ffffff !important;
          color: #d92525 !important;
          border: 1px solid #d92525 !important;
          transition: all 0.15s ease-in-out;
        }
        .btn-custom-delete:hover {
          background-color: #fff5f5 !important;
          box-shadow: 0 2px 4px rgba(217, 37, 37, 0.15);
        }
        .btn-custom-delete:active {
          transform: scale(0.96);
        }

        .btn-custom-record {
          background-color: #ffffff !important;
          color: #d92525 !important;
          border: 1px solid #d92525 !important;
          transition: all 0.15s ease-in-out;
        }
        .btn-custom-record:hover {
          background-color: #fff5f5 !important;
          box-shadow: 0 2px 4px rgba(217, 37, 37, 0.15);
        }
        .btn-custom-record:active {
          transform: scale(0.96);
        }

        .icon-edit-pencil {
          cursor: pointer;
          transition: all 0.15s ease-in-out;
        }
        .icon-edit-pencil:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 1px 2px rgba(255, 0, 0, 0.2));
        }
        .icon-edit-pencil:active {
          transform: scale(0.9);
        }

        .icon-delete-row {
          color: #dc3545 !important;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
        }
        .icon-delete-row:hover {
          transform: scale(1.2);
          color: #bd1d1d !important;
        }
        .icon-delete-row:active {
          transform: scale(0.85);
        }
      `}</style>

      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {/*informazioni Patient*/}
          Carlo Marchiori
        </BreadcrumbEl>
      </Breadcrumb>

      {/*Patient detail*/}
      <div
        style={{
          fontSize: "14px",
          fontFamily: "sans-serif",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        {/*Intestazione: Info Principali Paziente*/}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: "15px 20px",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#0056b3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              CM
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ margin: 0, color: "#333", fontSize: "22px", lineHeight: "1.2" }}>
                  Carlo <span style={{ fontWeight: "bold" }}>Marchiori</span>
                </h2>
                {/*Matita*/}
                <svg
                  className="icon-edit-pencil"
                  onClick={() => navigate(`${getPath(PATIENTS_PATH)}/3/edit`)}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
              <div style={{ color: "#666", fontSize: "13px", marginTop: "4px" }}>Via Strade Perdute, 3</div>
            </div>
          </div>

          <button
            className="btn-custom-delete"
            style={{
              padding: "8px 18px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/*Cestino nel bottone principale*/}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            DELETE
          </button>
        </div>

        {/*Contenuto Inferiore*/}
        <div style={{ display: "flex", gap: "25px", alignItems: "flex-start" }}>
          {/*Informazioni Sanitarie*/}
          <div
            style={{
              width: "280px",
              backgroundColor: "#343a40",
              color: "#ffffff",
              borderRadius: "4px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                borderBottom: "1px solid #495057",
                paddingBottom: "10px",
                fontSize: "12px",
                letterSpacing: "1px",
                color: "#a8b2bd",
              }}
            >
              HEALTH INFORMATION
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <div style={{ fontSize: "11px", color: "#a8b2bd" }}>PATIENT ID</div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>3</div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <div style={{ fontSize: "11px", color: "#a8b2bd" }}>OPD</div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>1222</div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", color: "#a8b2bd" }}>BLOOD GROUP</div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ff6b6b" }}>B-</div>
            </div>

            <div style={{ borderTop: "1px solid #495057", paddingTop: "15px", fontSize: "13px" }}>
              <div style={{ marginBottom: "10px" }}>
                <strong>Notes:</strong>
              </div>
              <div style={{ marginBottom: "15px", color: "#e9ecef" }}>CHRONIC PATIENT: YES</div>

              {/*Orologio*/}
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a8b2bd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <div style={{ fontSize: "11px", color: "#a8b2bd" }}>Last admission:</div>
                  <div>22.05.2023</div>
                </div>
              </div>
              {/*Foglio Clinico*/}
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a8b2bd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <div>
                  <div style={{ fontSize: "11px", color: "#a8b2bd" }}>Reason of visit:</div>
                  <div>Dolor, no te me pasa più</div>
                </div>
              </div>

              {/*Valigetta*/}
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a8b2bd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <div>
                  <div style={{ fontSize: "11px", color: "#a8b2bd" }}>Treatment made:</div>
                  <div>—</div>
                </div>
              </div>
            </div>

            {/*Ultimo Medico*/}
            <div style={{ borderTop: "1px solid #495057", paddingTop: "15px", fontSize: "12px" }}>
              <div style={{ color: "#a8b2bd", marginBottom: "10px", fontSize: "11px" }}>
                ULTIMO DOTTORE CHE HA VISITATO IL PAZIENTE
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Alessandro Falezza</div>
                </div>
              </div>

              {/*Telefono*/}
              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>3490011222</span>
              </div>

              {/*Mail*/}
              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  wordBreak: "break-all",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>email.chenonghe2@gmail.com</span>
              </div>
            </div>
          </div>

          {/*TABELLA RECORDS*/}
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h3 style={{ margin: 0, color: "#333", fontSize: "18px" }}>Records</h3>
              <button
                className="btn-custom-record"
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                + RECORD
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #dee2e6", color: "#6c757d" }}>
                  <th style={{ padding: "12px 8px", fontWeight: "600" }}>Date</th>
                  <th style={{ padding: "12px 8px", fontWeight: "600" }}>Type of</th>
                  <th style={{ padding: "12px 8px", fontWeight: "600" }}>Reason</th>
                  <th style={{ padding: "12px 8px", fontWeight: "600" }}>Treatment made</th>
                  <th style={{ padding: "12px 8px", fontWeight: "600" }}>Doctor</th>
                  <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "600" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td style={{ padding: "12px 8px" }}>22.05.2023</td>
                  <td style={{ padding: "12px 8px" }}>—</td>
                  <td style={{ padding: "12px 8px" }}>Dolor, no te me pasa più</td>
                  <td style={{ padding: "12px 8px" }}>—</td>
                  <td style={{ padding: "12px 8px" }}>Alessandro Falezza</td>
                  <td style={{ padding: "12px 8px", textAlign: "center" }}>
                    {/* Cestino tabella riga 1 */}
                    <svg
                      className="icon-delete-row"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td style={{ padding: "12px 8px" }}>21.05.2023</td>
                  <td style={{ padding: "12px 8px" }}>—</td>
                  <td style={{ padding: "12px 8px" }}>Dolor, sto mal n'altra volta</td>
                  <td style={{ padding: "12px 8px" }}>—</td>
                  <td style={{ padding: "12px 8px" }}>Filippo Dolci</td>
                  <td style={{ padding: "12px 8px", textAlign: "center" }}>
                    {/* Cestino tabella riga 2 */}
                    <svg
                      className="icon-delete-row"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td style={{ padding: "12px 8px" }}>21.05.2023</td>
                  <td style={{ padding: "12px 8px" }}>—</td>
                  <td style={{ padding: "12px 8px" }}>Dolor, sto sempre mal</td>
                  <td style={{ padding: "12px 8px" }}>—</td>
                  <td style={{ padding: "12px 8px" }}>Filippo Dolci</td>
                  <td style={{ padding: "12px 8px", textAlign: "center" }}>
                    {/* Cestino tabella riga 3 */}
                    <svg
                      className="icon-delete-row"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMember;

//import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
//import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
//import { PATIENTS_PATH } from "@config/paths";
//import { getPath } from "@lib/utils";
//import React from "react";
//import { Link } from "react-router-dom";

//const StaffMember: React.FC = () => {
//return (
//<div>
//<Breadcrumb>
//<BreadcrumbEl>
//<Link to={getPath(PATIENTS_PATH)}>Patients</Link>
//</BreadcrumbEl>
//<BreadcrumbEl active>{/* Patient name and surname */}</BreadcrumbEl>
//</Breadcrumb>
//{/* Patient detail page */}
//</div>
//);
//};

//export default StaffMember;
