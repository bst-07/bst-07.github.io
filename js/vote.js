document.addEventListener('DOMContentLoaded', () => {
  const gameContainers = document.querySelectorAll('.game-container');

  // Load votes and user votes
  const votes = JSON.parse(localStorage.getItem('votes')) || {};
  const userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};

  gameContainers.forEach(container => {
    const slug = container.dataset.slug;
    const likeBtn = container.querySelector('.like-btn');
    const dislikeBtn = container.querySelector('.dislike-btn');
    const likeCount = container.querySelector('.like-count');
    const dislikeCount = container.querySelector('.dislike-count');

    // Initialize votes if missing
    if (!votes[slug]) votes[slug] = { likes: 0, dislikes: 0 };

    // Display initial counts
    likeCount.textContent = votes[slug].likes;
    dislikeCount.textContent = votes[slug].dislikes;

    function updateVote(newVote) {
      const oldVote = userVotes[slug];

      if (oldVote === newVote) return; // no change

      // Decrease old vote if exists
      if (oldVote) votes[slug][oldVote]--;

      // Increase new vote
      votes[slug][newVote]++;

      // Save new vote
      userVotes[slug] = newVote;

      // Update localStorage
      localStorage.setItem('votes', JSON.stringify(votes));
      localStorage.setItem('userVotes', JSON.stringify(userVotes));

      // Update UI
      likeCount.textContent = votes[slug].likes;
      dislikeCount.textContent = votes[slug].dislikes;
    }

    likeBtn.addEventListener('click', () => updateVote('likes'));
    dislikeBtn.addEventListener('click', () => updateVote('dislikes'));
  });
});
