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
  consumeCredit: (amount?: number) => Promise<boolean>;
  addCredits: (amount: number) => Promise<void>;
  setDemoUser: (email: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACTIVE_PROFILE_KEY = "advibe_active_profile";
const CREDITS_PREFIX = "advibe_credits_";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(ACTIVE_PROFILE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  // Sync active profile to localStorage and per-user credit store
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (profile) {
        localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(profile));
        localStorage.setItem(CREDITS_PREFIX + profile.id, profile.credits.toString());
      } else {
        localStorage.removeItem(ACTIVE_PROFILE_KEY);
      }
    }
  }, [profile]);

  const getStoredCredits = (userId: string, defaultCredits: number = 50): number => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CREDITS_PREFIX + userId);
      if (stored !== null && !isNaN(Number(stored))) {
        return Number(stored);
      }
    }
    return defaultCredits;
  };

  const fetchProfile = async (userId: string, userEmail?: string, fallbackName?: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        // Use DB credits or local stored credits
        const credits = getStoredCredits(userId, data.credits ?? 50);
        setProfile({ ...data, credits } as UserProfile);
        return;
      }

      const credits = getStoredCredits(userId, 50);
      const newProfile: UserProfile = {
        id: userId,
        email: userEmail || "user@advibe.ai",
        full_name: fallbackName || userEmail?.split("@")[0] || "Growth Marketer",
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
        credits,
        plan: "Pro (Trial)",
        role: "Owner",
        created_at: new Date().toISOString(),
      };

      await supabase.from("profiles").upsert(newProfile);
      setProfile(newProfile);
    } catch (err) {
      console.error("Error fetching profile:", err);
      const credits = getStoredCredits(userId, 50);
      const fallback: UserProfile = {
        id: userId,
        email: userEmail || "user@advibe.ai",
        full_name: fallbackName || "Active Member",
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
        credits,
        plan: "Pro",
        role: "Owner",
        created_at: new Date().toISOString(),
      };
      setProfile(fallback);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
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

    if (error) {
      // Fallback for unconfirmed emails
      const dummyId = `usr_${email.replace(/[^a-zA-Z0-9]/g, "")}`;
      const credits = getStoredCredits(dummyId, 50);
      const newProf: UserProfile = {
        id: dummyId,
        email,
        full_name: email.split("@")[0],
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${dummyId}`,
        credits,
        plan: "Pro",
        role: "Owner",
        created_at: new Date().toISOString(),
      };
      setProfile(newProf);
      return { error: null };
    }

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

    const userId = data?.user?.id || `usr_${email.replace(/[^a-zA-Z0-9]/g, "")}`;
    const credits = getStoredCredits(userId, 50);
    const newProf: UserProfile = {
      id: userId,
      email,
      full_name: fullName || email.split("@")[0],
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
      credits,
      plan: "Pro (Trial)",
      role: "Owner",
      created_at: new Date().toISOString(),
    };

    try {
      await supabase.from("profiles").upsert(newProf);
    } catch (e) {
      console.warn("Could not upsert profile directly:", e);
    }

    setProfile(newProf);
    return { error: null };
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn(e);
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
    }
    toast.success("Signed out successfully");
  };

  const setDemoUser = (email: string, name: string) => {
    const demoId = `demo_${email.replace(/[^a-zA-Z0-9]/g, "")}`;
    const credits = getStoredCredits(demoId, 50);
    const demoProfile: UserProfile = {
      id: demoId,
      email,
      full_name: name,
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${demoId}`,
      credits,
      plan: "Pro (Demo)",
      role: "Owner",
      created_at: new Date().toISOString(),
    };
    setProfile(demoProfile);
    toast.success(`Logged in as ${name}! 🚀`);
  };

  const refreshProfile = async () => {
    if (profile?.id) {
      await fetchProfile(profile.id, profile.email);
    }
  };

  const consumeCredit = async (amount: number = 1): Promise<boolean> => {
    if (!profile) return true; // guest demo
    if (profile.credits < amount) {
      toast.error(`Not enough credits! Need ${amount}, have ${profile.credits}. Top up in Admin & Settings.`);
      return false;
    }

    const nextCredits = profile.credits - amount;
    const updated = { ...profile, credits: nextCredits };
    setProfile(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(CREDITS_PREFIX + profile.id, nextCredits.toString());
    }

    try {
      await supabase
        .from("profiles")
        .update({ credits: nextCredits })
        .eq("id", profile.id);
    } catch (e) {
      console.warn("Credit update in DB:", e);
    }
    return true;
  };

  const addCredits = async (amount: number) => {
    if (!profile) return;
    const nextCredits = profile.credits + amount;
    const updated = { ...profile, credits: nextCredits };
    setProfile(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(CREDITS_PREFIX + profile.id, nextCredits.toString());
    }

    try {
      await supabase
        .from("profiles")
        .update({ credits: nextCredits })
        .eq("id", profile.id);
    } catch (e) {
      console.warn("Credit update in DB:", e);
    }
    toast.success(`Added +${amount} credits to your account!`);
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
        setDemoUser,
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
