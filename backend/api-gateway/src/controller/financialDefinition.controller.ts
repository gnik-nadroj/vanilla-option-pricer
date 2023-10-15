import { FAILED_CREATE_FIN_DEF, MATURITY_ERROR } from "../common/commonValue";
import { checkMaturity } from "../common/validator/dateValidator";
import { FinancialDefinition, OptionType } from "../model/financialDefinition";
import { Instrument } from "../model/instrument";
import { User } from "../model/user";
import { QueryOneResult } from "./queryArrayResult";


export const createFinancialDefinition = async (
    user: User,
    instrument: Instrument,
    strike: number,
    maturity: Date,
    type: OptionType): Promise<QueryOneResult<FinancialDefinition>> => {

    if (!checkMaturity(maturity)) return MATURITY_ERROR;

    const financialDefinition = await FinancialDefinition.create({
        strike,
        maturity,
        type,
        user,
        instrument
    }).save();

    if (!financialDefinition) return FAILED_CREATE_FIN_DEF;

    return {
        entity: financialDefinition,
    };
}