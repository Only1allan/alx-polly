"use client";

import { useState } from "react";
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

const demoPoll = {
  id: "1",
  title: "What is your favorite programming language?",
  description: "Choose one from the list below.",
  options: [
    { id: "1", text: "JavaScript", votes: 15 },
    { id: "2", text: "Python", votes: 20 },
    { id: "3", text: "Rust", votes: 10 },
    { id: "4", text: "Go", votes: 8 },
  ],
};

export function PollView({ pollId }: { pollId: string }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption) {
      setVoted(true);
      // Here you would typically send the vote to the server
      console.log(`Voted for option: ${selectedOption}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {demoPoll.title}
          </CardTitle>
          <CardDescription>{demoPoll.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {voted ? (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demoPoll.options}>
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
                    tickFormatter={(value) => `${value}`}
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
              {demoPoll.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="text-lg">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleVote}
            disabled={!selectedOption || voted}
            className="w-full"
          >
            {voted ? "Thanks for voting!" : "Vote"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
