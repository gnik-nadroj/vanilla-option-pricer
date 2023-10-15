import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {Length} from "class-validator"
import { FinancialDefinition } from "./financialDefinition";
import { MarketData } from "./marketData";
import { Trade } from "./trade";


@Entity({name: "users"})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({name: "Id", type: "bigint"})
    id: string;

    @Column("varchar", {
        name: "Email",
        length: 120,
        unique: true, 
        nullable: false,
    })
    email: string;

    @Column("varchar", {
        name: "Firstname",
        length: 60, 
        nullable: false,
    })
    firstname: string;

    @Column("varchar", {
        name: "Lastname",
        length: 60,
        nullable: false,
    })
    lastname: string;

    @Column("varchar", {
        name: "Password",
        length: 100, 
        nullable: false,
    })
    @Length(8, 100)
    password: string;

    @Column("boolean", {
        name: "Confirmed",
        default: false, 
        nullable: false,
    })
    confirmed: boolean;

    @OneToMany(() => FinancialDefinition, (financialDef) => financialDef.user)
    financialsDefs: FinancialDefinition[];

    @OneToMany(() => MarketData, (marketData) => marketData.user)
    marketsData: MarketData[];

    @OneToMany(() => Trade, (trade) => trade.user)
    trades: Trade[];
}
