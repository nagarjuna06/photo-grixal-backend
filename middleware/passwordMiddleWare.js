import bcrypt from "bcrypt";

export const passwordEncryption = async (password) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};
