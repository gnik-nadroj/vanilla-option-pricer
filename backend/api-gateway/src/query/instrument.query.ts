import { getInstrumentById, getInstrumentByName, getInstruments } from "../controller/instrument.controller";
import { QueryArrayResult, QueryOneResult } from "../controller/queryArrayResult";
import { GqlContext } from "../gql/GqlContext";
import { Instrument } from "../model/instrument";
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";

export const queryGetInstrumentById = async (
    _obj: any,
    args: { id: string },
    _ctx: GqlContext,
    _info: any
): Promise<Instrument | EntityResult> => {
    let result: QueryOneResult<Instrument>;
    try {
        result = await getInstrumentById(args.id);

        if (result.entity) return result.entity;

        return { success: result.success, messages: result.messages ? result.messages : [STANDARD_ERROR] };
    } catch (ex: any) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}

export const queryGetInstrumentByName = async (
    _obj: any,
    args: { name: string },
    _ctx: GqlContext,
    _info: any
): Promise<Instrument | EntityResult> => {
    let result: QueryOneResult<Instrument>;
    try {
        result = await getInstrumentByName(args.name);

        if (result.entity) return result.entity;
        
        return {
            success: false,
            messages: result.messages ? result.messages : [STANDARD_ERROR]
        };
    } catch (ex: any) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}

export const queryGetInstruments = async (): Promise<{instruments: Array<Instrument>} | EntityResult> => {
    let instruments: QueryArrayResult<Instrument>;
    try {
        instruments = await getInstruments();

        if (instruments.entities) return {instruments: instruments.entities};
        
        return {
            success: false,
            messages: instruments.messages ? instruments.messages : [STANDARD_ERROR]
        };
    } catch (ex: any) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}
