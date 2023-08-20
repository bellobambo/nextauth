import { connect } from "@/dbConfig/dbConfig"
import User from '@/models/userModal'
import { NextApiRequest, NextApiResponse } from "next"
import bcryptjs from 'bcryptjs'
import { NextResponse, NextRequest } from "next/server"
import { sendEmail } from "@/helpers/mailer"


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody)

        // if user exist
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User Already Exist" }, { status: 400 })
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        await sendEmail({
            email, emailType: "VERIFY",
        userId : savedUser._id
        })


        return NextResponse.json({
            message: "User Created Successfully",
            success : true,
            savedUser


        }, { status: 201 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}
