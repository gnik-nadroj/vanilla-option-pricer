import { QueryArrayResult, QueryOneResult } from "./queryArrayResult";
import { Instrument } from "../model/instrument";
import { INSTRUMENT_NOT_FOUND } from "../common/commonValue";

export const getInstrumentById = async (
    id: string
): Promise<QueryOneResult<Instrument>> => {
    const instrument = await Instrument.findOne({ id });
    if (!instrument) return INSTRUMENT_NOT_FOUND;

    return {
        entity: instrument
    };
};

export const getInstrumentByName = async (
    name: string
): Promise<QueryOneResult<Instrument>> => {
    const instrument = await Instrument.findOne({where:{name}});
    if (!instrument) return INSTRUMENT_NOT_FOUND;

    return {
        entity: instrument
    };
};

export const getInstruments = async (): Promise<QueryArrayResult<Instrument>> => {
    const instruments = await Instrument.find()
    if (!instruments) return {
            success: false,
            messages: ["No Instrument was found."]
        };
    
    return {
        entities: instruments
    };
};