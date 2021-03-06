/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null;


dodger.style.backgroundColor = "yellow";

function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top)

  
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;
    
    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||     
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)  ) ;
    }
  
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);


  
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    
    if (checkCollision(rock)) {
      return endGame()}
  
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
    }
 else {
    rock.remove ();
}
}
  window.requestAnimationFrame(moveRock)
    
    
  ROCKS.push(rock)


  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock) { rock.remove() })
  document.removeEventListener('keydown', moveDodger)
    START.innerHTML = 'VUOI RIPROVARE ANCHE SE SEI SCARSO?'
  START.style.display = 'inline'
  
  return alert('TA PECCAU, O SHRIMPU!')
}
  

function moveDodger(e) {
const code = e.which

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

  if (code === LEFT_ARROW) {
    moveDodgerLeft()
  } else if (code === RIGHT_ARROW) {
    moveDodgerRight()
  }
}



function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);
 
  if (left > 0) {
    dodger.style.left = `${left - 4}px`;
  }
}

function moveDodgerRight() {
 var rightNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(rightNumbers, 10)
 
  if (left < 360) {
    dodger.style.left = `${left + 4}px`;
  }
}


function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}

