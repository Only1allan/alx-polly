"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { login, register } from "@/app/lib/actions/auth-actions";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = '/dashboard/polls'; // Full reload to pick up session
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('name', email.split('@')[0]);
    formData.append('email', email);
    formData.append('password', password);
    
    const result = await register(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = '/dashboard/polls'; // Full reload to pick up session
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account to create and vote on polls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRegister} disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </Button>
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
