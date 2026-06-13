"use client";

export function AdminMeshBg() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden lg:left-72" aria-hidden>
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl animate-mesh-shift" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl animate-mesh-shift" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl animate-mesh-shift" style={{ animationDelay: "-12s" }} />
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
