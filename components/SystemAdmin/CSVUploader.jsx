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
        relative cursor-pointer rounded-3xl p-10 transition-all duration-500
        overflow-hidden group
        ${dragActive ? "scale-[1.015]" : "hover:scale-[1.01]"}
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
        className={`
        absolute inset-0 rounded-3xl p-[1.5px]
        bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500
        opacity-70 group-hover:opacity-100 transition
      `}
      >
        <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900" />
      </div>

      {/* ✨ INNER GLOW */}
      <div
        className={`
        absolute inset-0 rounded-3xl transition
        ${dragActive ? "bg-teal-500/10 dark:bg-cyan-500/10" : "bg-transparent"}
      `}
      />

      {/* 💡 CONTENT */}
      <div className="relative flex flex-col items-center text-center gap-6">
        {/* ICON */}
        <div
          className={`
          w-20 h-20 rounded-3xl flex items-center justify-center
          bg-gradient-to-br from-teal-500 to-cyan-600
          shadow-xl transition-all duration-500
          ${
            dragActive
              ? "scale-110 shadow-cyan-500/40"
              : "group-hover:scale-105"
          }
        `}
        >
          {loading ? (
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : success ? (
            <CheckCircle2 className="text-white w-10 h-10" />
          ) : dragActive ? (
            <UploadCloud className="text-white w-10 h-10" />
          ) : (
            <FileSpreadsheet className="text-white w-10 h-10" />
          )}
        </div>

        {/* TEXT */}
        <div>
          <h2
            className="text-2xl font-bold tracking-tight
            text-teal-800 dark:text-teal-300"
          >
            {loading
              ? "Processing CSV..."
              : success
                ? "Upload Successful!"
                : dragActive
                  ? "Drop your CSV here"
                  : "Upload Officers CSV"}
          </h2>

          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
            Drag & drop or click to upload your dataset
          </p>
        </div>

        {/* FORMAT BOX */}
        <div
          className="
          bg-gradient-to-br from-teal-50 to-cyan-50
          dark:from-cyan-900/20 dark:to-teal-900/20
          border border-teal-300/40 dark:border-cyan-700/40
          rounded-xl px-4 py-2 text-xs font-mono
          text-teal-800 dark:text-cyan-200 shadow-sm
        "
        >
          fullName, email, dob, phone, state, city, region, department, role
        </div>

        {/* SUBTEXT */}
        <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-cyan-300">
          <Sparkles className="w-3 h-3" />
          Smart parsing • Auto validation • Clean import
        </div>
      </div>

      {/* 🌊 SUBTLE ANIMATED BACKGROUND */}
      <div
        className={`
        absolute inset-0 opacity-20 pointer-events-none
        bg-[radial-gradient(circle_at_30%_30%,#14b8a6,transparent_40%)]
        animate-pulse
      `}
      />
    </div>
  );
}
