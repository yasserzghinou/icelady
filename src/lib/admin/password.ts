import { scryptSync, timingSafeEqual } from 'node:crypto';

function readPasswordConfig() {
  const salt = process.env.ADMIN_PASSWORD_SALT?.trim();
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!salt || !hash || hash.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hash)) {
    return null;
  }

  return {
    salt,
    hash: hash.toLowerCase()
  };
}

export function verifyAdminPassword(candidate: string): boolean {
  const normalized = candidate.normalize('NFKC');
  if (!normalized) {
    return false;
  }

  const config = readPasswordConfig();
  if (!config) {
    return false;
  }

  const { salt, hash } = config;
  const expected = Buffer.from(hash, 'hex');
  if (!expected.length) {
    return false;
  }

  const derived = scryptSync(normalized, salt, expected.length);
  if (derived.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(derived, expected);
}
