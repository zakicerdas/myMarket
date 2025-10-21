import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // ambil status login & nama user dari localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('isAuth') === 'true';
    } catch {
      return false;
    }
  });

  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem('username') || '';
    } catch {
      return '';
    }
  });

  // simpan status login & nama ke localStorage setiap berubah
  useEffect(() => {
    try {
      localStorage.setItem('isAuth', isAuthenticated ? 'true' : 'false');
      localStorage.setItem('username', username);
    } catch {}
  }, [isAuthenticated, username]);

  const login = async ({ username, password }) => {
    await new Promise((r) => setTimeout(r, 300));
    if (username && password) {
      setIsAuthenticated(true);
      setUsername(username);
      return { ok: true };
    }
    return { ok: false, error: 'Username/password tidak boleh kosong' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  const value = { isAuthenticated, username, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
