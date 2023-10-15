import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import { Trade } from "./trade";
import { User } from "./user";
//import {Length} from "class-validator"

@Entity({ name: "marketdata" })
export class MarketData extends BaseEntity {
    @PrimaryGeneratedColumn({name: "Id", type: "bigint"})
    id: string;

    @Column("double", {
        name: "Volatility",
        nullable: false
    })
    volatility: number;

    @Column("double", {
        name: "Spot",
        nullable: false
    })
    spot: number;

    @Column("double", {
        name: "InterestRate",
        nullable: false
    })
    interestRate: number;

    @ManyToOne(
        () => User,
        (user: User) => user.marketsData
    )
    user: User

    @OneToMany(() => Trade, (trade) => trade.marketData)
    trades: Trade[];
}

