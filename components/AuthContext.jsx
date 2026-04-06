'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    if (!userId) return null;
    try {
      // maybeSingle() is safer as it won't throw if zero rows are found
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.warn('Profile fetch warning (might not exist yet):', error.message);
        return null;
      }
      return data;
    } catch (e) {
      console.error('Catch error in profile fetch:', e);
      return null;
    }
  };

  const checkCompleteness = (prof, u) => {
    // Priority 1: Check auth metadata (always up-to-date after any save path)
    const meta = u?.user_metadata;
    if (meta?.full_name && meta?.role && meta?.department) {
      // Faculty don't need a batch; others do
      if (meta.role === 'faculty') return true;
      if (meta.batch) return true;
    }
    // Priority 2: Fall back to database profile
    if (!prof) return false;
    const hasBase = prof.full_name && prof.role && prof.department;
    if (prof.role === 'faculty') return !!hasBase;
    return !!(hasBase && prof.batch);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          const prof = await fetchProfile(currentUser.id);
          setProfile(prof);
        }
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      // TOKEN_REFRESHED fires after refreshSession() — ensure user is updated
      setSession(newSession);
      const currentUser = newSession?.user ?? null;
      setUser(currentUser);       // ← this re-triggers isComplete with fresh metadata
      
      if (currentUser) {
        const prof = await fetchProfile(currentUser.id);
        setProfile(prof);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      isComplete: checkCompleteness(profile, user), 
      session, 
      loading,
      refreshProfile: async () => {
        if (user) {
          const prof = await fetchProfile(user.id);
          setProfile(prof);
        }
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

