"use client";

import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import EditOfficerDialog from "./EditOfficerDialog";
import { toast } from "sonner";

export default function OfficersTable({ officers, onOfficersUpdate }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null);

  const handleEdit = (officer, index) => {
    setEditingOfficer({ ...officer, index });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (updatedOfficer) => {
    const newOfficers = [...officers];
    const index = updatedOfficer.index;
    delete updatedOfficer.index;
    newOfficers[index] = updatedOfficer;
    onOfficersUpdate(newOfficers);
    toast.success("Officer updated!");
  };

  const handleDelete = (index) => {
    if (confirm("Delete this officer?")) {
      const newOfficers = officers.filter((_, i) => i !== index);
      onOfficersUpdate(newOfficers);
      toast.success("Officer deleted!");
    }
  };

  if (officers.length === 0) {
    return (
      <div className="h-64 sm:h-80 grid place-items-center rounded-2xl sm:rounded-3xl border-2 border-dashed border-teal-300 dark:border-cyan-700 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-slate-800/80 dark:to-slate-900/80">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-teal-900 dark:text-white mb-1 sm:mb-2">
            No Officers
          </h3>
          <p className="text-sm sm:text-base text-teal-700 dark:text-cyan-300">
            Upload CSV or add manually
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-teal-200/60 dark:border-cyan-700/60 shadow-xl transition-all duration-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 border-b-4 border-teal-400 dark:border-cyan-700 shadow-md dark:shadow-cyan-900/40 transition-colors duration-500">
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Email
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Phone
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  DOB
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  State
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  City
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Region / District
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Dept
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Specialisation
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Role
                </th>
                <th className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white dark:text-cyan-100 sticky right-0 bg-gradient-to-r from-cyan-700/90 to-teal-700/90 dark:from-slate-900/95 dark:to-slate-900/95 z-10 drop-shadow dark:drop-shadow-lg transition-colors duration-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {officers.map((officer, index) => (
                <tr
                  key={index}
                  className="border-b border-teal-100 dark:border-cyan-900/70 bg-white/90 dark:bg-slate-900/80 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/60 transition-colors duration-300"
                >
                  <td className="px-3 sm:px-4 py-3 font-semibold text-gray-900 dark:text-cyan-100 bg-white/90 dark:bg-slate-900/80 max-w-[120px] sm:max-w-[160px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.fullName}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 max-w-[140px] sm:max-w-[180px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.email}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 whitespace-nowrap text-xs sm:text-sm transition-colors duration-500">
                    {officer.phone}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 whitespace-nowrap text-xs sm:text-sm transition-colors duration-500">
                    {officer.dob}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 max-w-[80px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.state}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 max-w-[80px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.city}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 max-w-[80px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.region}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 max-w-[80px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.department}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 max-w-[100px] truncate text-xs sm:text-sm transition-colors duration-500">
                    {officer.specialisation}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm bg-white/90 dark:bg-slate-900/80 transition-colors duration-500">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-500 ${
                        officer.role === "unit_officer"
                          ? "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200"
                          : "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200"
                      }`}
                    >
                      {officer.role === "unit_officer" ? "UNIT" : "FIELD"}
                    </span>
                  </td>
                  <td
                    className="px-3 sm:px-4 py-3 sticky right-0 z-40 transition-colors duration-500"
                    style={{
                      background: "white",
                      boxShadow: "0 0 8px 2px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(officer, index)}
                        className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg border border-teal-200 shadow z-50"
                        tabIndex={0}
                        aria-label="Edit Officer"
                        style={{
                          background: "white",
                          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                          style={{ color: "#0d9488" }}
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg border border-red-200 shadow z-50"
                        tabIndex={0}
                        aria-label="Delete Officer"
                        style={{
                          background: "white",
                          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                          style={{ color: "#dc2626" }}
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 6v6m4-6v6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditOfficerDialog
        isOpen={isEditDialogOpen}
        officer={editingOfficer}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
}
