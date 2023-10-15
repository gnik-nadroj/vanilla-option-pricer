import { GqlContext } from "../gql/GqlContext"
import { EntityResult, STANDARD_ERROR, USER_NOT_FOUND, USER_NOT_LOGIN } from "../common/commonValue";
import { User } from "../model/user";
import { createMarketData } from "../controller/marketData.controller";
import { MarketData } from "../model/marketData";

export const createMarketDataMutation = async (
    obj: any,
    args: {volatility: number, spot: number, interestRate: number},
    ctx: GqlContext,
    info: any
): Promise<EntityResult | MarketData> => {
    try {
        if (!ctx.req.session || !ctx.req.session!.userId) return USER_NOT_LOGIN;

        const user = await User.findOne(ctx.req.session.userId);

        if (!user) return USER_NOT_FOUND;

        let result = await createMarketData(
            args.volatility,
            args.spot,
            args.interestRate,
            user
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