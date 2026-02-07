document.addEventListener('DOMContentLoaded', () => {
  const likeBtn = document.getElementById('like-btn');
  const dislikeBtn = document.getElementById('dislike-btn');
  const likeCount = document.getElementById('like-count');
  const dislikeCount = document.getElementById('dislike-count');

  const gameContainer = document.querySelector('.game-container');
  const slug = gameContainer.dataset.slug;
  const API = "https://funzilo.com/wp-json/votes/v1";

  // جلب votes
  function loadVotes() {
    fetch(`${API}/get?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        likeCount.textContent = data.likes ?? 0;
        dislikeCount.textContent = data.dislikes ?? 0;
      })
      .catch(err => console.error("Error loading votes:", err));
  }

  // إرسال vote
  function sendVote(type) {
    fetch(`${API}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, type })
    })
    .then(res => res.json())
    .then(data => {
      likeCount.textContent = data.likes ?? 0;
      dislikeCount.textContent = data.dislikes ?? 0;
    })
    .catch(err => console.error("Error sending vote:", err));
  }

  likeBtn.onclick = () => sendVote('likes');
  dislikeBtn.onclick = () => sendVote('dislikes');

  loadVotes();
});
