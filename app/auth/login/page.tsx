import { LoginForm } from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Access your account to create and vote on polls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <div className="p-6 pt-0 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register" className="underline">
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
}
