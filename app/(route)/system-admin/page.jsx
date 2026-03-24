"use client";

import { useState } from "react";
import { Plus, Database, Trash2, Users, UploadCloud } from "lucide-react";

import CSVUploader from "@/components/SystemAdmin/CSVUploader";
import OfficersTable from "@/components/SystemAdmin/OfficersTable";
import AddOfficerDialog from "@/components/SystemAdmin/AddOfficerDialog";
import { transformOfficerData } from "@/lib/transformData";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";

export default function SystemAdminPage() {
  const [officers, setOfficers] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleOfficersUpdate = (newOfficers) => {
    setOfficers(newOfficers);
  };

  const handleAddOfficer = (officer) => {
    setOfficers((prev) => [...prev, officer]);
    toast.success("Officer added successfully!");
  };

  const handleSubmitToDatabase = () => {
    if (!officers.length) {
      toast.error("No officers to submit!");
      return;
    }

    const result = transformOfficerData(officers);

    console.log("=== CITYCARE DATABASE SUBMISSION ===");
    console.log(result);
    console.log("====================================");

    toast.success(`Submitted ${officers.length} officers`);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-950 px-4 sm:px-6 py-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold 
            bg-gradient-to-r from-teal-600 to-cyan-600 
            dark:from-teal-400 dark:to-cyan-400 
            bg-clip-text text-transparent"
          >
            Officer Management
          </h1>

          <p className="text-sm text-teal-700/80 dark:text-cyan-300/80 mt-1">
            Pre-provision and manage officer accounts efficiently
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 flex-wrap">
          <ModeToggle />
          
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              bg-gradient-to-r from-teal-600 to-cyan-600
              hover:from-teal-700 hover:to-cyan-700
              text-white font-medium shadow-md hover:shadow-lg
              transition-all duration-300 active:scale-95
            "
          >
            <Plus className="w-4 h-4" />
            Add Officer
          </button>

          <button
            onClick={handleSubmitToDatabase}
            disabled={!officers.length}
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              border border-teal-300 dark:border-cyan-700
              text-teal-700 dark:text-cyan-300
              hover:bg-teal-50 dark:hover:bg-cyan-900/30
              font-medium shadow-sm transition-all duration-300
              disabled:opacity-50
            "
          >
            <Database className="w-4 h-4" />
            Submit ({officers.length})
          </button>
        </div>
      </div>

      {/* ================= UPLOAD SECTION ================= */}
      <div
        className="
        bg-white dark:bg-slate-900
        border border-teal-100 dark:border-cyan-800
        rounded-2xl p-5 shadow-sm hover:shadow-md
        transition-all duration-300
      "
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-cyan-900/30">
            <UploadCloud className="w-5 h-5 text-teal-600 dark:text-cyan-300" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Bulk Upload
          </h2>
        </div>

        <CSVUploader onOfficersUpdate={handleOfficersUpdate} />
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div
        className="
        bg-white dark:bg-slate-900
        border border-teal-100 dark:border-cyan-800
        rounded-2xl p-5 shadow-sm hover:shadow-md
        transition-all duration-300 space-y-4
      "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-100 dark:bg-cyan-900/30">
              <Users className="w-5 h-5 text-teal-600 dark:text-cyan-300" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Officers ({officers.length})
            </h2>
          </div>

          {officers.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Delete all officers?")) {
                  setOfficers([]);
                  toast.success("All officers deleted");
                }
              }}
              className="
                flex items-center gap-2 px-3 py-2 rounded-lg
                bg-red-500 hover:bg-red-600
                text-white text-sm font-medium
                shadow-sm hover:shadow-md transition
              "
            >
              <Trash2 className="w-4 h-4" />
              Delete All
            </button>
          )}
        </div>

        {/* TABLE */}
        <OfficersTable
          officers={officers}
          onOfficersUpdate={handleOfficersUpdate}
        />
      </div>

      {/* ================= DIALOG ================= */}
      <AddOfficerDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddOfficer={handleAddOfficer}
      />
    </div>
  );
}
