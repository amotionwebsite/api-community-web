import { Suspense } from "react";
import ThreadDetailView from "@/views/ThreadDetailView";

export default function ThreadDetailPage() {
  return (
    <Suspense fallback={<div className="min-vh-100 handcrafted-canvas" />}>
      <ThreadDetailView />
    </Suspense>
  );
}
