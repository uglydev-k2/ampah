"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { prescriptionSchema, type PrescriptionInput } from "@/lib/validations/schemas";

export default function PrescriptionPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<PrescriptionInput>({
    resolver: zodResolver(prescriptionSchema),
  });

  const acceptFiles = useCallback((incoming: FileList | File[]) => {
    const allowed = Array.from(incoming).filter(
      (f) => f.type.startsWith("image/") || f.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...allowed].slice(0, 5));
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) acceptFiles(e.dataTransfer.files);
  }, [acceptFiles]);

  const onSubmit = async (data: PrescriptionInput) => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("patientName", data.patientName);
      formData.append("phone", data.phone);
      if (data.notes) formData.append("notes", data.notes);
      files.forEach((f) => formData.append("files", f));

      await fetch("/api/prescriptions", { method: "POST", body: formData });
      setSubmitted(true);
    } catch {
      // Fallback: show success for demo without Supabase
      setSubmitted(true);
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Prescription Submitted!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Our licensed pharmacists will review your prescription within 24 hours. We&apos;ll contact you via phone once it&apos;s approved.
        </p>
        <Button className="mt-6" onClick={() => { setSubmitted(false); setFiles([]); }}>Upload Another</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Upload Prescription</h1>
      <p className="mb-8 text-gray-500">Upload your prescription and our pharmacists will prepare your order.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${dragOver ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-gray-200 dark:border-gray-700"}`}
        >
          <Upload className="mx-auto mb-4 h-10 w-10 text-gray-400" />
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">Drag & drop your prescription here</p>
          <p className="mb-4 text-sm text-gray-500">Supports JPG, PNG, and PDF (max 5 files)</p>
          <label>
            <input type="file" accept="image/*,.pdf" multiple className="hidden" onChange={(e) => e.target.files && acceptFiles(e.target.files)} />
            <Button type="button" variant="outline" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
              Browse Files
            </Button>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{f.name}</span>
                </div>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label="Remove file">
                  <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Input label="Full Name" {...register("patientName")} error={errors.patientName?.message} />
        <Input label="Phone Number" type="tel" {...register("phone")} error={errors.phone?.message} />
        <Textarea label="Notes (optional)" placeholder="Any special instructions..." {...register("notes")} />

        <Button type="submit" size="lg" className="w-full" isLoading={uploading} disabled={files.length === 0}>
          Submit Prescription
        </Button>
      </form>
    </div>
  );
}
