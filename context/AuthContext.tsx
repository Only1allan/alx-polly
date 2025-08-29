"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { getSession } from "@/lib/supabase";

type AuthContextType = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
