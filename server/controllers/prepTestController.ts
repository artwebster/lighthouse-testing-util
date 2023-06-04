import crypto from "crypto";
import axios from "axios";

export default async function prepTestController(req, res) {
  const uuid = crypto.randomUUID();
  const eventSourceAddress = `/lighthouse/runTest/${uuid}`;
  const testParams = req.body;

  try {
    axios.post(`http://localhost:5000${eventSourceAddress}`, testParams);
    res.status(200).json({ status: 200, data: eventSourceAddress, message: "Test prepped" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
