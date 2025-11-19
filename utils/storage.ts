import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN_KEY = '@user_token';
const USER_ID_KEY = '@user_id';
const USER_EMAIL_KEY = '@user_email';
const PROFILE_COMPLETED_KEY = '@profile_completed';
const USER_DATA_KEY = '@user_data';

export const saveUserSession = async (token: string, userId: string, email: string): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      [USER_TOKEN_KEY, token],
      [USER_ID_KEY, userId],
      [USER_EMAIL_KEY, email],
    ]);
  } catch (error) {
    console.error('Error saving user session:', error);
    throw error;
  }
};

export const getUserToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

export const getUserEmail = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_EMAIL_KEY);
  } catch (error) {
    console.error('Error getting user email:', error);
    return null;
  }
};

export const clearUserSession = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([USER_TOKEN_KEY, USER_ID_KEY, USER_EMAIL_KEY, PROFILE_COMPLETED_KEY, USER_DATA_KEY]);
  } catch (error) {
    console.error('Error clearing user session:', error);
    throw error;
  }
};

export const setProfileCompleted = async (completed: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROFILE_COMPLETED_KEY, completed.toString());
  } catch (error) {
    console.error('Error setting profile completed:', error);
    throw error;
  }
};

export const getProfileCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(PROFILE_COMPLETED_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error getting profile completed:', error);
    return false;
  }
};

export interface UserData {
  name: string;
  nim: number | string;
  studyProgram: string;
  batch: number | string;
}

export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};