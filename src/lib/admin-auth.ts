'use server'

import { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET ?? "dev-admin-session-secret";

const encoder = new TextEncoder();

const toBase64Url = (buffer: ArrayBuffer) => {
  return Buffer.from(buffer).toString("base64url");
};

const fromBase64Url = (value: string) => {
  return Buffer.from(value, "base64url");
};

const createSignature = async (value: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value)
  );

  return toBase64Url(signature);
};

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
};

export const validateAdminCredentials = async (
  email: string,
  password: string
) => {
  return (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  );
};

export const createSessionToken = async (payload: { email: string }) => {
  const body = JSON.stringify({
    ...payload,
    issuedAt: Date.now(),
  });

  const encoded = Buffer.from(body).toString("base64url");

  const signature = await createSignature(encoded);

  return `${encoded}.${signature}`;
};

export const verifySessionToken = async (
  token: string | undefined
) => {
  if (!token) return null;

  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) return null;

  const expected = await createSignature(encoded);

  if (!timingSafeEqual(signature, expected)) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      fromBase64Url(encoded).toString("utf-8")
    ) as {
      email: string;
      issuedAt: number;
    };

    return decoded;
  } catch {
    return null;
  }
};

export const getAdminSession = async (req: NextRequest) => {
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  return await verifySessionToken(token);
};