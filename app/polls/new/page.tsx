"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreatePollForm } from "@/components/polls/create-poll-form";
import { useAuth } from "@/context/AuthContext";

export default function CreatePollPage() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return <CreatePollForm />;
}
