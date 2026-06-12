import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "featured";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  try {
    const supabase = await createClient();
    let query = supabase.from("products").select("*, category:categories(*)", { count: "exact" }).eq("is_active", true);

    if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    if (category) {
      const { data: cat } = await supabase.from("categories").select("id").eq("slug", category).single();
      if (cat) query = query.eq("category_id", cat.id);
    }

    switch (sort) {
      case "price-asc": query = query.order("price", { ascending: true }); break;
      case "price-desc": query = query.order("price", { ascending: false }); break;
      case "rating": query = query.order("rating", { ascending: false }); break;
      case "name": query = query.order("name", { ascending: true }); break;
      default: query = query.order("is_featured", { ascending: false });
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({ products: data, total: count, page, limit });
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
