"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      size="lg"
      variant="outline"
      className="text-base px-8"
      onClick={() => router.back()}
    >
      Go Back
    </Button>
  );
}



