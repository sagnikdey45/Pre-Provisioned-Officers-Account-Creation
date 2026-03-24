"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, UserPlus, Shield, Briefcase } from "lucide-react";
import { generatePassword } from "@/lib/generatePassword";
import { toast } from "sonner";

export default function AddOfficerDialog({ isOpen, onClose, onAddOfficer }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    state: "",
    city: "",
    region: "",
    department: "",
    role: "unit_officer",
    specialisation: "",
  });

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email) {
      toast.error("Fill required fields");
      return;
    }

    const newOfficer = {
      ...formData,
      password: generatePassword(formData.fullName, formData.dob),
    };

    onAddOfficer(newOfficer);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-3xl p-0 rounded-3xl h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-cyan-900 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 shadow-[0_40px_120px_rgba(0,0,0,0.25)] [&>button]:hidden"
      >
        {/* TOP GLOW BAR */}
        <div className="h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500" />

        {/* HEADER */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-cyan-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
                <UserPlus className="text-white w-5 h-5" />
              </div>

              <div>
                <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                  Add Officer
                </DialogTitle>
                <p className="text-xs text-teal-600 dark:text-cyan-300">
                  Pre-provision account for CityCare
                </p>
              </div>
            </div>

            {/* CUSTOM CLOSE ONLY */}
            <button
              onClick={onClose}
              className="
                p-2 rounded-xl
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition
              "
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-6">
          <Section title="Basic Information">
            <Grid>
              <StyledInput
                label="Full Name"
                placeholder="Sagnik Dey"
                value={formData.fullName}
                onChange={(v) => setFormData({ ...formData, fullName: v })}
              />
              <StyledInput
                label="Email"
                placeholder="sagnik@citycare.in"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
              />
              <StyledInput
                label="Phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v })}
              />
              <StyledInput
                type="date"
                label="DOB"
                value={formData.dob}
                onChange={(v) => setFormData({ ...formData, dob: v })}
              />
            </Grid>
          </Section>

          <Section title="Location Details">
            <Grid>
              <StyledInput
                label="State"
                placeholder="West Bengal"
                value={formData.state}
                onChange={(v) => setFormData({ ...formData, state: v })}
              />
              <StyledInput
                label="City"
                placeholder="Kolkata"
                value={formData.city}
                onChange={(v) => setFormData({ ...formData, city: v })}
              />
              <StyledInput
                label="Region"
                placeholder="KMC Zone"
                value={formData.region}
                onChange={(v) => setFormData({ ...formData, region: v })}
              />
              <StyledInput
                label="Department"
                placeholder="Sanitation"
                value={formData.department}
                onChange={(v) => setFormData({ ...formData, department: v })}
              />
            </Grid>
          </Section>

          <Section title="Role Selection">
            <div className="grid grid-cols-2 gap-4">
              <RoleCard
                active={formData.role === "unit_officer"}
                onClick={() =>
                  setFormData({ ...formData, role: "unit_officer" })
                }
                icon={<Shield size={16} />}
                title="Unit Officer"
                desc="Assign & verify issues"
              />

              <RoleCard
                active={formData.role === "field_officer"}
                onClick={() =>
                  setFormData({ ...formData, role: "field_officer" })
                }
                icon={<Briefcase size={16} />}
                title="Field Officer"
                desc="Execute ground tasks"
              />
            </div>

            {formData.role === "field_officer" && (
              <div className="mt-4">
                <StyledInput
                  label="Specialisation"
                  placeholder="Waste Management"
                  value={formData.specialisation}
                  onChange={(v) =>
                    setFormData({ ...formData, specialisation: v })
                  }
                />
              </div>
            )}
          </Section>
        </div>

        {/* FOOTER */}
        <DialogFooter className="px-6 py-4 border-t border-gray-200 dark:border-cyan-900 flex justify-end gap-3 backdrop-blur bg-white/80 dark:bg-slate-900/80">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:scale-[1.02] transition"
          >
            Add Officer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div
      className="
      rounded-2xl p-5
      bg-gradient-to-b from-white to-gray-50
      dark:from-slate-800/50 dark:to-slate-900/40
      border border-gray-200 dark:border-cyan-900
      shadow-sm
    "
    >
      <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-cyan-300">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function StyledInput({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs mb-1 block text-gray-600 dark:text-gray-300">
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          bg-white dark:bg-slate-800
          border-gray-300 dark:border-cyan-800
          focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-cyan-500
        "
      />
    </div>
  );
}

function RoleCard({ active, onClick, icon, title, desc }) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-2xl cursor-pointer border transition-all
        ${
          active
            ? "bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg scale-[1.02]"
            : "bg-white dark:bg-slate-800 border-gray-300 dark:border-cyan-800 hover:border-teal-400 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="text-xs opacity-80">{desc}</p>
    </div>
  );
}
