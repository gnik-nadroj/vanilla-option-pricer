import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import { Instrument } from "./instrument";
import { Trade } from "./trade";
import { User } from "./user";

export enum OptionType {
    CALL = "call",
    PUT = "put"
}

@Entity({ name: "financialsdefinitions" })
export class FinancialDefinition extends BaseEntity {
    @PrimaryGeneratedColumn({name: "Id", type: "bigint"})
    id: string;

    @Column("double", {
        name: "Strike",
        nullable: false,
    })
    strike: number;

    @Column("date", {
        name: "Maturity",
        nullable: false,
    })
    maturity: Date;

    @Column("enum",{
        name: "Type",
        enum: OptionType,
        nullable: false,
    })
    type: OptionType;

    @ManyToOne(
        () => User,
        (user: User) => user.financialsDefs
    )
    user: User;

    @ManyToOne(
        () => Instrument,
        (instr: Instrument) => instr.FinancialsDefs
    )
    instrument: Instrument;

    @OneToMany(() => Trade, (trade) => trade.financialDef)
    trades: Trade[];
}

