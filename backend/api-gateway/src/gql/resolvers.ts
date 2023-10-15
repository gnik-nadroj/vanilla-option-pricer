import { IResolvers } from "apollo-server-express";
import { getPriceQuery } from "../query/pricing.query";
import { createfinDefMutation } from "../mutation/financialDefinition.mutation";
import { createMarketDataMutation } from "../mutation/marketData.mutation";
import { changePasswordMutation, editMutation, loginMutation, logoutMutation, registerMutation } from "../mutation/user.mutation";
import { queryGetInstrumentById, queryGetInstrumentByName, queryGetInstruments } from "../query/instrument.query";
import { meQuery } from "../query/user.query";
import { GqlContext } from "./GqlContext";
import { bookTradeMutation } from "../mutation/trade.mutation";


const resolvers: IResolvers = {
    InstrumentResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "Instrument";
        }
    },
    InstrumentArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "InstrumentArray";
        }
    },
    UserResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "User";
        }
    },
    FinancialDefinitionResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "FinancialDefinition";
        }
    },
    FinancialDefinitionArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "FinancialDefinitionArray";
        }
    },
    MarketDataResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "MarketData";
        }
    },
    MarketDataArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "MarketDataArray";
        }
    },
    TradeResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "TradeResult";
        }
    },
    TradeArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "TradeArrayResult";
        }
    },
    PriceResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "PriceResult";
        }
    },
    Query: {
        getInstrumentById: queryGetInstrumentById,
        getInstrumentByName:queryGetInstrumentByName,
        getInstruments: queryGetInstruments,
        me: meQuery,
        getTradePrice: getPriceQuery
    },
    Mutation: {
        register: registerMutation,
        login: loginMutation,
        logout: logoutMutation,
        changePassword: changePasswordMutation,
        edit: editMutation,
        createFinancialDefinition: createfinDefMutation,
        createMarketData: createMarketDataMutation,
        bookTrade: bookTradeMutation
    }
}

export default resolvers;