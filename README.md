# E-Hima Vote 🗳️

Aplikasi mobile voting untuk pemilihan Ketua Himpunan Informatika yang dibangun menggunakan React Native dan Expo.

## 📱 Fitur

- **Authentication System**
  - Registrasi akun baru
  - Login dengan email dan password
  - Auto-login setelah registrasi
  - Session management dengan AsyncStorage

- **User Profile Management**
  - Form data mahasiswa (Nama, NIM, Program Studi, Angkatan)
  - Sinkronisasi data dengan Firebase Firestore
  - Profile completion tracking

- **Voting System**
  - Tampilan kandidat dengan foto
  - Vote confirmation dialog
  - Data mahasiswa verification

- **UI/UX**
  - Custom font (Outreque family)
  - Tema warna konsisten (#97B2DE)
  - Safe area support untuk notch/status bar
  - Responsive design

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.5
- **Development**: Expo SDK ~54.0.25
- **Routing**: Expo Router (file-based routing)
- **Backend**: Firebase
  - Authentication (REST API)
  - Firestore Database (REST API)
- **Local Storage**: AsyncStorage
- **UI Components**: React Native core components
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js (v18 atau lebih tinggi)
- npm atau yarn
- Expo Go app (untuk testing di device fisik)
- Firebase project dengan Authentication dan Firestore enabled

## 🚀 Installation

1. Clone repository

```bash
git clone <repository-url>
cd E-HimaVote
```

2. Install dependencies

```bash
npm install
```

3. Setup Firebase

Buat file `firebaseconfig.js` di root directory dengan konfigurasi Firebase Anda:

```javascript
export default {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

4. Siapkan aset gambar

Pastikan foto kandidat tersedia di `assets/images/`:
- `paslon1-ketua.png`
- `paslon1-wakil.png`
- `paslon2-ketua.png`
- `paslon2-wakil.png`

5. Start development server

```bash
npm start
```

## 📱 Running the App

### Expo Go (Recommended)

1. Install Expo Go dari Play Store (Android) atau App Store (iOS)
2. Scan QR code yang muncul di terminal
3. App akan terbuka di Expo Go

### Android Emulator

```bash
npm run android
```

### iOS Simulator (Mac only)

```bash
npm run ios
```

## 📁 Project Structure

```
E-HimaVote/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen (voting interface)
│   │   └── _layout.tsx         # Tab navigation layout
│   ├── _layout.tsx             # Root layout dengan auth routing
│   ├── login.tsx               # Login screen
│   ├── register.tsx            # Registration screen
│   ├── data-form.tsx           # User profile form
│   └── upload-images.tsx       # Admin image upload
├── assets/
│   ├── fonts/                  # Custom fonts (Outreque)
│   └── images/                 # Candidate photos
├── components/                 # Reusable components
├── constants/
│   └── theme.ts                # Theme colors & fonts
├── contexts/
│   └── AuthContext.tsx         # Authentication state management
├── services/
│   ├── authService.ts          # Firebase Auth API
│   └── firestoreService.ts     # Firestore API
├── utils/
│   └── storage.ts              # AsyncStorage helpers
└── firebaseconfig.js           # Firebase configuration
```

## 🔥 Firebase Setup

### Authentication

1. Enable Email/Password authentication di Firebase Console
2. API endpoint: `identitytoolkit.googleapis.com/v1/accounts`

### Firestore Database

1. Buat collection `E-HimaVote`
2. Document structure:
```javascript
{
  name: string,
  nim: integer,
  studyProgram: string,
  batch: integer,
  createdAt: timestamp
}
```

## 🎨 Custom Fonts

Aplikasi menggunakan custom font family **Outreque**:
- `OutrequeBlack.ttf`
- `OutrequeBold.ttf`
- `OutrequeMedium.ttf`

Font files harus tersedia di `assets/fonts/`

## 📝 User Flow

1. **First Time User**
   - Register → Auto login → Fill profile form → Home screen

2. **Returning User (No Profile)**
   - Login → Fill profile form → Home screen

3. **Returning User (Has Profile)**
   - Login → Home screen (data loaded from Firestore)

## 🔐 Authentication Flow

- Session token disimpan di AsyncStorage
- Profile completion status tracked
- Auto redirect berdasarkan auth state:
  - Not authenticated → Login
  - Authenticated + No profile → Data form
  - Authenticated + Has profile → Home screen

## 🐛 Known Issues & Solutions

- **QR code tidak berfungsi**: Pastikan `app/index.tsx` tidak ada (gunakan `app/(tabs)/index.tsx`)
- **Error network request failed**: Tambahkan API key di URL Firestore: `?key=${apiKey}`
- **Font tidak muncul**: Tunggu `useFonts` hook selesai loading di `_layout.tsx`

## 📄 License

This project is created for educational purposes.

## 👥 Contributors

Developed by Informatika Students - Universitas Hasanuddin
