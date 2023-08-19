import { connect } from "@/dbConfig/dbConfig"
import User from '@/models/userModal'
import { NextApiRequest, NextApiResponse } from "next"
import bcryptjs from 'bcryptjs'
import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"


connect()


export async function POST( request : NextRequest ) {
try {

    const reqBody = await request.json()
    const { email, password } = reqBody
    console.log(reqBody)

    // check if user exist
    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({error : "User does not exist"}, {status : 400})
    }

    // check if password is correct

    const validPassword = await bcryptjs.compare
        (password, user.password)
    if (!validPassword) {
        return NextResponse.json({error : "invalid Password"}, {status : 400})
    }

    const tokenData = {
        id: user.id,
        username: user.username,
        email : user.email
    }

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

    const response = NextResponse.json({
        message: "Login Successful",
        success: true,
    })
    response.cookies.set("token", token, { httpOnly: true, path: "/" })
    return response

} catch (error : any) {
    return NextResponse.json({ error: error.message },
        { status: 500 })

}
}
