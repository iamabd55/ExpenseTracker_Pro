import jwt from "jsonwebtoken"

export const jwtManager=(user) => {
  const accessToken = jwt.sign(
      {
        _id: user._id,
        name: user.full_name,
      },
      process.env.jwt_salt
    );
    return accessToken
}