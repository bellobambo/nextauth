import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

// Function to generate a reset token
const generateResetToken = (userId: string) => {
    const tokenData = `${userId}_${Date.now()}`;
    return bcrypt.hashSync(tokenData, 10);
};

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log(email);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        console.log(user);

        const resetToken = generateResetToken(user._id.toString());

        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();

        const resetLink = `${process.env.DOMAIN}?token=${resetToken}`;

        // Send email to the user containing the reset link
        // const emailContent = `
        //     <p>Hi there,</p>
        //     <p>You've requested a password reset for your account. Click the link below to reset your password:</p>
        //     <p><a href="${resetLink}">${resetLink}</a></p>
        //     <p>If you didn't request this password reset, you can safely ignore this email.</p>
        //     <p>Best regards,</p>
        //     <p>Your Website Team</p>
        // `;

        await sendEmail({ email: user.email, emailType: "RESET", userId: user._id.toString() });


        return NextResponse.json({
            message: "Password Reset Successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        throw new Error(error.message);
        console.log("unable to connect", +error);
    }
}
