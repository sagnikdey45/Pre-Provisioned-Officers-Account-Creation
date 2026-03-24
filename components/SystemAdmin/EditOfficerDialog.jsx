"use client";

import { useState, useEffect } from "react";
import { X, Shield, Briefcase } from "lucide-react";
import { toast } from "sonner";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditOfficerDialog({
  isOpen,
  officer,
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (officer) setFormData(officer);
  }, [officer]);

  const validateForm = () => {
    const e = {};

    if (!formData.fullName?.trim()) e.fullName = "Required";
    if (!formData.email?.trim()) e.email = "Required";
    if (!formData.phone?.trim()) e.phone = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    onUpdate(formData);
    onClose();
  };

  if (!officer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* OVERLAY */}
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-md z-50" />

        {/* CONTENT */}
        <DialogPrimitive.Content
          className="
          fixed left-1/2 top-1/2 z-50 w-full max-w-3xl
          -translate-x-1/2 -translate-y-1/2
          rounded-3xl overflow-hidden p-0

          bg-gradient-to-b from-white via-gray-50 to-gray-100
          dark:from-slate-900 dark:via-slate-900 dark:to-slate-950

          border border-gray-200 dark:border-cyan-900
          shadow-[0_50px_150px_rgba(0,0,0,0.35)]

          [&>button]:hidden
        "
        >
          {/* TOP ACCENT */}
          <div className="h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500" />

          {/* HEADER */}
          <DialogHeader className="px-6 py-5 border-b border-gray-200 dark:border-cyan-900">
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Officer
                </DialogTitle>

                <DialogDescription className="text-sm text-teal-600 dark:text-cyan-300">
                  Update officer information and configuration
                </DialogDescription>
              </div>

              {/* ONLY CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </DialogHeader>

          {/* BODY */}
          <form
            onSubmit={handleSubmit}
            className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-6"
          >
            <Section title="Personal Information">
              <Grid>
                <Field
                  label="Full Name"
                  value={formData.fullName}
                  error={errors.fullName}
                  onChange={(v) => setFormData({ ...formData, fullName: v })}
                />
                <Field
                  label="Email"
                  value={formData.email}
                  error={errors.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                />
                <Field
                  label="Phone"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                />
                <Field
                  type="date"
                  label="DOB"
                  value={formData.dob}
                  onChange={(v) => setFormData({ ...formData, dob: v })}
                />
              </Grid>
            </Section>

            <Section title="Location Details">
              <Grid>
                <Field
                  label="State"
                  value={formData.state}
                  onChange={(v) => setFormData({ ...formData, state: v })}
                />
                <Field
                  label="City"
                  value={formData.city}
                  onChange={(v) => setFormData({ ...formData, city: v })}
                />
                <Field
                  label="Region"
                  value={formData.region}
                  onChange={(v) => setFormData({ ...formData, region: v })}
                />
                <Field
                  label="Department"
                  value={formData.department}
                  onChange={(v) => setFormData({ ...formData, department: v })}
                />
              </Grid>
            </Section>

            <Section title="Role Configuration">
              <div className="grid sm:grid-cols-2 gap-4">
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
                  desc="Execute tasks"
                />
              </div>

              {formData.role === "field_officer" && (
                <div className="mt-4">
                  <Field
                    label="Specialisation"
                    value={formData.specialisation}
                    onChange={(v) =>
                      setFormData({ ...formData, specialisation: v })
                    }
                  />
                </div>
              )}
            </Section>

            {/* FOOTER */}
            <DialogFooter className="pt-4 border-t border-gray-200 dark:border-cyan-900 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:scale-[1.02]"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

/* UI COMPONENTS */

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

function Field({ label, value, onChange, error, type = "text" }) {
  return (
    <div>
      <Label className="text-xs text-gray-600 dark:text-gray-300">
        {label}
      </Label>

      <Input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="
          mt-1 rounded-xl
          bg-white dark:bg-slate-800
          border-gray-300 dark:border-cyan-800

          focus-visible:ring-2 focus-visible:ring-teal-500
          dark:focus-visible:ring-cyan-500

          hover:border-teal-400 dark:hover:border-cyan-400
        "
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
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
