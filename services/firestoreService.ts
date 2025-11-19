import firebaseConfig from '../firebaseconfig';

const FIRESTORE_API_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

interface UserData {
  name: string;
  nim: number;
  studyProgram: string;
  batch: number;
}

export const saveUserData = async (userId: string, userData: UserData): Promise<void> => {
  try {
    const url = `${FIRESTORE_API_URL}/E-HimaVote/${userId}?key=${firebaseConfig.apiKey}`;
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          name: { stringValue: userData.name },
          nim: { integerValue: userData.nim.toString() },
          studyProgram: { stringValue: userData.studyProgram },
          batch: { integerValue: userData.batch.toString() },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to save user data');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const url = `${FIRESTORE_API_URL}/E-HimaVote/${userId}?key=${firebaseConfig.apiKey}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Document doesn't exist
      }
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get user data');
    }

    const data = await response.json();
    
    return {
      name: data.fields.name?.stringValue || '',
      nim: parseInt(data.fields.nim?.integerValue || '0'),
      studyProgram: data.fields.studyProgram?.stringValue || '',
      batch: parseInt(data.fields.batch?.integerValue || '0'),
    };
  } catch (error: any) {
    console.error('Error getting user data:', error);
    throw error;
  }
};
