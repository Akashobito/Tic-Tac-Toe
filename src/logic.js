// const array = [
//   ["x", "o", ""],
//   ["", "x", ""],
//   ["o", "", "x"],
// ];

export function checkWin(array,moveCount,pvp) {
  let horizontal = [];
  let vertical = [];
  let xway = [];
  for (let a = 0; a < 3; a++) {
    for (let i = 0; i <= 0; i++) {
      for (let j = 1; j <= 1; j++) {
        for (let k = 2; k <= 2; k++) {
          horizontal[a] = array[a][i] + array[a][j] + array[a][k];
        }
      }
    }
  }

  for (let a = 0; a < 3; a++) {
    for (let i = 0; i <= 0; i++) {
      for (let j = 1; j <= 1; j++) {
        for (let k = 2; k <= 2; k++) {
          vertical[a] = array[i][a] + array[j][a] + array[k][a];
        }
      }
    }
  }

    for(let i = 0; i <=0 ; i++){
      for(let j = 1; j <=1; j++ ){
        for(let k = 2; k <=2; k++){
          xway[i] = array[i][i]+ array[j][j]+ array[k][k]
          xway[j] = array[i][k] + array[j][j] + array[k][i]
        }
      }
    }


  function findWin() {
    for (let i = 0; i < 3; i++) {
      switch (horizontal[i]) {
        case "xxx": {
          return "x win";
        }
        case "ooo": {
          return "o win";
        }
      }
      switch (vertical[i]) {
        case "xxx": {
          return "x win";
        }
        case "ooo": {
          return "o win";
        }
      }

      switch(xway[i]){
        case "xxx": {
          return "x win";
        }
        case "ooo": {
          return "o win";
        }
      }
    }
    if(!pvp){
      return moveCount >=5? "draw": '';
    }else{
      return moveCount >=9? 'draw': '';
    }
  }
  const result = findWin();
  return result
}
