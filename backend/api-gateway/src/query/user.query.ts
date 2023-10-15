import { GqlContext } from "../gql/GqlContext";
import { User } from "../model/user";
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";
import { me, UserResult } from "../controller/user.controller";


export const meQuery = async (
    _obj: any,
    _args: null,
    ctx: GqlContext,
    _info: any
): Promise<User | EntityResult> => {
    let user: UserResult;
    try {
        if (!ctx.req.session?.userId) {
            return {
                success: false,
                messages: ["User not logged in."]
            };
        }

        user = await me(ctx.req.session.userId);

        if (user && user.user) return user.user;

        return {
            success: false,
            messages: user.messages ? user.messages : [STANDARD_ERROR]
        };
    } catch (ex) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}