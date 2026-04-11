"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { parseCSVFileA } from "@/lib/csvParser";
import { validateAdminData } from "@/lib/validateOfficerData";
import { toast } from "sonner";

export default function CSVUploader({ onOfficersUpdate }) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file?.name?.toLowerCase().endsWith(".csv")) {
      toast.error("Upload a valid CSV file");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const parsed = await parseCSVFileA(file);

      if (!parsed.length) {
        toast.error("No valid data found");
        return;
      }

      const validated = validateAdminData(parsed);

      if (!validated.length) {
        toast.error("Invalid CSV structure");
        return;
      }

      onOfficersUpdate(validated);
      setSuccess(true);

      toast.success(`Loaded ${validated.length}/${parsed.length} officers`);

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("CSV parsing failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("csv-upload")?.click()}
      className={`
        relative cursor-pointer rounded-2xl
        px-4 py-6 sm:px-6 sm:py-8 md:p-10

        transition-all duration-300 ease-out
        group

        border-2 border-dashed
        border-teal-500/50 
        dark:border-cyan-500/40
        bg-white dark:bg-slate-900
        shadow-sm dark:shadow-[0_10px_40px_rgba(0,255,255,0.08)]
        hover:scale-[1.015]
        hover:bg-teal-50/60 dark:hover:bg-slate-800
        hover:border-teal-600 dark:hover:border-cyan-400
        hover:shadow-lg dark:hover:shadow-[0_20px_60px_rgba(0,255,255,0.18)]

        ${
          dragActive
            ? `
          scale-[1.02]
          bg-teal-50 dark:bg-slate-800
          border-teal-600 dark:border-cyan-300
          shadow-xl
        `
            : ""
        }
      `}
    >
      {/* INPUT */}
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
        {/* ICON */}
        <div
          className={`
          w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
          rounded-xl sm:rounded-2xl flex items-center justify-center

          bg-gradient-to-br from-teal-500 to-cyan-600
          text-white

          shadow-md sm:shadow-lg
          transition-all duration-300

          ${
            dragActive
              ? "scale-110 shadow-cyan-500/40"
              : "group-hover:scale-105"
          }
        `}
        >
          {loading ? (
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : success ? (
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : dragActive ? (
            <UploadCloud className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : (
            <FileSpreadsheet className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          )}
        </div>

        {/* TEXT */}
        <div>
          <h2
            className="
            text-lg sm:text-xl md:text-2xl
            font-bold tracking-tight
            text-teal-800 dark:text-teal-300
          "
          >
            {loading
              ? "Processing CSV..."
              : success
                ? "Upload Successful!"
                : dragActive
                  ? "Drop your CSV here"
                  : "Upload City Admin CSV"}
          </h2>

          <p className="text-xs sm:text-sm mt-1 text-gray-600 dark:text-gray-400">
            Tap or drag & drop your CSV file
          </p>
        </div>

        {/* SUBTEXT */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-teal-600 dark:text-cyan-300">
          <Sparkles className="w-3 h-3" />
          Smart parsing • Auto validation • Clean import
        </div>
      </div>
    </div>
  );
}
