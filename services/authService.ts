import firebaseConfig from '../firebaseconfig';

const API_KEY = firebaseConfig.apiKey;

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      // Provide user-friendly error messages
      let errorMessage = 'Gagal mendaftar';
      
      if (data.error?.message === 'EMAIL_EXISTS') {
        errorMessage = 'Email sudah terdaftar. Silakan login atau gunakan email lain.';
      } else if (data.error?.message === 'WEAK_PASSWORD') {
        errorMessage = 'Password terlalu lemah. Gunakan minimal 6 karakter.';
      } else if (data.error?.message === 'INVALID_EMAIL') {
        errorMessage = 'Format email tidak valid.';
      } else if (data.error?.message) {
        errorMessage = data.error.message;
      }
      
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error: any) {
    console.error('SignUp error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      // Provide user-friendly error messages
      let errorMessage = 'Failed to sign in';
      
      if (data.error?.message === 'INVALID_LOGIN_CREDENTIALS') {
        errorMessage = 'Email atau password salah. Pastikan Anda sudah mendaftar terlebih dahulu.';
      } else if (data.error?.message === 'EMAIL_NOT_FOUND') {
        errorMessage = 'Email tidak ditemukan. Silakan daftar terlebih dahulu.';
      } else if (data.error?.message === 'INVALID_PASSWORD') {
        errorMessage = 'Password salah. Silakan coba lagi.';
      } else if (data.error?.message === 'USER_DISABLED') {
        errorMessage = 'Akun ini telah dinonaktifkan.';
      } else if (data.error?.message) {
        errorMessage = data.error.message;
      }
      
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error: any) {
    console.error('SignIn error:', error);
    throw error;
  }
};