import { Router, json as jsonBodyParser } from "express";

const CaseRouter = Router()

CaseRouter.use(jsonBodyParser())





export default CaseRouter 
