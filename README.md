# TicTacToe-Bitwise

## Table of contents
* [General Info](#general-info)
* [Tools](#tools)
* [Setup](#setup)

## General Info
This project is a traditional Tic-Tac-Toe game that is written in Solidity. The logic of this project uses **bitwise operations** to do things such as:
- Determine whether new move is different from previous ones
- Determine whether new move is different from opponent's moves
- Update player table

In order to achieve these tasks, 3x3 grid is coded into a bytes2 variable. An example would be:

```
    GRID DESIGN FOR PLAYER X                                  
    _________________________                             
    |  (1)  |  (0)  |  (1)  |                             
    |___X___|___O___|___X___|                             
    |  (0)  |  (1)  |  (0)  |   ==> 101 010 100 0000000   
    |___O___|___X___|_______|        |   |   |     |      
    |  (1)  |  (0)  |  (0)  |  First Row |   |     |      
    |___X___|_______|___O___|     Second Row |     |      
                                       Third Row   |      
                                                Padding   
                                                
                                                    
    GRID DESIGN FOR PLAYER O
    _________________________
    |  (0)  |  (1)  |  (0)  |
    |___X___|___O___|___X___|
    |  (1)  |  (0)  |  (0)  |   ==> 010 100 001 0000000
    |___O___|___X___|_______|        |   |   |     |
    |  (0)  |  (0)  |  (1)  |  First Row |   |     |
    |___X___|_______|___O___|     Second Row |     |
                                       Third Row   |
                                                Padding

```

When playerX wants to make a new move (e.g: X => (1,2)), the occuring bitwise operation would be: 

```
if (
  //          New Move       vs.       Current Table of X
  bytes2(000 000 010 0000000) & bytes2(101 010 100 0000000) == bytes2(0x00) &&
  //          New Move       vs.       Current Table of O
  bytes2(000 000 010 0000000) & bytes2(010 100 001 0000000) == bytes2(0x00)
  ) {
    return true;
  }
```

Current table is then updated with new move:

```            //          New Move       vs.       Current Table of X
playerXTable = bytes2(000 000 010 0000000) | bytes2(101 010 100 0000000)
// >> 101 010 110 0000000

```

## Tools
Project is created with:
* Solidity
* Hardhat
* Typescript
	
## Setup & Test
To run this project, install it locally using yarn:

```
$ yarn build
$ yarn test
```
