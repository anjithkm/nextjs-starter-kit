import { NextApiRequest, NextApiResponse } from "next";


export const postLoginContoller = async(
	req: NextApiRequest,
	res: NextApiResponse,
) =>{

    const { email ,password } = req.body;

    const token= 'ftyguhioiyktcfcgvbnj32167089-0=vkylhuij;ef'

    return res.status(200).json({ token: `${token}`, email: email , password : password });

}