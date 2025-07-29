import React, { createContext, useContext, useState, useEffect } from 'react';

const JournalContext = createContext();

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journal-entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('current-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('current-user', JSON.stringify(currentUser));
  }, [currentUser]);

  const addEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: currentUser?.id
    };
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const getUserEntries = () => {
    if (!currentUser) return [];
    return entries.filter(entry => entry.userId === currentUser.id);
  };

  const getLastWeekEntries = () => {
    const userEntries = getUserEntries();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return userEntries.filter(entry => new Date(entry.date) >= oneWeekAgo);
  };

  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <JournalContext.Provider value={{
      entries,
      currentUser,
      addEntry,
      getUserEntries,
      getLastWeekEntries,
      login,
      logout
    }}>
      {children}
    </JournalContext.Provider>
  );
};