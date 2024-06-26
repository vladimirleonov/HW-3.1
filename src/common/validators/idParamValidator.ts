import {ObjectId} from "mongodb";
import {param} from "express-validator";

const validateObjectId = async (objectId: string) => {
    if (!ObjectId.isValid(objectId)) {
        throw new Error('Invalid ObjectId')
    }
}

export const idParamValidator = param('id')
    .custom(validateObjectId).withMessage('Invalid ObjectId')