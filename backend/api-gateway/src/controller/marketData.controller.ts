import { MarketData } from "../model/marketData";
import { User } from "../model/user";
import { QueryOneResult } from "./queryArrayResult";


export const createMarketData = async (
    volatility: number,
    spot: number,
    interestRate: number,
    user: User
): Promise<QueryOneResult<MarketData>> => {

    const marketData = await MarketData.create({
        volatility,
        spot,
        interestRate,
        user
    }).save();

    if (!marketData)
        return {
            success: false,
            messages: ["Failed to create Financial Definition."],
        };

    return {
        entity: marketData
    };
}