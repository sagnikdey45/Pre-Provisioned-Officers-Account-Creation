"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { parseCSVFile } from "@/lib/csvParser";
import { validateOfficerData } from "@/lib/validateOfficerData";
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
      const parsed = await parseCSVFile(file);

      if (!parsed.length) {
        toast.error("No valid data found");
        return;
      }

      const validated = validateOfficerData(parsed);

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
        relative cursor-pointer rounded-3xl 
        px-4 py-6 sm:px-6 sm:py-8 md:p-10
        transition-all duration-500
        overflow-hidden group
        ${dragActive ? "scale-[1.01]" : "hover:scale-[1.01]"}
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

      {/* 🌈 GRADIENT BORDER */}
      <div
        className="
        absolute inset-0 rounded-3xl p-[1.5px]
        bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500
        opacity-80 group-hover:opacity-100 transition
      "
      >
        <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900" />
      </div>

      {/* INNER GLOW */}
      <div
        className={`
        absolute inset-0 rounded-3xl transition
        ${dragActive ? "bg-teal-500/10 dark:bg-cyan-500/10" : ""}
      `}
      />

      {/* CONTENT */}
      <div className="relative flex flex-col items-center text-center gap-4 sm:gap-6">
        {/* ICON */}
        <div
          className={`
          w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
          rounded-2xl sm:rounded-3xl flex items-center justify-center
          bg-gradient-to-br from-teal-500 to-cyan-600
          shadow-lg sm:shadow-xl transition-all duration-500
          ${
            dragActive
              ? "scale-105 shadow-cyan-500/40"
              : "group-hover:scale-105"
          }
        `}
        >
          {loading ? (
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : success ? (
            <CheckCircle2 className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : dragActive ? (
            <UploadCloud className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : (
            <FileSpreadsheet className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
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
                  : "Upload Officers CSV"}
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

      {/* BACKGROUND EFFECT */}
      <div
        className="
        absolute inset-0 opacity-20 pointer-events-none
        bg-[radial-gradient(circle_at_30%_30%,#14b8a6,transparent_40%)]
        animate-pulse
      "
      />
    </div>
  );
}
