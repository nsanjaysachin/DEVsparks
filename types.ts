export type ActiveView = 'wellness' | 'spending' | 'goals' | 'budgets' | 'copilot' | 'profile' | 'admin';

export type UserStatus = 'Active' | 'Inactive' | 'On Vacation';
export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  username: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  financialWellnessScore: number;
  monthlyExpenseLimit?: number;
  budgets?: Record<string, number>;
}

export interface ReceiptItem {
  name: string;
  price: number;
}

export interface Receipt {
  id: number;
  userId: number;
  merchant?: string;
  items: ReceiptItem[];
  total?: number;
  date?: string;
  category: string;
  image: string; // base64 encoded image
}

export interface FinancialPlan {
  id: number;
  userId: number;
  query: string;
  result: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    reward: number; // Wellness points
    icon: keyof typeof import('./components/common/Icon').icons;
}

// Fix: Moved the AIStudio interface inside the `declare global` block.
// This ensures that AIStudio is treated as a global type when augmenting the global Window interface,
// resolving the "Subsequent property declarations must have the same type" error which arises from
// conflicts between module-scoped and global-scoped types.
declare global {
    interface AIStudio {
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }
    
    interface Window { 
        aistudio?: AIStudio;
    }
}