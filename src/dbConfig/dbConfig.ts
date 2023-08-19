import mongoose, { connection } from 'mongoose'

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB connected Successfully")
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err)
        })
    } catch (error) {
        console.log("Something went Wrong")
        console.log(error)
    }
}