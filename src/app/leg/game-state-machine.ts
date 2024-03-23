import { Matrix } from "ts-matrix"
import { createMachine, setup } from "xstate"
import { BasePlayer } from "../game-logic/player.model"

const emptySecondOrderBoard = () => {
    return new Matrix(9,9)
}

export const newGameMachine = (player1: BasePlayer , player2 : BasePlayer) => {
  const machine =  setup({
    types: {
      context: {} as {
        board: Matrix,
        '1' : BasePlayer,
        '2' : BasePlayer,
      },
      events: {} as 
      | { type: 'start game'} 
      | { type: 'finish game'}
      | { type: 'play round' }
    },
    schemas : {
      events: {

      }
    },
  }).createMachine({
    context : {
      board: emptySecondOrderBoard(),
      '1': player1,
      '2' : player2
    },
    id: 'game',
    initial : 'off',
    states : {
      off : {
        on : {
          'start game' : {
            target : 'playing'
          }
        }
      },
      playing : {
        states : {
          '1' : {
            on : {
              'play round' : {
                target : '2'
              }
            }
          },
          '2' : {
            on : {
              'play round' : {
                target : '1'
              }
            }
          }
        },
        initial : '1',
        on : {
          'finish game' : {
            target : 'finished'
          }
        }
      },
      finished : {
        type: 'final'
      }
    }
  })

  return machine
}



const b = emptySecondOrderBoard()

console.log(b.toString())