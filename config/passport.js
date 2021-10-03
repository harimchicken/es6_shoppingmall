import { Strategy, ExtractJwt } from "passport-jwt";
import userModel from '../models/userModel.js';



const protect = passport => {

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = process.env.JWT_SECRET

    passport.use(
        new Strategy(opts, (jwt_payload, done) => {

            userModel
            .findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
            // const user = userModel.findById(jwt_payload._id)
            // console.log("+++++++++++++", user)
            // if (user) {
            //     return done(null, user)
            // }
            // return done(null, false)
        })
    )
}

export { protect }