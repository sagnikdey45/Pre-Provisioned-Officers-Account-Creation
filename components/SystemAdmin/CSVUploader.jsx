"use client";

import { useState, DragEvent } from "react";
import { Upload } from "lucide-react";
import { validateOfficerData } from "@/lib/validateOfficerData";
import { toast } from "sonner";

export default function CSVUploader({ onOfficersUpdate }) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const parseCSV = (csvText) => {
    try {
      const lines = csvText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length < 2) {
        throw new Error("No data rows found");
      }

      const rawHeaders = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/["']/g, ""));
      const headers = rawHeaders.map((h) =>
        h
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, ""),
      );

      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i]
          .split(",")
          .map((v) => v.trim().replace(/["']/g, ""));

        if (values.length === 0 || values.every((v) => v === "")) continue;

        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        const standardRow = {
          fullName:
            row.fullname || row.name || row["full_name"] || row.full_name || "",
          email: row.email || row["e_mail"] || row.emails || "",
          dob:
            row.dob ||
            row["date_of_birth"] ||
            row.birthdate ||
            row["date_of_birth"] ||
            "",
          phone:
            row.phone ||
            row.mobile ||
            row.phonenumber ||
            row["phone_number"] ||
            "",
          state: row.state || row.states || "",
          city: row.city || row.cities || "",
          region:
            row.region ||
            row.regions ||
            row.zone ||
            row.district ||
            row["district_region"] ||
            row.taluka ||
            "",
          district: row.district || row.region || "",
          department: row.department || row.dept || row.departments || "",
          role: row.role || row.roles || "",
          specialisation:
            row.specialisation || row.specialization || row.spec || "",
          password: row.password || row.pass || "",
        };

        if (standardRow.fullName && standardRow.email) {
          data.push(standardRow);
        }
      }

      return data;
    } catch (error) {
      console.error("CSV Parse Error:", error);
      return [];
    }
  };

  const handleFileUpload = async (file) => {
    if (!file.name.toLowerCase().includes(".csv")) {
      toast.error("❌ Please upload a CSV file only");
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      console.log("📄 CSV Preview:", text.substring(0, 300));

      const rawData = parseCSV(text);
      if (rawData.length === 0) {
        toast.error("❌ No valid data found in CSV");
        return;
      }

      console.log("📊 Raw parsed:", rawData[0]);

      const validatedOfficers = validateOfficerData(rawData);

      if (validatedOfficers.length === 0) {
        toast.error(
          "❌ No valid officers. Check: fullName, email, role required",
        );
        return;
      }

      onOfficersUpdate(validatedOfficers);
      toast.success(
        `✅ Loaded ${validatedOfficers.length}/${rawData.length} officers!`,
      );
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("❌ Failed to process CSV file");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragover" || e.type === "dragenter");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find((f) => f.name.toLowerCase().endsWith(".csv"));
    if (csvFile) {
      handleFileUpload(csvFile);
    } else {
      toast.error("Please drop a CSV file");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
      e.target.value = "";
    }
  };

  return (
    <div
      className={`
        relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-dashed cursor-pointer
        transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]
        backdrop-blur-xl group
        ${
          dragActive
            ? "border-cyan-500 bg-cyan-50/90 dark:bg-cyan-900/40 shadow-2xl ring-4 ring-cyan-500/30 scale-[1.03]"
            : "border-teal-200/70 dark:border-cyan-900/70 hover:border-teal-400/70 dark:hover:border-cyan-400/70 bg-white/70 dark:bg-slate-800/40 hover:bg-white/90 dark:hover:bg-slate-700/50"
        }
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById("csv-upload")?.click()}
    >
      <input
        id="csv-upload"
        type="file"
        accept=".csv,application/csv,text/csv,text/plain"
        className="hidden"
        onChange={handleFileSelect}
        disabled={loading}
      />

      <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
        <div
          className={`
          w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl
          transition-all duration-300 group-hover:scale-110
          ${
            loading
              ? "bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600 animate-pulse"
              : dragActive
                ? "bg-gradient-to-br from-cyan-500 to-teal-600 dark:from-cyan-600 dark:to-teal-700 shadow-cyan-500/40"
                : "bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 shadow-teal-500/40"
          }
        `}
        >
          {loading ? (
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-white/30 dark:border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          )}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 dark:from-teal-300 dark:to-cyan-200 bg-clip-text text-transparent">
            {loading
              ? "🔄 Processing..."
              : dragActive
                ? "Drop CSV Here!"
                : "Upload CSV"}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-teal-700 dark:text-cyan-200 font-medium">
            Drag & drop or click to upload officer data
          </p>
          <div className="text-xs sm:text-sm bg-teal-100/70 dark:bg-cyan-900/40 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-mono text-teal-800 dark:text-cyan-200 border border-teal-200/80 dark:border-cyan-800/60">
            fullName, email, dob, phone, state, city, region / district,
            department, role
          </div>
        </div>
      </div>

      {dragActive && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 dark:from-teal-500/30 to-transparent 
                        rounded-2xl sm:rounded-3xl flex items-center justify-center text-base sm:text-xl font-bold 
                        text-cyan-800 dark:text-teal-200 pointer-events-none"
        >
          <div className="animate-bounce">👇 DROP CSV 👇</div>
        </div>
      )}
    </div>
  );
}
