// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRNoFOHQ2bC6XTliivWfpGMBDfKnR9sko",
  authDomain: "general-games-2775e.firebaseapp.com",
  databaseURL: "https://general-games-2775e-default-rtdb.firebaseio.com",
  projectId: "general-games-2775e",
  storageBucket: "general-games-2775e.firebasestorage.app",
  messagingSenderId: "750591153144",
  appId: "1:750591153144:web:12c8207bc0aa08c2b43c0d",
  measurementId: "G-5HM7TYMGD9"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const slug = document.querySelector('.game-container').dataset.slug;
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');

// LocalStorage لتتبع vote لكل user
let userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};

// جلب count global من Firebase
db.ref('votes/' + slug).on('value', snapshot => {
  const data = snapshot.val() || { likes: 0, dislikes: 0 };
  likeCount.textContent = data.likes;
  dislikeCount.textContent = data.dislikes;
});

// Function to send vote
function sendVote(type){
  const currentVote = userVotes[slug]; // vote الحالي ديال visitor

  if(currentVote === type) return; // ما بدل والو، exit

  db.ref('votes/' + slug).transaction(current => {
    if(!current) current = { likes: 0, dislikes: 0 };

    // نقص vote القديم إلا كان
    if(currentVote){
      current[currentVote] = Math.max((current[currentVote] || 1) - 1, 0);
    }

    // زد vote الجديد
    current[type] = (current[type] || 0) + 1;
    return current;
  });

  // حفظ vote visitor ف LocalStorage
  userVotes[slug] = type;
  localStorage.setItem('userVotes', JSON.stringify(userVotes));
}

// Attach click events
likeBtn.onclick = () => sendVote('likes');
dislikeBtn.onclick = () => sendVote('dislikes');
