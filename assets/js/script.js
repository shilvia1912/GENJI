// assets/js/script.js

// TODO: PASTE KONFIGURASI FIREBASE ANDA DI SINI!
const firebaseConfig = {
  apiKey: "AIzaSyB-xQ_tkRDzB5OEVRVCNbn-rwFMouufhAM",
  authDomain: "jentsuu-6b3b5.firebaseapp.com",
  projectId: "jentsuu-6b3b5",
  storageBucket: "jentsuu-6b3b5.firebasestorage.app",
  messagingSenderId: "924729027833",
  appId: "1:924729027833:web:51a60488b99b83ea618628",
  measurementId: "G-H8R1Z0G04X"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// === LOGIKA AUTENTIKASI ===

// Mengambil elemen form
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Event listener untuk form pendaftaran
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert('Pendaftaran berhasil! Silakan login.');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    });
}

// Event listener untuk form login
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    });
}

// Event listener untuk tombol logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        });
    });
}


// === PENDETEKSI STATUS LOGIN (SANGAT PENTING) ===

auth.onAuthStateChanged((user) => {
    const currentPath = window.location.pathname.split("/").pop();
    
    if (user) {
        // --- Pengguna sedang Login ---
        console.log('User is logged in:', user.email);

        // Jika pengguna ada di halaman login atau signup, lempar ke dasbor
        if (currentPath === 'login.html' || currentPath === 'signup.html') {
            window.location.href = 'dashboard.html';
        }

        // Jika di dasbor, tampilkan email pengguna
        const userDisplay = document.getElementById('user-display');
        if (userDisplay) {
            userDisplay.textContent = user.email;
        }

    } else {
        // --- Pengguna sedang Logout ---
        console.log('User is logged out.');
        
        // Jika pengguna mencoba akses dasbor tanpa login, lempar ke halaman login
        if (currentPath === 'dashboard.html') {
            alert('Anda harus login untuk mengakses halaman ini!');
            window.location.href = 'login.html';
        }
    }
});
