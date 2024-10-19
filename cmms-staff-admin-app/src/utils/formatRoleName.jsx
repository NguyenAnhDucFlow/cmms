export const formatRoleName = (role) => {
  return role
    .toLowerCase()
    .siplit("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slide(1))
    .join(" ");
};
