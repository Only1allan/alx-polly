"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { deletePoll, getUserPolls } from "@/app/lib/actions/poll-actions";
import { useAuth } from "@/app/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Poll {
  id: string;
  question: string;
  options: string[];
  created_by: string;  // Changed from user_id to created_by
  created_at: string;
}

export default function PollList() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    async function loadPolls() {
      try {
        const result = await getUserPolls();
        if (result.error) {
          setError(result.error);
        } else {
          setPolls(result.polls);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      loadPolls();
    }
  }, [session]);

  const handleDelete = async (pollId: string) => {
    try {
      const result = await deletePoll(pollId);
      if (result.error) {
        setError(result.error);
      } else {
        setPolls(polls.filter((poll) => poll.id !== pollId));
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading polls...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading polls: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {polls.map((poll) => (
        <Card
          key={poll.id}
          className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
        >
          <Link href={`/polls/${poll.id}`} className="group flex-grow">
            <CardHeader>
              <CardTitle className="text-lg font-bold group-hover:text-primary">
                {poll.question}
              </CardTitle>
              <CardDescription>
                Created at {new Date(poll.created_at).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {poll.options.length} options available
              </p>
            </CardContent>
          </Link>
          {session?.user.id === poll.created_by && (
            <CardFooter className="flex justify-end space-x-2 p-4">
              <Link href={`/polls/edit/${poll.id}`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your poll and all its votes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(poll.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
