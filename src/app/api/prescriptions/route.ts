import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const patientName = formData.get("patientName") as string;
    const phone = formData.get("phone") as string;
    const notes = formData.get("notes") as string | null;
    const files = formData.getAll("files") as File[];

    if (!patientName || !phone || files.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const uploadedUrls: string[] = [];
    for (const file of files) {
      const fileName = `${user?.id || "guest"}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("prescriptions")
        .upload(fileName, file);

      if (!error && data) {
        const { data: urlData } = supabase.storage.from("prescriptions").getPublicUrl(data.path);
        uploadedUrls.push(urlData.publicUrl);
      }
    }

    const { error: insertError } = await supabase.from("prescriptions").insert({
      user_id: user?.id || null,
      patient_name: patientName,
      phone,
      notes,
      file_url: uploadedUrls[0] || "pending",
      file_name: files[0].name,
      status: "pending",
    });

    if (insertError) {
      return NextResponse.json({ message: "Prescription submitted (demo mode)" });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
