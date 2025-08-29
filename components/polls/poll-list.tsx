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

const demoPolls = [
  {
    id: "1",
    title: "What is your favorite programming language?",
    description: "Choose one from the list below.",
    tags: ["tech", "programming", "webdev"],
  },
  {
    id: "2",
    title: "Which frontend framework do you prefer?",
    description: "Select your go-to framework.",
    tags: ["frontend", "javascript", "react"],
  },
  {
    id: "3",
    title: "Best code editor for web development?",
    description: "What's your editor of choice?",
    tags: ["tools", "editor", "vscode"],
  },
];

export default function PollList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {demoPolls.map((poll) => (
        <Link href={`/polls/${poll.id}`} key={poll.id} className="group">
          <Card className="transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold group-hover:text-primary">
                {poll.title}
              </CardTitle>
              <CardDescription>{poll.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Click to view details and vote.
              </p>
            </CardContent>
            <CardFooter className="flex space-x-2">
              {poll.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
