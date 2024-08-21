import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../error.js';

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })
        await newUser.save()
        res.status(200).json('User has been created')
    } catch (error) {
        next(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) return next(createError(404, 'User not found'))

        const isPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isPassword) return next(createError(400, 'Password mismatch Please try again'))

        const { password, ...others } = user._doc
        const token = jwt.sign({ id: user._id }, process.env.KEY)
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (error) {
        next(error)
    }
}


export const signWithGoogle = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.KEY)
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(user._doc)
    } else {
        const newUser = new User({
            ...req.body,
            fromGoogle: true
        })
        const savedUser = await newUser.save()
        const token = jwt.sign({ id: savedUser._id }, process.env.KEY)
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(savedUser._doc)
    }
}


