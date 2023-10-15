import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation login($email : String!, $password: String!) {
        login(email : $email password: $password) {
            success
            messages
        }
    }
`;

export const REGISTER = gql`
    mutation register($email : String!, $password: String!, $firstname: String!, $lastname: String!) {
        register(email: $email password: $password lastname: $lastname firstname: $firstname) {
            success
            messages
        }
    }
`;

export const CREATE_FINANCIAL_DEFINITION = gql`
    mutation createFinancialDefinition($strike: Float!, $maturity: String!, $type: String!, $instrumentName: String!){
        createFinancialDefinition(strike:$strike, maturity:$maturity, type:$type, instrumentName:$instrumentName){
            ... on EntityResult{success messages}
            ... on FinancialDefinition{id}
        }
  }
`;

export const CREATE_MARKET_DATA= gql`
    mutation createMarketData($volatility: Float!, $spot: Float!, $interestRate: Float!){
        createMarketData(volatility: $volatility, spot: $spot, interestRate: $interestRate){
            ... on EntityResult{success messages}
            ... on MarketData{id}
        }
  }
`;

export const BOOK_TRADE = gql`
    mutation bookTrade($finDefId : ID!, $marketDataId: ID!, $quantity: Int!, $price: Float!){
        bookTrade(finDefId: $finDefId, marketDataId: $marketDataId, quantity: $quantity, price: $price){
            success messages
        }
    }
`;
