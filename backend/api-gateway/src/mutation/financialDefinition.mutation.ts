import { GqlContext } from "../gql/GqlContext";
import {
    EntityResult, INSTRUMENT_NOT_FOUND, STANDARD_ERROR, USER_NOT_FOUND, USER_NOT_LOGIN,TYPE_NOT_FOUND
} from "../common/commonValue";
import { createFinancialDefinition } from "../controller/financialDefinition.controller";
import { User } from "../model/user";
import { getInstrumentByName } from "../controller/instrument.controller";
import { FinancialDefinition, OptionType } from "../model/financialDefinition";

export const createfinDefMutation = async (
    obj: any,
    args: { instrumentName: string, strike: number, maturity: string, type: string },
    ctx: GqlContext,
    info: any
): Promise<EntityResult | FinancialDefinition> => {
    try {
        if (!ctx.req.session || !ctx.req.session!.userId) return USER_NOT_LOGIN;

        const user = await User.findOne(ctx.req.session.userId);

        if (!user) USER_NOT_FOUND;

        const instrument = await (await getInstrumentByName(args.instrumentName)).entity;

        if (!instrument) return INSTRUMENT_NOT_FOUND 

        let opt: OptionType = OptionType.CALL;
        if (args.type == OptionType.CALL)
            opt = OptionType.CALL
        else if (args.type == OptionType.PUT)
            opt = OptionType.PUT
        else
            return TYPE_NOT_FOUND;
        let result = await createFinancialDefinition(
            user,
            instrument,
            args.strike,
            new Date(args.maturity),
            opt
        );

        if (result.entity)
            return result.entity;

        return {
            success: false,
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}