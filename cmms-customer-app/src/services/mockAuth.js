const MOCK_USERS = [
  {
    uid: 'user1',
    email: 'john@example.com',
    displayName: 'John Doe',
  },
  {
    uid: 'user2',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
  },
];

class MockAuth {
  constructor() {
    this.currentUser = null;
    this.listeners = new Set();
  }

  async signInWithEmailAndPassword(email, password) {
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('auth/user-not-found');
    }
    // Simulate password check (in real app, never store plain passwords)
    if (password !== 'password123') {
      throw new Error('auth/wrong-password');
    }
    this.currentUser = user;
    this._notifyListeners();
    return { user };
  }

  async createUserWithEmailAndPassword(email, password) {
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('auth/email-already-in-use');
    }
    const newUser = {
      uid: `user${MOCK_USERS.length + 1}`,
      email,
      displayName: email.split('@')[0],
    };
    MOCK_USERS.push(newUser);
    this.currentUser = newUser;
    this._notifyListeners();
    return { user: newUser };
  }

  async signOut() {
    this.currentUser = null;
    this._notifyListeners();
  }

  onAuthStateChanged(callback) {
    this.listeners.add(callback);
    callback(this.currentUser);
    return () => this.listeners.delete(callback);
  }

  _notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentUser));
  }
}

export const mockAuth = new MockAuth();