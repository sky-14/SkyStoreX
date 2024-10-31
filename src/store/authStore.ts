import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  subscription: 'free' | 'premium' | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  upgradeSubscription: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  subscription: null,
  isLoading: true,

  loadUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_type')
          .eq('id', user.id)
          .single();
        
        set({ 
          user, 
          subscription: profile?.subscription_type || 'free',
          isLoading: false 
        });
      } else {
        set({ user: null, subscription: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      set({ user: null, subscription: null, isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_type')
        .eq('id', data.user.id)
        .single();
      
      set({ user: data.user, subscription: profile?.subscription_type || 'free' });
    }
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        subscription_type: 'free',
        storage_used: 0,
      });
      set({ user: data.user, subscription: 'free' });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, subscription: null });
  },

  upgradeSubscription: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    // In a real app, integrate with a payment gateway here
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_type: 'premium' })
      .eq('id', user.id);

    if (error) throw error;
    set({ subscription: 'premium' });
  },
}));