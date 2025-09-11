"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useAuth } from "@/app/lib/context/auth-context";
import { createPoll } from "@/app/lib/actions/poll-actions";
import { useRouter } from "next/navigation";

export function CreatePollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { session } = useAuth();
  const router = useRouter();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError("You must be logged in to create a poll.");
      return;
    }

    if (!question.trim()) {
      setError("Poll title is required.");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      setError("All options must be filled.");
      return;
    }
    if (options.length < 2) {
      setError("You must have at least two options.");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('question', question);
      options.filter(opt => opt.trim()).forEach(option => {
        formData.append('options', option.trim());
      });

      const result = await createPoll(formData);
      
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccessMessage("Poll created successfully!");
        setTimeout(() => {
          router.push("/polls");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a New Poll</CardTitle>
          <CardDescription>
            Fill out the form below to create your poll.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {successMessage && (
              <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
                {successMessage}
              </div>
            )}
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title" className="text-lg">
                  Poll Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., What's your favorite season?"
                  className="text-lg p-4"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg">Options</Label>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      className="text-lg p-4"
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="mt-2"
                >
                  Add Option
                </Button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full text-lg p-6"
              disabled={isCreating || !!successMessage}
            >
              {isCreating ? "Creating..." : "Create Poll"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
