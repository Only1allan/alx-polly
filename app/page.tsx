import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-[450px] text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Polly!</CardTitle>
          <CardDescription className="text-md text-gray-600 pt-2">
            Your go-to application for creating and sharing polls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Get instant feedback on your questions. Create a poll, share the
            link, and see the results in real-time. To access the polls and create your own, please sign in.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/login">
            <Button size="lg">Sign In to Get Started</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

