import '../styles/ScoreBoard.scss'

function ScoreBoard( {score, highscore}: {score:number, highscore:number}) {

  return (
    <div className='score'>
      <div>
        Score: {score}
      </div>
      <div>
        High-score: {highscore}
      </div>
    </div>
  );
}

export default ScoreBoard;
