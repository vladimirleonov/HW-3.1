import {Request, Response, NextFunction} from "express";
import {getIpAddress} from "../helpers/getIpAddress";
import {Result, ResultStatus} from "../types/result";
import {securityService} from "../../features/security/services/securityService";
import {HTTP_CODES} from "../../settings";

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip: string = getIpAddress(req)
    const originUrl: string = req.originalUrl
    console.log("originUrl", originUrl)

    try {
        const result: Result = await securityService.checkRateLimit({ip, originUrl})
        console.log("result", result)
        if (result.status === ResultStatus.TooManyRequests) {
            console.log("return 429")
            res.status(HTTP_CODES.TOO_MANY_REQUESTS).send()
            return
        }

        console.log("before next")
        next()
        return
    } catch (err) {
        console.error("Error in rateLimitMiddleware", err)
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
    }
}

// export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const ip: string = getIpAddress(req)
//     const originUrl: string = req.originalUrl
//
//     try {
//         const result: Result = await securityService.checkRateLimit({ ip, originUrl })
//         if (result.status === ResultStatus.TooManyRequests) {
//             res.status(HTTP_CODES.TOO_MANY_REQUESTS).send()
//             return;
//         }
//         next();
//     } catch (err) {
//         console.error("Error in rateLimitMiddleware", err);
//         res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send();
//     }
// };