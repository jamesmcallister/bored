var assert = require('chai').assert;
var tictactoeLogic = require('../../logic/tictactoeLogic.js')
var Square = require('../../model/square.js')
var playState = require('../../model/playState.js')


describe('TicTacToe Logic', function() {
  describe('new board', function () {
    it('should contain 9 empty cells', function () {
      var board = tictactoeLogic.emptyBoardCrossToPlay;
      assert.equal(board.getPlayState(), playState.IN_PLAY)
      assert.equal(board.getSquareToPlay(),Square.CROSS)
      for (var x=0; x<3; x++) {
        for (var y=0; y<3; y++) {
          assert.equal(board.square(x, y), Square.EMPTY)
        }
      }
    });
  });
  describe('game play', function () {
    it('should play a move correctly', function () {
      for (var x=0; x<3; x++) {
        for (var y=0; y<3; y++) {
          var afterMove1Board = tictactoeLogic.emptyBoardCrossToPlay.play(x,y,Square.CROSS);
          assert.equal(afterMove1Board.getPlayState(), playState.IN_PLAY)
          assert.equal(afterMove1Board.square(x, y), Square.CROSS)
          assert.equal(afterMove1Board.getSquareToPlay(),Square.NOUGHT)
          for (var nextX=0; nextX<3; nextX++) {
            for (var nextY = 0; nextY < 3; nextY++) {
              if(x != nextX && y != nextY) {
                assert.equal(afterMove1Board.square(nextX, nextY), Square.EMPTY)

              }
            }
          }
        }
      }
    });
    it('should fail to play a move when already played', function () {
      for (var x=0; x<3; x++) {
        for (var y=0; y<3; y++) {
          var afterMove1Board = tictactoeLogic.emptyBoardCrossToPlay.play(x,y,Square.CROSS);
          var afterMove2Board = afterMove1Board.play(x,y,Square.NOUGHT);
          assert.equal(afterMove2Board.square(x, y), Square.CROSS)
        }
      }
    });
    it('should only play valid squares', function () {
      for (var x=0; x<3; x++) {
        for (var y=0; y<3; y++) {
          var afterMove1Board = tictactoeLogic.emptyBoardCrossToPlay.play(x,y,"invalid");
          assert.equal(afterMove1Board.square(x, y), Square.EMPTY)
        }
      }
    });
    it('test out of range squares', function () {
      var negativeSquareTest = tictactoeLogic.emptyBoardCrossToPlay.play(-1,-1,Square.CROSS);
      assert.equal(negativeSquareTest.equal(tictactoeLogic.emptyBoardCrossToPlay),true)
      var fourthRowColumnTest = tictactoeLogic.emptyBoardCrossToPlay.play(4,4,Square.CROSS);
      assert.equal(fourthRowColumnTest.equal(tictactoeLogic.emptyBoardCrossToPlay),true)
    });
  });
  describe('end of game', function () {

    it('nought wins row', function () {
      const noughtWins = tictactoeLogic.emptyBoardNoughtToPlay
        .play(0,0,Square.NOUGHT)
        .play(1,0,Square.CROSS)
        .play(0,1,Square.NOUGHT)
        .play(1,1,Square.CROSS)
        .play(0,2,Square.NOUGHT)
      assert.equal(noughtWins.getPlayState(),  playState.NOUGHT_WINS)
      assert.equal(noughtWins.getSquareToPlay(),Square.EMPTY)
      var crossTriesToContinue = noughtWins.play(2,2,Square.CROSS)
      assert(crossTriesToContinue.equal(noughtWins),true)
    });
    it('cross wins column', function () {
      const crossWins = tictactoeLogic.emptyBoardCrossToPlay
        .play(0,0,Square.CROSS)
        .play(0,1,Square.NOUGHT)
        .play(1,0,Square.CROSS)
        .play(0,2,Square.NOUGHT)
        .play(2,0,Square.CROSS)
      assert.equal(crossWins.getPlayState(),  playState.CROSS_WINS)
      assert.equal(crossWins.getSquareToPlay(),Square.EMPTY)
      var crossTriesToContinue = crossWins.play(2,2,Square.NOUGHT)
      assert(crossTriesToContinue.equal(crossWins),true)
    });
    it('cross wins diagonal', function () {
      const crossWins = tictactoeLogic.emptyBoardCrossToPlay
        .play(0,0,Square.CROSS)
        .play(0,1,Square.NOUGHT)
        .play(1,1,Square.CROSS)
        .play(0,2,Square.NOUGHT)
        .play(2,2,Square.CROSS)
      assert.equal(crossWins.getPlayState(),  playState.CROSS_WINS)
      assert.equal(crossWins.getSquareToPlay(),Square.EMPTY)
      var crossTriesToContinue = crossWins.play(1,2,Square.NOUGHT)
      assert(crossTriesToContinue.equal(crossWins),true)
    });
    it('draw', function () {
      const drawState = tictactoeLogic.emptyBoardCrossToPlay
        .play(0,0,Square.CROSS)
        .play(1,0,Square.NOUGHT)
        .play(2,0,Square.CROSS)
        .play(1,1,Square.NOUGHT)
        .play(0,1,Square.CROSS)
        .play(2,1,Square.NOUGHT)
        .play(1,2,Square.CROSS)
        .play(0,2,Square.NOUGHT)
        .play(2,2,Square.CROSS)
      assert.equal(drawState.getPlayState(),  playState.DRAWN)
      assert.equal(drawState.getSquareToPlay(),Square.EMPTY)
      var crossTriesToContinue = drawState.play(1,2,Square.NOUGHT)
      assert(crossTriesToContinue.equal(drawState),true)
    });
  });

});