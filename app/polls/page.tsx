"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PollList from "@/components/polls/poll-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function PollsPage() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      // The check for `null` is important to distinguish from the initial loading state.
      const timer = setTimeout(() => {
        if (!session) {
          router.push("/auth/login");
        }
      }, 100); // A small delay to prevent flicker if session is loading
      return () => clearTimeout(timer);
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Polls Dashboard
        </h1>
        <Link href="/polls/new">
          <Button>Create Poll</Button>
        </Link>
      </div>
      <PollList />
    </div>
  );
}
