'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from './CartContext';

export interface User {
    id: string;
    name: string;
    email: string;
    myCourses?: CartItem[];
    plan?: 'Free' | 'Pro' | 'Enterprise';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (updatedUser: User) => void;
    resetPassword: (email: string, newPassword: string) => Promise<boolean>;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        // Check for logged-in user on mount
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const usersStr = localStorage.getItem('users');
            const users = usersStr ? JSON.parse(usersStr) : [];

            const foundUser = users.find((u: any) => u.email === email && u.password === password);

            if (foundUser) {
                const { password, ...userWithoutPassword } = foundUser;
                // Ensure plan is set
                if (!userWithoutPassword.plan) {
                    userWithoutPassword.plan = 'Free';
                }
                setUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Also update in the main users list
        const usersStr = localStorage.getItem('users');
        if (usersStr) {
            const users = JSON.parse(usersStr);
            const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updatedUser };
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    };

    const resetPassword = async (email: string, newPassword: string) => {
        try {
            const usersStr = localStorage.getItem('users');
            if (usersStr) {
                const users = JSON.parse(usersStr);
                const userIndex = users.findIndex((u: any) => u.email === email);
                if (userIndex !== -1) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Reset password error:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, resetPassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
