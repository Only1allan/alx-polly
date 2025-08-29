import { RegisterForm } from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create an account to start making your own polls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <div className="p-6 pt-0 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
