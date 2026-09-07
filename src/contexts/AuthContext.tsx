import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  credits: number;
  plan: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  consumeCredit: () => Promise<boolean>;
  addCredits: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, userEmail?: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        // Profile does not exist yet, create one
        const newProfile: Partial<UserProfile> = {
          id: userId,
          email: userEmail || "",
          full_name: userEmail?.split("@")[0] || "Growth Marketer",
          avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
          credits: 50,
          plan: "Pro (Demo)",
          role: "Owner",
        };

        const { data: created } = await supabase
          .from("profiles")
          .insert(newProfile)
          .select()
          .single();

        if (created) {
          setProfile(created as UserProfile);
          return;
        }
      }

      if (data) {
        setProfile(data as UserProfile);
      } else {
        // Local fallback profile
        setProfile({
          id: userId,
          email: userEmail || "demo@advibe.ai",
          full_name: userEmail ? userEmail.split("@")[0] : "Demo User",
          avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
          credits: 50,
          plan: "Pro",
          role: "Admin",
          created_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    // 1. Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error };
    if (data.user) {
      await fetchProfile(data.user.id, data.user.email);
    }
    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) return { error };

    if (data.user) {
      // Create profile record
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        credits: 50,
        plan: "Pro (Trial)",
        role: "Owner",
      });
      await fetchProfile(data.user.id, data.user.email);
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    toast.success("Signed out successfully");
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user.email);
    }
  };

  const consumeCredit = async (): Promise<boolean> => {
    if (!profile) return true; // allow demo guest
    if (profile.credits <= 0) {
      toast.error("No credits remaining! Top up in Settings.");
      return false;
    }

    const nextCredits = profile.credits - 1;
    setProfile({ ...profile, credits: nextCredits });

    if (user) {
      await supabase
        .from("profiles")
        .update({ credits: nextCredits })
        .eq("id", user.id);
    }
    return true;
  };

  const addCredits = async (amount: number) => {
    if (!profile) return;
    const nextCredits = profile.credits + amount;
    setProfile({ ...profile, credits: nextCredits });
    if (user) {
      await supabase
        .from("profiles")
        .update({ credits: nextCredits })
        .eq("id", user.id);
      toast.success(`Added +${amount} credits to your account!`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        consumeCredit,
        addCredits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
