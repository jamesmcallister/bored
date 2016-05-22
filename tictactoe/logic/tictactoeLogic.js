var square = require("../model/square");
var playState = require('../model/playState.js')

var emptyRow = [square.EMPTY, square.EMPTY, square.EMPTY]
var emptyBoard = [
  emptyRow,
  emptyRow,
  emptyRow
]
function gameBoard(board, squareToPlay, currentPlayState) {
  return {
    calculatePlayState: function (board) {
      var squareToWinner = function (testSquare) {
        if (testSquare == square.NOUGHT) {
          return playState.NOUGHT_WINS
        }
        else
          return playState.CROSS_WINS
      }
      for (var y = 0; y < 3; y++) {
        if (
          board[0][y] != square.EMPTY &&
          board[0][y] == board[1][y] &&
          board[1][y] == board[2][y]) {
          return squareToWinner(board[0][y])
        }
      }
      for (var x = 0; x < 3; x++) {
        if (
          board[x][0] != square.EMPTY &&
          board[x][0] == board[x][1] &&
          board[x][1] == board[x][2]) {
          return squareToWinner(board[x][0])
        }
      }
      if (board[1][1] != square.EMPTY && (
        (board[0][0] == board[1][1] && board[1][1] == board[2][2]) || (board[0][2] == board[1][1] && board[1][1] == board[2][0]))
      ) {
        return squareToWinner(board[1][1])
      }
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          if (board[x][y] == square.EMPTY) {
            return playState.IN_PLAY
          }
        }
      }
      return playState.DRAWN
    },
    testCanPlay: function (newX, newY, crossOrNought) {
      return currentPlayState != playState.IN_PLAY || !(Number.isInteger(newX)) || !(Number.isInteger(newY)) ||
        (crossOrNought != squareToPlay) ||
        newX < 0 || newX > 2 || newY < 0 || newY > 2 ||
        board[newX][newY] != square.EMPTY

    },
    play: function (newX, newY, crossOrNought) {
      if (
        this.testCanPlay(newX, newY, crossOrNought)
      ) {
        return gameBoard(board, squareToPlay, currentPlayState)
      }
      var newBoard = []
      for (var x = 0; x < 3; x++) {
        newBoard.push([])
        for (var y = 0; y < 3; y++) {
          newBoard[x].push(board[x][y])
        }
      }
      newBoard[newX][newY] = crossOrNought
      var newPlayState = this.calculatePlayState(newBoard)
      if (newPlayState == playState.IN_PLAY) {
        if (squareToPlay == square.NOUGHT) {
          return gameBoard(newBoard, square.CROSS, newPlayState)
        }
        else {
          return gameBoard(newBoard, square.NOUGHT, newPlayState)
        }
      }
      {
        return gameBoard(newBoard, square.EMPTY, newPlayState)
      }

    },
    square: function (x, y) {
      return board[x][y]
    },
    getSquareToPlay: function () {
      return squareToPlay
    },
    getPlayState: function () {
      return currentPlayState
    },
    equal: function(anotherBoard) {
      if (squareToPlay != anotherBoard.getSquareToPlay()) {
        return false
      }
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          if (board[x][y] != anotherBoard.square(x, y)) {
            return false
          }
        }
      }
      return true
    }
  }
}

module.exports = {
  emptyBoardCrossToPlay: gameBoard(emptyBoard, square.CROSS, playState.IN_PLAY),
  emptyBoardNoughtToPlay: gameBoard(emptyBoard, square.NOUGHT, playState.IN_PLAY)

}