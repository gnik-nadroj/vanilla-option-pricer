export interface EntityResult {
    success?: boolean,
    messages: Array<string>;
}

export const STANDARD_ERROR = "An error has occurred";

export const STANDARD_ERRORR = {
    success: false,
    messages: ["An error has occurred"]
};

export const USER_NOT_FOUND = {
    success: false,
    messages: ["User not found"]
};

export const INSTRUMENT_NOT_FOUND = {
    success: false,
    messages: ["Instrument not found"]
};

export const MARKET_DATA_NOT_FOUND = {
    success: false,
    messages: ["Market Data not found"]
};

export const FIN_DEF_NOT_FOUND = {
    success: false,
    messages: ["Financial Definition not found"]
};

export const USER_NOT_LOGIN = {
    success: false,
    messages: ["User not login"]
};

export const INVALID_QUANTTY = {
    success: false,
    messages: ["Invalid Quantity"]
};

export const TYPE_NOT_FOUND = {
    success: false,
    messages: ["User not found"]
};

export const REGISTRATION_SUCCESSFUL = {
    success: true,
    messages: ["Regsitration Successful"]
};

export const MATURITY_ERROR = {
    success: false,
    messages: ["Maturity must be greater or equal than the current date"]
}

export const FAILED_CREATE_FIN_DEF = {
    success: false,
    messages: ["Failed to create Financial Definition."],
};

export const USER_NOT_CONFIRMED = {
    success: false,
    messages: ["User has not confirmed their registration email yet."]
};


