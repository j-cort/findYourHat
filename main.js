const prompt = require('prompt-sync')({sigint: true});

let y = 0;
let x = 0;
let move = '';
let validInput = false;


class Field {

  constructor(field) {
    this.field = field;
  }

  static generateField(height, width, percentage) {
    // generate 2D array according to height/width dimension and fill it with neutral field characters
    let gameField = [];
    for (let i = 0; i < height; i++) {
      gameField.push([]);
        for (let j = 0; j < width; j++) {
          gameField[i].push('░');
        }
    }
    
    // calculate number of holes to insert into the array, insert them at random points in the array except at the start point or where another hole already exists 
  const holeCount = Math.floor((percentage/100) * (height*width))

    let k = 0;
    while (k < holeCount) {
      let y = Math.floor(Math.random() * height);
      let x = Math.floor(Math.random() * width);
      if ((y === 0 && x === 0) || gameField[y][x] === 'O') {
        k = k + 0;
      } else {
        gameField[y][x] = 'O';
        k++;
      }    
    }
  
  // Add '*' to top left of field
   gameField[0][0] = '*';
  
  // Add hat randomly to the array, avoiding '*' or 'O' positions
  let hatAdded = false;
  while (!hatAdded) {
     let v = Math.floor(Math.random() * height);
     let h = Math.floor(Math.random() * width);
     if ((v === 0 && h === 0) || gameField[v][h] === 'O') {
     hatAdded = false;
    } else {
     gameField[v][h] = '^';
     hatAdded = true;
    }       
  }

  return gameField;
}

  startGame() {
    this.print();
    this.promptInput();
    this.relocate(move);
    this.determineOutcome(y, x);
  }

  print() {
    for (let i in this.field) {
  console.log(this.field[i].join(''));
    }
  }

  promptInput() {
  if (!move) {
  move = prompt('Which Way?').toLowerCase();
    }
  }

  relocate(input) {
  if (input === 'r') {
    x++;
    validInput = true;
  } else if (input === 'l') {
    x--;
    validInput = true;
  } else if (input === 'u') {
    y--;
    validInput = true;
  } else if (input === 'd') {
    y++;
    validInput = true;
  } else {
    validInput = false;
  }
}

determineOutcome(y, x) {
  if (validInput === false) {
    console.log('Invalid input. Enter (u, d, l or r).');
    move = '';
    this.startGame(); 
  } 
  
  if (validInput === true && (y < 0 || y > this.field.length-1 || x < 0 || x > this.field[0].length-1)) {
    console.log('You are out of bounds! Game exit...');
    process.exit(0);
    } 

  if (validInput === true && this.field[y][x] === 'O') {
      console.log('Oh no! You fell down a hole. Game exit...');
      process.exit(0);
    } 
  
  if (validInput === true && this.field[y][x] === '^') {
      console.log('Congrats you found your hat!!! Game exit...');
      process.exit(0);
    }   

     if (validInput === true && this.field[y][x] === '*') {
      console.log('No turning back! Game exit...');
       process.exit(0);
    } 
    
    if (validInput === true && this.field[y][x] === '░') {
      move = '';
      console.log('Keep going...');
      this.field[y][x] = '*';
      this.startGame();
    }    
}  

};

const myField = new Field(Field.generateField(5, 10, 20));

myField.startGame();

