import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../utils/axios";

export default async function searchStudentByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { student } = req.query;
  const { data } = await api.get(`/search?query=${student}`);
  res.status(200).json(data);
}
