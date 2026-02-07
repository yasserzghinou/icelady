import { scryptSync, timingSafeEqual } from 'node:crypto';

const DEFAULT_PASSWORD_SALT = '__REMOVED__';
const DEFAULT_PASSWORD_HASH =
  '__REMOVED__';

function readPasswordConfig() {
  const salt = process.env.ADMIN_PASSWORD_SALT || DEFAULT_PASSWORD_SALT;
  const hash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;

  return {
    salt,
    hash
  };
}

export function verifyAdminPassword(candidate: string): boolean {
  const normalized = candidate.normalize('NFKC');
  if (!normalized) {
    return false;
  }

  const { salt, hash } = readPasswordConfig();
  const expected = Buffer.from(hash, 'hex');

  const derived = scryptSync(normalized, salt, expected.length);
  if (derived.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(derived, expected);
}
