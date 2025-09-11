"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getPollResults, submitVote } from "@/app/lib/actions/poll-actions";
import { useAuth } from "@/app/lib/context/auth-context";

interface PollData {
  id: string;
  question: string;
  options: string[];
  created_at: string;
  created_by: string;
}

interface PollResultData {
  option: string;
  votes: number;
}

export function PollView({ pollId }: { pollId: string }) {
  const { user } = useAuth();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [results, setResults] = useState<PollResultData[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPollData = async () => {
    try {
      setLoading(true);
      const result = await getPollResults(pollId);
      
      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.poll && result.results) {
        setPoll(result.poll);
        setResults(result.results);
        setTotalVotes(result.totalVotes || 0);
      }
    } catch (err) {
      setError('Failed to load poll data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPollData();
  }, [pollId]);

  const handleVote = async () => {
    if (!selectedOption || !poll || !user) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Find the option index
      const optionIndex = poll.options.indexOf(selectedOption);
      
      if (optionIndex === -1) {
        setError('Invalid option selected');
        setIsSubmitting(false);
        return;
      }

      const result = await submitVote(poll.id, optionIndex);
      
      if (result.error) {
        setError(result.error);
      } else {
        setVoted(true);
        // Refresh poll data to show updated results
        await fetchPollData();
      }
    } catch (err) {
      setError('Failed to submit vote');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              {error || 'Poll not found'}
            </h3>
            <p className="text-gray-600">
              Please check the poll ID and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = results.map(result => ({
    text: result.option,
    votes: result.votes
  }));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {poll.question}
          </CardTitle>
          <CardDescription>
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          {!user && (
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-md mb-4 text-sm">
              You must be logged in to vote on this poll.
            </div>
          )}

          {voted || !user ? (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="text"
                    stroke="#888888"
                    tick={{ fill: '#888', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    tick={{ fill: '#888', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `${value}`}
                  />
                  <Bar
                    dataKey="votes"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <RadioGroup
              onValueChange={setSelectedOption}
              className="space-y-2"
            >
              {poll.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-lg">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
        <CardFooter>
          {user && !voted ? (
            <Button
              onClick={handleVote}
              disabled={!selectedOption || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Vote"}
            </Button>
          ) : (
            <Button disabled className="w-full">
              {voted ? "Thanks for voting!" : "Login to vote"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
