const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      data: [],
      error: null,
    })),
    insert: jest.fn(() => ({
      data: [],
      error: null,
    })),
    update: jest.fn(() => ({
      data: [],
      error: null,
    })),
    delete: jest.fn(() => ({
      data: [],
      error: null,
    })),
  })),
  auth: {
    signUp: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    signInWithPassword: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    signOut: jest.fn(() => Promise.resolve({ error: null })),
    getSession: jest.fn(() => Promise.resolve({ data: { session: null }, error: null })),
    onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
  },
};

export const createClient = jest.fn(() => mockSupabase);
export default { createClient };
