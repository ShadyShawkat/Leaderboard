import './style.css';
import APIhelper from './APIHelper.js';

const refreshBtn = document.getElementById('refresh-btn');
const form = document.querySelector('form');
const scoresList = document.querySelector('.scores__table ul');
let gameId = '';

const renderUI = async () => {
  const data = await APIhelper.fetchScores(gameId);
  if (data.result.length > 0) {
    scoresList.classList.remove('d-none');
  }
  scoresList.innerHTML = data.result.map((obj) => `<li>${obj.user}: ${obj.score}</li>`).join('');
};

const localstorageGameId = localStorage.getItem('game_id');
if (!localstorageGameId) {
  APIhelper.createGame().then(() => {
    gameId = localStorage.getItem('game_id');
  });
} else {
  gameId = localStorage.getItem('game_id');
  renderUI();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  APIhelper.postScore(gameId, form.name.value, form.score.value);
  form.name.value = '';
  form.score.value = '';
  renderUI();
});

refreshBtn.addEventListener('click', renderUI);