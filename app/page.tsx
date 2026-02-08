"use client";

import { useState } from "react";
import { FloatingHearts } from "@/components/floating-hearts";
import { ValentineProposal } from "@/components/valentine-proposal";
import { Celebration } from "@/components/celebration";

export default function Page() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts />

      {!accepted ? (
        <ValentineProposal onYes={() => setAccepted(true)} />
      ) : (
        <Celebration />
      )}
    </main>
  );
}
