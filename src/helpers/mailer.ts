import nodemailer from 'nodemailer'
import User from '@/models/userModal'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 360000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 360000 })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3176da04bda8b4",
                pass: "8824e49119562a",
                // add credentials ton env files
            }
        });

        const resetUrl = `${process.env.DOMAIN}/reset?token=${hashedToken}`;

        const mailOptions = {
            from: "bellobambo21@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            html: `<p>
             Click <a href="${emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}` : resetUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br>
        ${emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}` : resetUrl}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse
    } catch (error: any) {
        throw new Error(error.message)
        console.log(error)
    }
}