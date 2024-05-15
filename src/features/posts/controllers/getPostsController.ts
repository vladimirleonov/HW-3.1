import {Request, Response} from "express"
import {HTTP_CODES} from "../../../settings"
import {OutputPostPaginationType, OutputPostType} from "../../../input-output-types/post-types"
import {postMongoRepository} from "../repository/postMongoRepository"
import {postMongoQueryRepository} from "../repository/postMongoQueryRepository";
import {QueryParamsType} from "../../../input-output-types/common-types";
import {SanitizedQueryParamsType, sanitizeQueryParams} from "../../../helpers/query-helpers";

export const getPostsController = async (req: Request<{}, OutputPostPaginationType, QueryParamsType>, res: Response<OutputPostPaginationType>) => {
    try {
        const sanitizedQuery: SanitizedQueryParamsType = sanitizeQueryParams(req.query)
        const posts: OutputPostPaginationType = await postMongoQueryRepository.findAll(sanitizedQuery)
        res.status(HTTP_CODES.OK).send(posts)
    } catch (err) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
    }
}