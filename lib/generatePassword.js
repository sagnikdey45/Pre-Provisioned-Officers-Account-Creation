export const generatePassword = (fullName = "", dob = "") => {
  if (!fullName || !dob) return "DefaultPass@123";

  // Split name
  const names = fullName.trim().split(" ").filter(Boolean);

  if (names.length === 0) return "DefaultPass@123";

  // Get initials
  const initials = names.map((n) => n[0].toUpperCase()).join("");

  // First name (capitalized properly)
  const firstName =
    names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();

  // Extract numbers from DOB
  const digits = dob.replace(/\D/g, "");

  let formattedDOB = "";

  if (digits.length === 8) {
    // If already DDMMYYYY or YYYYMMDD — assume DDMMYYYY if starts with day
    formattedDOB = digits;
  } else if (digits.length === 7) {
    // Handle single-digit day/month like 2032000 → 02032000
    const day = digits.slice(0, 1).padStart(2, "0");
    const month = digits.slice(1, 3).padStart(2, "0");
    const year = digits.slice(3);
    formattedDOB = `${day}${month}${year}`;
  } else {
    return "DefaultPass@123";
  }

  return `${initials}@${firstName}${formattedDOB}`;
};
