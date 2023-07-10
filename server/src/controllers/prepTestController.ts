import crypto from "crypto";
import axios from "axios";
import { Request, Response } from "express";
import { TestParamsReqBody } from "../types/common";

export default async function prepTestController(req: Request<{}, {}, TestParamsReqBody>, res: Response) {
  const uuid = crypto.randomUUID();
  const eventSourceAddress = `/lighthouse/runTest/${uuid}`;
  const testParams = req.body;

  try {
    axios.post(`http://localhost:5000${eventSourceAddress}`, testParams);
    res.status(200).json({ status: 200, data: eventSourceAddress, message: "Test prepped" });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
}