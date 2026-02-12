"use client";

import { useState } from "react";
import { ContinueButton } from "./continue-button";

type Field = {
  key: string;
  label: string;
  type: "text" | "email" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
};

export function StepInput({
  question,
  subtitle,
  fields,
  onSubmit,
}: {
  question: string;
  subtitle?: string;
  fields: Field[];
  onSubmit: (values: Record<string, string>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  const allRequiredFilled = fields
    .filter((f) => f.required)
    .every((f) => values[f.key]?.trim());

  return (
    <div className="pt-6">
      <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
        {question}
      </h1>
      {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            {field.type === "select" ? (
              <select
                value={values[field.key] || ""}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white
                           focus:border-primary focus:outline-none text-base appearance-none"
              >
                <option value="">{field.placeholder || field.label}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder || field.label}
                value={values[field.key] || ""}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white
                           focus:border-primary focus:outline-none text-base"
              />
            )}
          </div>
        ))}
      </div>
      <ContinueButton onClick={() => onSubmit(values)} disabled={!allRequiredFilled} />
    </div>
  );
}
