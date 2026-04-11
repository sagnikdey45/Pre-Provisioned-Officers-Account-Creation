"use client";

import { useState } from "react";
import {
  Edit3,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Map,
  Building2,
  User,
  Calendar,
  Briefcase,
  Shield,
  PenBox,
} from "lucide-react";

import EditCityAdminDialog from "./EditCityAdminDialog";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export default function CityAdminTable({ officers, onOfficersUpdate }) {
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
      <div className="h-72 grid place-items-center rounded-3xl border-2 border-dashed border-teal-400/40 dark:border-cyan-700/40 bg-gradient-to-br from-teal-100/40 to-cyan-100/40 dark:from-slate-900 dark:to-slate-950">
        <div className="text-center">
          <h3 className="text-xl font-bold text-teal-800 dark:text-white">
            No Officers
          </h3>
          <p className="text-teal-600 dark:text-cyan-300 text-sm">
            Upload CSV or add manually
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= MOBILE + TABLET (CARDS) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5">
        {officers.map((officer, index) => (
          <Card
            key={index}
            className="rounded-3xl border border-teal-400/30 dark:border-cyan-700/40 
            bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-5 space-y-4">
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-teal-700 dark:text-teal-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {officer.fullName}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {officer.email}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {officer.phone}
                </p>

                <p className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {officer.dob}
                </p>

                <p className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {officer.city}, {officer.state}
                </p>

                <p className="flex items-center gap-1">
                  <Map className="w-3 h-3" /> {officer.district}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 pt-2 border-t border-teal-200 dark:border-cyan-800">
                <button
                  onClick={() => handleEdit(officer, index)}
                  className="p-2 rounded-xl bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/40 dark:hover:bg-teal-800/60 transition"
                >
                  <Edit3 className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-800/60 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl border border-teal-400/30 dark:border-cyan-700/40 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                <th className="px-4 py-3 text-left">Officer</th>
                <th className="px-4 py-3 text-left">Date of Birth</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {officers.map((officer, index) => (
                <tr
                  key={index}
                  className="border-b border-teal-100 dark:border-cyan-900 hover:bg-teal-50 dark:hover:bg-cyan-950/40 transition"
                >
                  {/* NAME */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {officer.fullName}
                    </div>
                  </td>

                  <td>
                    <div className="text-xs text-gray-500">{officer.dob}</div>
                </td>

                  {/* CONTACT */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    <div>{officer.email}</div>
                  </td>

                  <td>
                    <div className="text-xs">{officer.phone}</div>
                </td>

                  {/* LOCATION */}
                  <td className="px-4 py-3">
                    {officer.city}, {officer.state}
                  </td>

                  {/* REGION */}
                  <td>
                    <div className="text-xs text-gray-500">
                      {officer.district}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(officer, index)}
                        className="p-2 rounded-lg bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/40 dark:hover:bg-teal-800/60 transition"
                      >
                        <PenBox className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-800/60 transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditCityAdminDialog
        isOpen={isEditDialogOpen}
        officer={editingOfficer}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
}
