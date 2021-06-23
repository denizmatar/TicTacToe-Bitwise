//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./ITicTacToe.sol";

contract TicTacToe is ITicTacToe {
    /*  

    CURRENT GRID DESIGN FOR PLAYER X
    _________________________
    |  (1)  |  (0)  |  (1)  |
    |___X___|___O___|___X___|
    |  (0)  |  (1)  |  (0)  |   ==> 101 010 100 0000000
    |___O___|___X___|_______|        |   |   |     |
    |  (1)  |  (0)  |  (0)  |  First Row |   |     |
    |___X___|_______|___O___|     Second Row |     |
                                       Third Row   |
                                                Padding
    
    CURRENT GRID DESIGN FOR PLAYER O
    _________________________
    |  (0)  |  (1)  |  (0)  |
    |___X___|___O___|___X___|
    |  (1)  |  (0)  |  (0)  |   ==> 010 100 001 0000000
    |___O___|___X___|_______|        |   |   |     |
    |  (0)  |  (0)  |  (1)  |  First Row |   |     |
    |___X___|_______|___O___|     Second Row |     |
                                       Third Row   |
                                                Padding

    */

    bytes2[8] winningPositions = [
        bytes2(0xE000), // 111 000 000 0000000
        bytes2(0x1C00), // 000 111 000 0000000
        bytes2(0x0380), // 000 000 111 0000000
        bytes2(0x9200), // 100 100 100 0000000
        bytes2(0x4900), // 010 010 010 0000000
        bytes2(0x2480), // 001 001 001 0000000
        bytes2(0x8880), // 100 010 001 0000000
        bytes2(0x2A00) // 001 010 100 0000000
    ];

    bytes2[9] indexToSelection = [
        bytes2(0x8000), // (0, 0) => 100 000 000 0000000
        bytes2(0x4000), // (1, 0) => 010 000 000 0000000
        bytes2(0x2000), // (2, 0) => 001 000 000 0000000
        bytes2(0x1000), // (0, 1) => 000 100 000 0000000
        bytes2(0x0800), // (1, 1) => 000 010 000 0000000
        bytes2(0x0400), // (2, 1) => 000 001 000 0000000
        bytes2(0x0200), // (0, 2) => 000 000 100 0000000
        bytes2(0x0100), // (1, 2) => 000 000 010 0000000
        bytes2(0x0080) // (2, 2) => 000 000 001 0000000
    ];

    uint256 gameEndsAt;
    uint256 betAmount;

    bytes2 public playerXTable = 0x0;
    bytes2 public playerOTable = 0x0;

    address payable playerXAddress;
    address payable playerOAddress;

    uint8 playerXMoveCount = 0;
    uint8 playerOMoveCount = 0;

    constructor(uint256 _gameDurationSeconds, uint256 _betAmount) {
        playerXTable = 0x0;
        playerXMoveCount = 0;

        playerOTable = 0x0;
        playerOMoveCount = 0;

        gameEndsAt = block.timestamp + _gameDurationSeconds;

        betAmount = _betAmount;
    }

    function select(uint8 column, uint8 row) external payable override {
        uint8 moveCountDifference = playerXMoveCount - playerOMoveCount;

        // First comer is assigned to playerX
        if (playerXAddress == address(0)) {
            playerXAddress = payable(msg.sender);
            require(msg.value == betAmount, "Wrong bet amount");
        } else if (
            playerOAddress == address(0) && msg.sender != playerXAddress
        ) {
            playerOAddress = payable(msg.sender);
            require(msg.value == betAmount, "Wrong bet amount");
        }

        require(
            msg.sender == playerXAddress || msg.sender == playerOAddress,
            "Game is already in process."
        );

        if (msg.sender == playerXAddress) {
            require(moveCountDifference == 0, "It's not your turn.");

            uint8 index = (row * 3) + column;
            bytes2 newPosition = indexToSelection[index];

            require(
                playerXTable & newPosition == bytes2(0x00),
                "New move should be different than previous ones"
            );
            require(
                newPosition & playerOTable == bytes2(0x00),
                "New move should be different than opponent's moves"
            );

            // Update player table
            playerXTable = playerXTable | newPosition;

            playerXMoveCount += 1;

            emit Select(playerXAddress, column, row);

            if (_winner(playerXTable)) {
                playerXAddress.transfer(betAmount * 2);
                emit Winner(
                    playerXAddress,
                    playerXTable,
                    playerOTable,
                    betAmount
                );
                emit Loser(
                    playerOAddress,
                    playerXTable,
                    playerOTable,
                    betAmount
                );
            }
        } else if (msg.sender == playerOAddress) {
            require(moveCountDifference == 1, "It's not your turn.");

            uint8 index = (row * 3) + column;
            bytes2 newPosition = indexToSelection[index];

            require(
                playerOTable & newPosition == bytes2(0x00),
                "New move should be different than previous ones"
            );
            require(
                newPosition & playerXTable == bytes2(0x00),
                "New move should be different than opponent's moves"
            );

            // Update player table
            playerOTable = playerOTable | newPosition;

            playerOMoveCount += 1;

            emit Select(playerOAddress, column, row);

            if (_winner(playerOTable)) {
                playerOAddress.transfer(betAmount * 2);
                emit Winner(
                    playerOAddress,
                    playerXTable,
                    playerOTable,
                    betAmount
                );
                emit Loser(
                    playerXAddress,
                    playerXTable,
                    playerOTable,
                    betAmount
                );
            }
        }

        if (playerXMoveCount + playerOMoveCount == 9) {
            playerXAddress.transfer(betAmount);
            playerOAddress.transfer(betAmount);
            emit Tie(playerXTable, playerOTable);
            _restart();
        }
    }

    function _winner(bytes2 playerTable) internal view returns (bool won) {
        for (uint8 i = 0; i < winningPositions.length; i++) {
            if (playerTable & winningPositions[i] == winningPositions[i]) {
                return true;
            }
        }
    }

    function _restart() internal {
        playerXTable = bytes2(0);
        playerXAddress = payable(address(0));

        playerOTable = bytes2(0);
        playerOAddress = payable(address(0));

        playerXMoveCount = 0;
        playerOMoveCount = 0;

        emit Restart();
    }

    function getTable(uint8 player) public view override returns (bytes2) {
        if (player == 0) {
            return playerXTable;
        } else if (player == 1) {
            return playerOTable;
        } else {
            revert("Only use 0 for playerX, and 1 for playerO");
        }
    }

    function withdraw() external override {
        uint8 moveCountDifference = playerXMoveCount - playerOMoveCount;

        if (block.timestamp > gameEndsAt) {
            if (moveCountDifference == 0) {
                emit Overtime(playerXAddress);
                playerOAddress.transfer(betAmount * 2);
                _restart();
            } else if (moveCountDifference == 1) {
                emit Overtime(playerOAddress);
                playerXAddress.transfer(betAmount * 2);
                _restart();
            }
        } else {
            revert("Game is still in progress");
        }
    }
}
