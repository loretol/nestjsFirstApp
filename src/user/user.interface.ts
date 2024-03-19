export interface User {
    id: string;
    name: string;
    last_name: string;
    user_name: string;
    password: string;
    phone: string;
    restore: boolean;
    active: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
  }
  