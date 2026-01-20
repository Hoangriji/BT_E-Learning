import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { 
  encryptPassword, 
  decryptPassword, 
  encryptToken, 
  decryptToken, 
  isTokenValid 
} from '../utils/encryption';

const ACCOUNTS_COLLECTION = 'accounts';
const TOKEN_STORAGE_KEY = 'auth_token';
const PASSWORD_KEY = import.meta.env.VITE_PASSWORD_ENCRYPTION_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_ENCRYPTION_KEY;

/**
 * Register a new user account
 * @param {object} userData - Object containing fullName, email, password
 * @returns {Promise<object>} - Created user data
 */
export const registerUser = async (userData) => {
  try {
    const { fullName, email, password } = userData;

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Encrypt password
    const encryptedPassword = await encryptPassword(password, PASSWORD_KEY);

    // Create user document
    const userDoc = {
      fullName,
      email,
      password: encryptedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, ACCOUNTS_COLLECTION), userDoc);

    // Document ID is the UID (User ID)
    return {
      userId: docRef.id, // This is the UID
      fullName,
      email,
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Check if email already exists in database
 * @param {string} email - Email to check
 * @returns {Promise<boolean>}
 */
const checkEmailExists = async (email) => {
  try {
    const q = query(
      collection(db, ACCOUNTS_COLLECTION),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - User data and token
 */
export const loginUser = async (email, password) => {
  try {
    // Find user by email
    const q = query(
      collection(db, ACCOUNTS_COLLECTION),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Invalid email or password');
    }

    // Get user document
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id; // This is the UID (Firestore document ID)

    // Decrypt stored password and compare
    const decryptedPassword = await decryptPassword(userData.password, PASSWORD_KEY);
    
    if (decryptedPassword !== password) {
      throw new Error('Invalid email or password');
    }

    // Create token containing UID and timestamp
    const tokenData = {
      userId, // UID from Firestore document ID
      timestamp: new Date().getTime(),
    };

    const token = await encryptToken(tokenData, TOKEN_KEY);

    // Store token in localStorage
    localStorage.setItem(TOKEN_STORAGE_KEY, token);

    return {
      userId,
      fullName: userData.fullName,
      email: userData.email,
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Get current logged-in user from token
 * @returns {Promise<object|null>} - User data if token is valid, null otherwise
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    if (!token) {
      return null;
    }

    // Decrypt token
    const tokenData = await decryptToken(token, TOKEN_KEY);

    // Check if token is still valid (24 hours)
    if (!isTokenValid(tokenData, 24)) {
      logout();
      return null;
    }

    // Get user data from Firestore
    const q = query(collection(db, ACCOUNTS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const userDoc = querySnapshot.docs.find(doc => doc.id === tokenData.userId);
    
    if (!userDoc) {
      logout();
      return null;
    }

    const userData = userDoc.data();

    return {
      userId: userDoc.id,
      fullName: userData.fullName,
      email: userData.email,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    logout();
    return null;
  }
};

/**
 * Logout user by removing token
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  
  if (!token) {
    return false;
  }

  try {
    const tokenData = await decryptToken(token, TOKEN_KEY);
    return isTokenValid(tokenData, 24);
  } catch (error) {
    return false;
  }
};
