// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev Interface of TicTacToe.
 */
interface ITicTacToe {
    /**
     * @dev Assigns first player to PlayerX.
     *
     * Transforms player move into bytes2 position, and merges it with current table status if applicable.
     *
     * Checks if player wins with the latest move.
     */
    function select(uint8 column, uint8 row) external payable;

    /**
     * @dev Lets non-absent player to withdraw betAmount * 2 after block.timestamp exceeds game duration.
     */
    function withdraw() external;

    /**
     * @dev Returns desired players table.
     */

    function getTable(uint8 player) external returns (bytes2);

    /**
     * @dev Emitted when player makes a valid move.
     */
    event Select(address indexed player, uint8 column, uint8 row);

    /**
     * @dev Emited when one of the player wins or loses
     */
    event Winner(
        address indexed player,
        bytes2 tableX,
        bytes2 tableO,
        uint256 betAmount
    );

    /**
     * @dev Emited when one of the player wins or loses
     */
    event Loser(
        address indexed player,
        bytes2 tableX,
        bytes2 tableO,
        uint256 betAmount
    );

    /**
     * @dev Emited when total move count reaches to 9 and there isn't a winner.
     */
    event Tie(bytes2 tableX, bytes2 table0);

    /**
     * @dev Emitted when 'withdraw()' function is called after game ends before completing due to time restriction.
     */
    event Overtime(address indexed penaltyPlayer);

    /**
     * @dev Emitted when game restarts.
     */
    event Restart();
}
