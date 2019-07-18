![SCRABBLE ATTACKS](public/images/logo.png)

## Rules

- All tiles are flipped over at the beginning
- Players take turns, flipping over one tile at a time
- If there is a word of 4 or more letters in the overturned tiles, a player can shout it out to
  claim it
- Also, if a player can add an overturned title to an existing word or combine two existing words to
  make a new word,
- You can't just add an `S`, `D`, or `R` to the end of a word
- Once tiles are in a word, they can't be removed, although they can be rearranged within that word
  or combined with other tiles or words
- The last person to claim a word has the next turn
- It doesn't have to be your turn to claim a word
- Your score is the scrabble point value of all the words you've claimed

## UI

- 3 columns

```
| player 1 | tiles | player 2 |

FOO BAR (Nancy's words)

---------------------------

[] [] [] [] [] []  (unflipped tiles)

[] [] [] [] []

[A] [B] [C]

----------------------------

CAT FROG (Herb's words)

Herb's turn to flip
```

## Components

- Tile
  - shows letter and point value on one side
  - can be flipped
- Word
  - consists of multiple tiles in order
  - has a score
- Word input
  - validates a word
- Player
  - has zero or more words
  - has a score
  - can flip a tile if it's their turn
  - can input a word at any time
- Board

## Events

- tile flip
- word proposed
- word accepted/rejected
- turn assignment

## Prior art

- Tile styling swiped from [this Codepen](https://codepen.io/32bitkid/pen/NPEgbx) by
  [@32bitkid](https://codepen.io/32bitkid/pen/NPEgbx)
