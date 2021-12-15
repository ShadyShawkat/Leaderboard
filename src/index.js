import './style.css';
import APIhelper from './APIHelper.js';

const refreshBtn = document.getElementById('refresh-btn');
const form = document.querySelector('form');
const scoresList = document.querySelector('.scores__table ul');

APIhelper.createGame();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  APIhelper.postScore(form.name.value, form.score.value);
  form.name.value = '';
  form.score.value = '';
  refreshBtn.click();
});

refreshBtn.addEventListener('click', async () => {
  const data = await APIhelper.fetchScores();
  if (data.result.length > 0) {
    scoresList.classList.remove('d-none');
  }
  scoresList.innerHTML = data.result.map((obj) => `<li>${obj.user}: ${obj.score}</li>`).join('');
});