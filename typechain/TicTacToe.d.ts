/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface TicTacToeInterface extends ethers.utils.Interface {
  functions: {
    "getTable(uint8)": FunctionFragment;
    "playerOTable()": FunctionFragment;
    "playerXTable()": FunctionFragment;
    "select(uint8,uint8)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getTable",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "playerOTable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "playerXTable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "select",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "getTable", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "playerOTable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "playerXTable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "select", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Loser(address,bytes2,bytes2,uint256)": EventFragment;
    "Overtime(address)": EventFragment;
    "Restart()": EventFragment;
    "Select(address,uint8,uint8)": EventFragment;
    "Tie(bytes2,bytes2)": EventFragment;
    "Winner(address,bytes2,bytes2,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Loser"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Overtime"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Restart"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Select"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Tie"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Winner"): EventFragment;
}

export class TicTacToe extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TicTacToeInterface;

  functions: {
    getTable(
      player: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    playerOTable(overrides?: CallOverrides): Promise<[string]>;

    playerXTable(overrides?: CallOverrides): Promise<[string]>;

    select(
      column: BigNumberish,
      row: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getTable(player: BigNumberish, overrides?: CallOverrides): Promise<string>;

  playerOTable(overrides?: CallOverrides): Promise<string>;

  playerXTable(overrides?: CallOverrides): Promise<string>;

  select(
    column: BigNumberish,
    row: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getTable(player: BigNumberish, overrides?: CallOverrides): Promise<string>;

    playerOTable(overrides?: CallOverrides): Promise<string>;

    playerXTable(overrides?: CallOverrides): Promise<string>;

    select(
      column: BigNumberish,
      row: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    Loser(
      player?: string | null,
      tableX?: null,
      tableO?: null,
      betAmount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { player: string; tableX: string; tableO: string; betAmount: BigNumber }
    >;

    Overtime(
      penaltyPlayer?: string | null
    ): TypedEventFilter<[string], { penaltyPlayer: string }>;

    Restart(): TypedEventFilter<[], {}>;

    Select(
      player?: string | null,
      column?: null,
      row?: null
    ): TypedEventFilter<
      [string, number, number],
      { player: string; column: number; row: number }
    >;

    Tie(
      tableX?: null,
      table0?: null
    ): TypedEventFilter<[string, string], { tableX: string; table0: string }>;

    Winner(
      player?: string | null,
      tableX?: null,
      tableO?: null,
      betAmount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { player: string; tableX: string; tableO: string; betAmount: BigNumber }
    >;
  };

  estimateGas: {
    getTable(
      player: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    playerOTable(overrides?: CallOverrides): Promise<BigNumber>;

    playerXTable(overrides?: CallOverrides): Promise<BigNumber>;

    select(
      column: BigNumberish,
      row: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getTable(
      player: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    playerOTable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    playerXTable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    select(
      column: BigNumberish,
      row: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}