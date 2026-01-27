import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
  storeName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem('vendorUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleSetUser = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('vendorUser', JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('vendorUser');
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
