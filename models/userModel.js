import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import normalize from 'normalize-url';

const { Schema, model } = mongoose

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true // 소문자로 인식할 수 있게 해주는 메소드
        },
        password: {
            type: String,
            required: true
        },
        profileImg: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },

    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const avatar = await normalize(
        gravatar.url(this.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        }),
        { forceHttps: true }
    );

    this.profileImg = avatar;

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



const user = model('user', userSchema);

export default user;