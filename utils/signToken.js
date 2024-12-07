import jwt from "jsonwebtoken";

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h"
  });
};

export default signToken;