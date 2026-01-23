import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: any | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    profile: null,
    loading: false,
    isAdmin: true, // Default to true for demo
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // Mock state for demo
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>({
        id: 'mock-user-id',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
    });
    const [profile, setProfile] = useState<any | null>({
        id: 'mock-user-id',
        role: 'admin',
        name: 'Admin Demo',
        email: 'admin@demo.com'
    });
    const [loading, setLoading] = useState(false);

    // Supabase logic disabled for demo
    /*
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      });
  
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      });
  
      return () => subscription.unsubscribe();
    }, []);
  
    const fetchProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    */

    const isAdmin = true; // Always admin for demo

    return (
        <AuthContext.Provider value={{ session, user, profile, loading, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
