import React from "react";


export const PricerState = React.createContext({
    instr: [{}, (e: any) => { }] as const,
    strike: [{}, (e: any) => { }] as const,
    type: [{}, (e: any) => { }] as const,
    maturity: [{}, (e: any) => { }] as const,
    volatility: [{}, (e: any) => { }] as const,
    interestRate: [{}, (e: any) => { }] as const,
    spot: [{}, (e: any) => { }] as const,
    quantity: [{}, (e: any) => { }] as const,
    instrCurrency:  [{}, (e: any) => { }] as const,
    financialDefinitionId:  [{}, (e: any) => { }] as const,
    marketDataId:  [{}, (e: any) => { }] as const,
    price:  [{}, (e: any) => { }] as const,
    tradeId: [{}, (e: any) => { }] as const,
    isFinancialDefinitionFormModified: [{}, (e: any) => { }] as const,
    isMarketDataFormModified: [{}, (e: any) => { }] as const,
    isPriceCalculated: [{}, (e: any) => { }] as const
});

export const AuthState = React.createContext([{}, (e: boolean) => { }] as const);
