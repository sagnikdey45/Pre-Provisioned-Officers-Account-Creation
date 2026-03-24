"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Trash2,
  Plus,
  Download,
  Database,
  Edit3,
  X,
} from "lucide-react";
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
    if (officers.length === 0) {
      toast.error("No officers to submit!");
      return;
    }

    const result = transformOfficerData(officers);
    console.log("=== CITYCARE DATABASE SUBMISSION ===");
    console.log("USERS:", result.users);
    console.log("UNIT OFFICERS:", result.unitOfficers);
    console.log("FIELD OFFICERS:", result.fieldOfficers);
    console.log("====================================");

    toast.success(
      `Successfully submitted ${officers.length} officers to database!`,
    );
  };

  return (
    <div
      className="min-h-screen transition-all duration-500 
  bg-gradient-to-br from-teal-50 to-cyan-50 text-gray-900 
  dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-cyan-50 
  p-3 sm:p-6 md:p-8"
    >
      {/* Header Section */}
      <div
        className="max-w-7xl mx-auto mb-6 sm:mb-8 transition-all duration-500 
  bg-white/40 border-teal-200/40 
  dark:bg-slate-800/40 dark:border-cyan-700/40 
  backdrop-blur-sm rounded-2xl p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2 leading-tight pb-1">
              CityCare Admin
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-teal-700 dark:text-cyan-300 font-medium">
              Officer Onboarding Panel
            </p>
          </div>

          {/* Dark Mode Toggle & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <ModeToggle />

            <button
              onClick={handleSubmitToDatabase}
              disabled={officers.length === 0}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-cyan-600 dark:to-teal-500 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold rounded-2xl hover:from-teal-700 hover:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Database className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Add to Database</span>
              <span className="text-xs font-bold">({officers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width Upload, Table Below */}
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Upload Section - Full Width */}
        <div className="space-y-4 sm:space-y-6">
          {/* Add Officer Button - Top */}
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-cyan-600 dark:to-teal-500 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-teal-600 text-white dark:text-slate-950 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group flex-shrink-0"
              title="Add new officer"
            >
              <Plus className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* CSV Uploader */}
          <CSVUploader onOfficersUpdate={handleOfficersUpdate} />
        </div>

        {/* Table Section */}
        <div
          className="space-y-4 sm:space-y-6 
  bg-white/50 border-teal-200/30 
  dark:bg-slate-800/60 dark:border-cyan-700/50 
  backdrop-blur-sm rounded-2xl p-4 sm:p-6 transition-all duration-500"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span className="inline-block w-1 h-8 bg-gradient-to-b from-teal-600 to-cyan-600 rounded-full"></span>
              <span className="text-black dark:text-cyan-100 font-bold">
                Officers
              </span>{" "}
              <span className="ml-1 text-xs sm:text-base text-black dark:text-cyan-200 font-semibold">
                ({officers.length})
              </span>
            </h2>
            {officers.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Delete all officers? This cannot be undone.")) {
                    setOfficers([]);
                    toast.success("All officers deleted!");
                  }
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white dark:text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete All</span>
                <span className="sm:hidden">Delete</span>
              </button>
            )}
          </div>
          <OfficersTable
            officers={officers}
            onOfficersUpdate={handleOfficersUpdate}
          />
        </div>
      </div>

      {/* Add Officer Dialog */}
      <AddOfficerDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddOfficer={handleAddOfficer}
      />
    </div>
  );
}
