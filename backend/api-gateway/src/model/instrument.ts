import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { FinancialDefinition } from "./financialDefinition";
//import {Length} from "class-validator"


@Entity({name: "instruments"})
export class Instrument extends BaseEntity{
    @PrimaryGeneratedColumn({name: "Id", type: "bigint"})
    id: string;

    @Column("varchar", {
        name: "Name",
        length: 30,
        unique: true, 
        nullable: false,
    })
    name: string;

    @Column("varchar", {
        name: "Owner",
        length: 30,
        unique: false,
        nullable: true,
    })
    owner: string;

    @Column("varchar", {
        name: "Currency",
        length: 30,
        unique: false,
        nullable: true,
    })
    currency: string;

    @OneToMany(() => FinancialDefinition, (financialDef) => financialDef.instrument)
    FinancialsDefs: FinancialDefinition[];
}
