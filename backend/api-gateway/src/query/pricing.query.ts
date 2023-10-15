import { EntityResult, FIN_DEF_NOT_FOUND, INVALID_QUANTTY, MARKET_DATA_NOT_FOUND, STANDARD_ERROR, USER_NOT_FOUND, USER_NOT_LOGIN } from "../common/commonValue";
import { GqlContext } from "../gql/GqlContext";
import { getPrice } from "../microservicesRequest/pricingRequest";
import { FinancialDefinition } from "../model/financialDefinition";
import { MarketData } from "../model/marketData";
import { User } from "../model/user";



export const getPriceQuery = async (
    obj: any,
    args: {
        finDefId: number,
        marketDataId: number,
        quantity: number,
    },
    ctx: GqlContext,
    info: any
): Promise<EntityResult> => {
    try {
        if (args.quantity <= 0) return INVALID_QUANTTY;

        if (!ctx.req.session?.userId) return USER_NOT_LOGIN

        const user = await User.findOne(ctx.req.session.userId);

        if (!user) return USER_NOT_FOUND;
            
        const findef = await FinancialDefinition.findOne(args.finDefId);

        if (!findef) return FIN_DEF_NOT_FOUND;

        const marketData = await MarketData.findOne(args.marketDataId);

        if (!marketData) return MARKET_DATA_NOT_FOUND;

        const result = await getPrice(findef, marketData, args.quantity);

        if (result.entity) {
            return {
                success: result.success,
                messages: [`${result.entity}`]
            }
        }

        return {
            success: result.success,
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}