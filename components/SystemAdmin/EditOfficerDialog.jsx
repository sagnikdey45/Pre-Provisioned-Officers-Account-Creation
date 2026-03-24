"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
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

  useEffect(() => {
    setErrors({}); // Clear errors on form data change
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName?.trim()) newErrors.fullName = "Required";

    if (!formData.email?.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.phone?.trim()) newErrors.phone = "Required";
    else if (formData.phone.replace(/\D/g, "").length !== 10)
      newErrors.phone = "10 digits only";

    if (!formData.dob?.trim()) newErrors.dob = "Required";
    if (!formData.state?.trim()) newErrors.state = "Required";
    if (!formData.city?.trim()) newErrors.city = "Required";
    if (!formData.region?.trim()) newErrors.region = "Required";
    if (!formData.department?.trim()) newErrors.department = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 
          rounded-3xl bg-white dark:bg-slate-900 shadow-2xl overflow-hidden p-0 border-0"
        >
          {/* HEADER */}
          <DialogHeader
            className="px-6 py-5 border-b border-teal-400/30 dark:border-cyan-700/30 
          bg-gradient-to-r from-teal-200/40 via-cyan-200/30 to-green-200/40
          dark:from-teal-900/30 dark:via-cyan-900/20 dark:to-green-900/30"
          >
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                  Edit Officer Details
                </DialogTitle>

                <DialogDescription className="text-gray-700 dark:text-gray-400 text-sm mt-1">
                  Update officer information and role configuration.
                </DialogDescription>
              </div>

              {/* ONLY CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-red-500/10 transition"
              >
                <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </DialogHeader>

          {/* BODY */}
          <form
            onSubmit={handleSubmit}
            className="max-h-[65vh] overflow-y-auto px-6 py-6 space-y-6"
          >
            <Section title="Personal Information">
              <FieldGrid>
                <Field
                  label="Full Name"
                  value={formData.fullName}
                  error={errors.fullName}
                  onChange={(v) => setFormData({ ...formData, fullName: v })}
                />
                <Field
                  label="Email"
                  type="email"
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
                  label="DOB"
                  type="date"
                  value={formData.dob}
                  error={errors.dob}
                  onChange={(v) => setFormData({ ...formData, dob: v })}
                />
              </FieldGrid>
            </Section>

            <Section title="Location Details">
              <FieldGrid>
                <Field
                  label="State"
                  value={formData.state}
                  error={errors.state}
                  onChange={(v) => setFormData({ ...formData, state: v })}
                />
                <Field
                  label="City"
                  value={formData.city}
                  error={errors.city}
                  onChange={(v) => setFormData({ ...formData, city: v })}
                />
                <Field
                  label="Region / District"
                  value={formData.region}
                  error={errors.region}
                  onChange={(v) => setFormData({ ...formData, region: v })}
                />
                <Field
                  label="Department"
                  value={formData.department}
                  error={errors.department}
                  onChange={(v) => setFormData({ ...formData, department: v })}
                />
              </FieldGrid>
            </Section>

            <Section title="Role Configuration">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 dark:text-gray-400">
                    Role
                  </Label>

                  <select
                    value={formData.role || "unit_officer"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full mt-1 rounded-xl border border-teal-400/50 dark:border-cyan-600/50
                    px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-white
                    focus:outline-none !ring-0 focus:!ring-2 focus:!ring-teal-500 dark:focus:!ring-cyan-400
                    focus:!border-teal-500 dark:focus:!border-cyan-400"
                  >
                    <option value="unit_officer">Unit Officer</option>
                    <option value="field_officer">Field Officer</option>
                  </select>
                </div>

                {formData.role === "field_officer" && (
                  <Field
                    label="Specialisation"
                    value={formData.specialisation}
                    onChange={(v) =>
                      setFormData({ ...formData, specialisation: v })
                    }
                  />
                )}
              </div>
            </Section>

            {/* FOOTER */}
            <DialogFooter className="pt-4 border-t border-teal-400/30 dark:border-cyan-700/30">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl border-teal-500 dark:border-cyan-600 hover:bg-teal-100 dark:hover:bg-cyan-900/30"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 
                hover:from-teal-700 hover:to-cyan-700 shadow-lg"
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

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div
      className="rounded-2xl p-4 border border-teal-400/20 dark:border-cyan-700/30 
    bg-white dark:bg-slate-900 shadow-sm"
    >
      <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FieldGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  );
}

function Field({ label, value, onChange, error, type = "text" }) {
  return (
    <div>
      <Label className="text-xs font-semibold text-gray-700 dark:text-gray-400">
        {label}
      </Label>

      <Input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`
          mt-1 rounded-xl border 
          bg-white dark:bg-slate-900 
          text-gray-900 dark:text-white
          focus:outline-none !ring-0
          focus:!ring-2 focus:!ring-teal-500 dark:focus:!ring-cyan-400
          focus:!border-teal-500 dark:focus:!border-cyan-400
          hover:border-teal-500 dark:hover:border-cyan-500
          ${error ? "border-red-500 focus:!ring-red-500" : "border-teal-400/50 dark:border-cyan-700/40"}
        `}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
