
import React, { useState, useCallback, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { AppLayout } from './components/AppLayout';
import { apiService } from './services/apiService';
import type { User, Receipt, UserStatus, FinancialPlan } from './types';
import { Spinner } from './components/common/Spinner';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // `users` will hold all users if admin is logged in, or just the current user otherwise.
  const [users, setUsers] = useState<User[]>([]); 
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [financialPlans, setFinancialPlans] = useState<FinancialPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Manages loading state for initial data fetch

  const handleLogin = (user: User) => {
    setIsLoading(true); // Show loader immediately on login attempt
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUsers([]);
    setReceipts([]);
    setFinancialPlans([]);
  };

  useEffect(() => {
    if (currentUser?.id) {
      const fetchData = async () => {
        try {
          // This one endpoint can serve both roles
          const data = await apiService.getAllDataForUser(currentUser.id, currentUser.role);
          setUsers(data.users);
          setReceipts(data.receipts);
          setFinancialPlans(data.financialPlans);

          // Ensure currentUser state is the freshest version from the "API"
          const freshCurrentUser = data.users.find(u => u.id === currentUser.id);
          if (freshCurrentUser) {
            setCurrentUser(freshCurrentUser);
          }

        } catch (error) {
          console.error("Failed to fetch data", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [currentUser?.id]); // Only refetch when user ID changes

  const handleUpdateUserStatus = useCallback(async (userId: number, newStatus: UserStatus) => {
    const updatedUser = await apiService.updateUserStatus(userId, newStatus);
    if (updatedUser) {
      setUsers(currentUsers =>
        currentUsers.map(user => (user.id === userId ? updatedUser : user))
      );
      if (currentUser?.id === userId) {
        setCurrentUser(updatedUser);
      }
    }
  }, [currentUser]);

  const handleAddReceipt = useCallback(async (newReceiptData: Omit<Receipt, 'id' | 'userId'>) => {
    if (currentUser) {
      const { newReceipt, updatedUser } = await apiService.addReceipt(currentUser.id, newReceiptData);
      setReceipts(prev => [...prev, newReceipt]);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      }
    }
  }, [currentUser]);

  const handleAddPlan = useCallback(async (newPlanData: Omit<FinancialPlan, 'id' | 'userId'>) => {
    if (currentUser) {
      const { newPlan, updatedUser } = await apiService.addFinancialPlan(currentUser.id, newPlanData);
      setFinancialPlans(prev => [...prev, newPlan]);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      }
    }
  }, [currentUser]);
  
  const handleUpdateBudgets = useCallback(async (newBudgets: Record<string, number>) => {
    if (currentUser) {
      const updatedUser = await apiService.updateUserBudgets(currentUser.id, newBudgets);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      }
    }
  }, [currentUser]);

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  if (isLoading) {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Spinner large />
        </div>
    );
  }

  return (
    <AppLayout
      user={currentUser}
      allUsers={users}
      allReceipts={receipts}
      allFinancialPlans={financialPlans}
      onLogout={handleLogout}
      onAddReceipt={handleAddReceipt}
      onAddPlan={handleAddPlan}
      onUpdateUserStatus={handleUpdateUserStatus}
      onUpdateBudgets={handleUpdateBudgets}
    />
  );
};
export default App;