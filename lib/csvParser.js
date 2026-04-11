// lib/csvParser.js
import Papa from "papaparse";

/**
 * Normalize headers → snake_case
 */
const normalizeKey = (key) =>
  key
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

/**
 * Map CSV row → Standard Officer Schema
 */
const mapRow = (row) => {
  const r = {};

  Object.keys(row).forEach((key) => {
    r[normalizeKey(key)] = row[key];
  });

  return {
    fullName: r.fullname || r.name || "",
    email: r.email || "",
    dob: r.dob || r.date_of_birth || "",
    phone: r.phone || r.mobile || "",
    state: r.state || "",
    city: r.city || "",
    region: r.region || r.district || "",
    district: r.district || r.region || "",
    department: r.department || r.dept || "",
    role: r.role || "",
    specialisation: r.specialisation || r.specialization || "",
    password: r.password || "",
  };
};

/**
 * Map CSV row → Standard City Admin Schema
 */
const mapRowAdmin = (row) => {
  const r = {};

  Object.keys(row).forEach((key) => {
    r[normalizeKey(key)] = row[key];
  });

  return {
    fullName: r.fullname || r.name || "",
    email: r.email || "",
    dob: r.dob || r.date_of_birth || "",
    phone: r.phone || r.mobile || "",
    state: r.state || "",
    city: r.city || "",
    district: r.district || r.region || "",
    password: r.password || "",
  };
};

/**
 * Parse CSV File using PapaParse for the Officer (Unit/Field)
 */
export const parseCSVFileO = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const mapped = results.data
            .map(mapRow)
            .filter((row) => row.fullName && row.email);

          resolve(mapped);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
};

/**
 * Parse CSV File using PapaParse for the Officer (Unit/Field)
 */
export const parseCSVFileA = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const mapped = results.data
            .map(mapRowAdmin)
            .filter((row) => row.fullName && row.email);

          resolve(mapped);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
};
