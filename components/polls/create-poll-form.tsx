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

export function CreatePollForm() {
  const [options, setOptions] = useState(["", ""]);

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a New Poll</CardTitle>
          <CardDescription>
            Fill out the form below to create your poll.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title" className="text-lg">
                  Poll Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., What's your favorite season?"
                  className="text-lg p-4"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg">Options</Label>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="text-lg p-4"
                    />
                    {options.length > 2 && (
                      <Button
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
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-lg p-6">Create Poll</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
