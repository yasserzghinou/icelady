import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:hash -- "<new-password>"');
  process.exit(1);
}

const normalized = password.normalize('NFKC');
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(normalized, salt, 64).toString('hex');

console.log(`ADMIN_PASSWORD_SALT=${salt}`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
