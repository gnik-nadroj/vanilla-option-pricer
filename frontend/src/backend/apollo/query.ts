import { gql } from "@apollo/client";


export const GET_INSTRUMENTS = gql`
        {
            getInstruments{
                 ...on EntityResult{ success messages }
                ...on InstrumentArray{ instruments { id name owner }}
            }
        }`;


export const GET_INSTRUMENT_BY_NAME = gql`
        query getInstrumentByName($name : String!) {
            getInstrumentByName(name:$name){
                 ... on EntityResult {success messages}
                 ... on Instrument {id name owner currency}
            }
         }`;

export const GET_TRADE_PRICE = gql`
    query getTradePrice($finDefId : ID!, $marketDataId: ID!, $quantity: Int!) {
            getTradePrice(finDefId: $finDefId, marketDataId: $marketDataId, quantity: $quantity){
            success messages
        }
    }`; 


export const GET_TRADES = gql`
{
    me{
        ... on EntityResult{success messages}
        ... on User{
          trades{
            id
            quantity
            price
            date
            financialDef{strike maturity type instrument {name}}
            marketData{volatility interestRate spot}
          }
        }
      }
}`;