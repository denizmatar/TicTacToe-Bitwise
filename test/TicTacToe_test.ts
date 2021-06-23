import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

import { TicTacToe } from '../typechain/TicTacToe';
import exp from 'constants';

describe('TicTacToe', function () {
	let deployer: SignerWithAddress;
	let userX: SignerWithAddress;
	let userO: SignerWithAddress;

	let game: TicTacToe;
	let gameX: TicTacToe;
	let gameO: TicTacToe;

	const overrides = {
		value: ethers.utils.parseEther('1'),
	};

	beforeEach(async function () {
		[deployer, userX, userO] = await ethers.getSigners();

		const gameFactory = await ethers.getContractFactory('TicTacToe', deployer);
		game = await gameFactory.deploy(5 * 60, ethers.utils.parseEther('1'));
		await game.deployed();

		gameX = game.connect(userX);
		gameO = game.connect(userO);
	});
	it('should revert when 3rd player attempts to play', async function () {
		await gameX.select(1, 1, overrides);
		await gameO.select(2, 1, overrides);

		await expect(game.select(3, 1)).to.be.revertedWith('Game is already in process.');
	});
	it('should revert when new move == previous move', async () => {
		await gameX.select(1, 1, overrides);
		await gameO.select(2, 1, overrides);

		await expect(gameX.select(1, 1)).to.be.revertedWith('New move should be different than previous ones');

		await gameX.select(2, 2);

		await expect(gameO.select(2, 1)).to.be.revertedWith('New move should be different than previous ones');
	});
	it("should revert when new move == opponent's previous moves", async () => {
		await gameX.select(1, 1, overrides);
		await gameO.select(2, 1, overrides);

		await expect(gameX.select(2, 1)).to.be.revertedWith("New move should be different than opponent's moves");

		await gameX.select(2, 2);

		await expect(gameO.select(2, 2)).to.be.revertedWith("New move should be different than opponent's moves");
	});
	it("should revert when it's not that player's turn", async () => {
		await gameX.select(1, 1, overrides);

		await expect(gameX.select(1, 2)).to.be.revertedWith("It's not your turn.");

		await gameO.select(2, 1, overrides);

		await expect(gameO.select(2, 2)).to.be.revertedWith("It's not your turn.");
	});
	it('bet amount should be correct', async () => {
		await expect(gameX.select(2, 2, { value: ethers.utils.parseEther('2') })).to.be.revertedWith('Wrong bet amount');
	});
	it('should emit Tie event', async () => {
		await gameX.select(0, 0, overrides);
		await gameO.select(1, 0, overrides);
		await gameX.select(2, 0);
		await gameO.select(2, 1);
		await gameX.select(0, 1);
		await gameO.select(0, 2);
		await gameX.select(1, 1);
		await gameO.select(2, 2);

		const userXTable = ethers.utils.hexValue(47360); // => 101110010 0000000
		const userOTable = ethers.utils.hexValue(18048); // => 010001101 0000000

		await expect(gameX.select(1, 2)).to.emit(game, 'Tie').withArgs(userXTable, userOTable);
	});
	it('should emit Winner and Loser events', async () => {
		await gameX.select(2, 2, overrides);
		await gameO.select(1, 2, overrides);
		await gameX.select(1, 1);
		await gameO.select(0, 0);
		await gameX.select(2, 1);
		await gameO.select(0, 1);

		const userXTable = ethers.utils.hexValue(11392); // => 001011001 0000000
		const userOTable = ethers.utils.hexValue(37120); // => 100100010 0000000

		await expect(gameX.select(2, 0)).to.emit(game, 'Winner').withArgs(userX.address, userXTable, userOTable, ethers.utils.parseEther('1')).to.emit(game, 'Loser').withArgs(userO.address, userXTable, userOTable, ethers.utils.parseEther('1'));
	});
	it('should be able to withdraw when time is over', async () => {
		await gameX.select(2, 2, overrides);
		await gameO.select(1, 2, overrides);

		ethers.provider.send('evm_increaseTime', [10 * 60]);

		const balanceBefore = await ethers.provider.getBalance(userO.address);
		await gameX.withdraw();
		const balanceAfter = await ethers.provider.getBalance(userO.address);

		const balanceDifference = balanceAfter.sub(balanceBefore);

		expect(balanceDifference).to.be.equal(ethers.utils.parseEther('2'));
	});
	it("shouldn't be able to withdraw before time is over", async () => {
		await gameX.select(2, 2, overrides);
		await gameO.select(1, 2, overrides);

		await expect(gameX.withdraw()).to.be.revertedWith('Game is still in progress');
	});
	it('winner should get betAmount * 2', async () => {
		await gameX.select(2, 2, overrides);
		await gameO.select(1, 2, overrides);
		await gameX.select(1, 1);
		await gameO.select(0, 0);
		await gameX.select(2, 1);
		await gameO.select(0, 1);

		const balanceBefore = await ethers.provider.getBalance(userX.address);

		await gameX.select(2, 0);

		const balanceAfter = await ethers.provider.getBalance(userX.address);
		const balanceDifference = balanceAfter.sub(balanceBefore);

		expect(balanceDifference).to.be.above(ethers.utils.parseEther('1.9'));
	});
});
