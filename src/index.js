import './style.css';
import APIhelper from './APIHelper';

const refreshBtn = document.getElementById('refresh-btn');
const form = document.querySelector('form');
const scoresList = document.querySelector('.scores__table ul');

APIhelper.createGame();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  APIhelper.postScore(form.name.value, form.score.value);
});

refreshBtn.addEventListener('click', async () => {
  const data = await APIhelper.fetchScores();
  if(data.result.length > 0) {
    scoresList.classList.remove('d-none');
  }
  scoresList.innerHTML = data.result.map((obj) => {
    return `<li>${obj.user}: ${obj.score}</li>`
  }).join('');
});