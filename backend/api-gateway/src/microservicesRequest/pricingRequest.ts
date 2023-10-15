import fetch from "node-fetch";
import { dateDifference } from "../common/dateDifference";
import { QueryOneResult } from "../controller/queryArrayResult";
import { FinancialDefinition } from "../model/financialDefinition";
import { MarketData } from "../model/marketData";
import dotenv from "dotenv";

dotenv.config();

export const getPrice =
    async (
        findef: FinancialDefinition,
        marketdata: MarketData,
        quantity: number): Promise<QueryOneResult<number>> => {
        const url = process.env.PRICING_SERVICE_URL + buildQueryString(findef, marketdata);
        try {
            const res = await fetch(url);

            if (!res.ok)
                return {
                    success: false,
                    messages: ["pricing error"]
                };

            const price = await res.json();

            return {
                success: true,
                entity: convert(price) * quantity
            }
        }
        catch (ex) {
            return {
                success: false,
                messages: ["pricing error"]
            };
        }
}


const buildQueryString =
    (findef: FinancialDefinition, marketData: MarketData): string => {
        const findDefDate = new Date(findef.maturity);
        const curDate = new Date();
        return `${findef.type}?spot=${marketData.spot}&strike=${findef.strike}&interestRate=${marketData.interestRate / 100}&volatility=${marketData.volatility / 100}&timeToMaturity=${dateDifference(curDate, findDefDate)}`;
}

const convert =
    (json: any) => {
        const { result } = json,
              { price } = result
        return parseFloat(price);
}