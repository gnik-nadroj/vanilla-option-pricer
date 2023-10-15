import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { FinancialDefinition } from "./financialDefinition";
import { MarketData } from "./marketData";
import { User } from "./user";
//import {Length} from "class-validator"


@Entity({ name: "trades" })
export class Trade extends BaseEntity{
    @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
    id: string;

    @Column("date", {
        name: "Date",
        nullable: false,
    })
    date: Date;

    @Column("int", {
        name: "Quantity",
        nullable: false,
    })
    quantity: number;

    @Column("double", {
        name: "Price",
        nullable: false,
    })
    price: number;

    @ManyToOne(
        () => User,
        (user: User) => user.trades
    )
    user: User;

    @ManyToOne(
        () => FinancialDefinition,
        (financialDef: FinancialDefinition) => financialDef.trades
    )
    financialDef: FinancialDefinition;

    @ManyToOne(
        () => MarketData,
        (marketData: MarketData) => marketData.trades
    )
    marketData: MarketData
}


