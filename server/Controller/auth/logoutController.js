export const logout = async (_req, res) => {
  try {
    res.status(200).json({
      message: "Logout successful. Remove the token on the client side.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
