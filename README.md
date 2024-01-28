# Tic tac toe

# Main code

See App.txs for the game code

## Premise

* Write the game with the least amount of code in the quickest time (15mins)
* Use the least amounnt of memory and time
* All data read and writes are O(1)

## Main idea behind the solution

* Every win includes the final move
* There is no need to iterate the entire board
* Whan a player makes a move, use that position to check a win
* Use counting to across rows, columns and diagonals for efficient win checks

## Counting algorithm for win check

* There are four win checks, rows, columns and two diagonals
* Initailise all 4 win checks to 0 at start of the game
* For each move modify the four win counters, +1 for X and -1 for O
* Use the column index to modify the column win counter
* Use the row index to modify the row win counter
* If row index === column index, modify the diagonal win counter
* If row index === 3 - 1 - column index, modify the reverse diagonal win counter
* If a 3 occurs in a win counter then X wins the game
* If a -3 occurs in a win counter then O wins the game
