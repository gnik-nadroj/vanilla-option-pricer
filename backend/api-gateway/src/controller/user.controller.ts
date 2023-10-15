import { User } from "../model/user";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../common/validator/passwordValidator";
import { isEmailValid } from "../common/validator/emailValidator";
import { EntityResult, USER_NOT_CONFIRMED, USER_NOT_FOUND } from "../common/commonValue";

const saltRounds = Number(process.env.SALT_ROUND);

export class UserResult {
    constructor(public messages?: Array<string>, public user?: User, public success?: boolean) {}
}

/**
 * 
 * @param email
 * @param firstname
 * @param lastname
 * @param password
 */
export const register = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string
): Promise<UserResult> => {

   /* we start by checking the password */
   const result = isPasswordValid(password);

    if (!result.isValid) 
      return {
          success: false,
          messages: [
            "Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol",
          ]
      }

    /* checking email */
    const trimmedEmail = email.trim().toLowerCase();
    const emailErrorMsg = isEmailValid(trimmedEmail);

    if (emailErrorMsg) 
        return {
            success: false,
            messages: [emailErrorMsg],
        };
    
    /* hash the password */
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity = await User.create({
        email: trimmedEmail,
        firstname,
        lastname,
        password: hashedPassword
    }).save();

    userEntity.password = ""; // blank out for security (we don't return password to client)

    return {
        user: userEntity,
    };
};

export const login = async (
  email: string,
  password: string
): Promise<UserResult> => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user)
      return {
          success: false,
          messages: [userNotFound(email)],
      };

    if (!user.confirmed) return USER_NOT_CONFIRMED;
 
  const passwordMatch = await bcrypt.compare(password, user?.password);
  if (!passwordMatch) {
      return {
          success: false,
          messages: ["Password is invalid."],
    };
  }

  return {
    user: user,
  };
};

export const logout = async (email: string): Promise<EntityResult> => {
  const user = await User.findOne({
    where: { email },
  });

    if (!user) 
        return {
            success: false,
            messages: [userNotFound(email)]
        };

    return {
        success: true,
        messages: ["User logged off."]
    };
};

export const changePassword = async (id: string, newPassword: string): Promise<EntityResult>=> {
    const result = isPasswordValid(newPassword);
    if (!result.isValid) {
        return {
            success: false,
            messages: ["Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol"]
        }
    }

    const user = await User.findOne({
        where: { id },
    });

    if (!user) return USER_NOT_FOUND

    if (!user.confirmed) {
        return USER_NOT_CONFIRMED
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();

    return {
        success: true,
        messages: ["Password changed succesfully"]
    };
    
}

export const edit = async (id: string, newFirstname: string, newLastname: string): Promise<EntityResult> => {
    const user = await User.findOne({
        where: { id },
    });

    if (!user) return USER_NOT_FOUND

    if (!user.confirmed) USER_NOT_CONFIRMED

    if (newFirstname != "" && user?.firstname != newFirstname)
        user.firstname = newFirstname;

    if (newLastname != "" && user.lastname != newLastname)
        user.lastname = newLastname;

    user.save();
    return {
        success: true,
        messages: ["User edited successfully"]
    };
}

export const me = async (id: string): Promise<UserResult> => {

    const user = await User.findOne({
        where: { id },
        relations: [
            'trades',
            "trades.user",
            'trades.financialDef',
            'trades.financialDef.instrument',
            'trades.marketData'
        ],
    });

    if (!user) return USER_NOT_FOUND;

    if (!user.confirmed) return USER_NOT_CONFIRMED;

    user.password = "";
    return {
        user: user,
    };
};

function userNotFound(email: string) {
  return `User with email ${email} not found.`;
}
