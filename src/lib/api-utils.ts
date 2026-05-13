export const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter(item => typeof item === "string");
  }
  if (typeof value === "string") {
    return value
      .split(/,|\n/)
      .map(item => item.trim())
      .filter(Boolean);
  }
  return [];
};

const SESSION_COOKIE = "admin_session";

export const adminSessionCookie = (token: string) => ({
  name: SESSION_COOKIE,
  value: token,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 6,
});

export const clearAdminSessionCookie = () => ({
  name: SESSION_COOKIE,
  value: "",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 0,
});