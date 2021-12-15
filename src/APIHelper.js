const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const createGame = () => fetch(
  `${apiURL}/games/`,
  {
    method: 'POST',
    body: JSON.stringify({
      name: 'My very cool new game',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  },
)
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('game_id', data.result.split(' ')[3]);
  });

const postScore = (gameId, name, score) => {
  fetch(
    `${apiURL}/games/${gameId}/scores`,
    {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => response.json());
};

const fetchScores = (gameId) => fetch(`${apiURL}/games/${gameId}/scores`).then((response) => response.json());

export default { fetchScores, createGame, postScore };