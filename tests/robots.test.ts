import { describe, expect, it } from 'vitest';

import robots from '../src/app/robots';

describe('robots metadata route', () => {
  it('allows crawl in production context while protecting admin paths', () => {
    process.env.CONTEXT = 'production';

    const rules = robots().rules;
    const primaryRule = Array.isArray(rules) ? rules[0] : rules;

    expect(primaryRule?.userAgent).toBe('*');
    expect(primaryRule?.allow).toBe('/');
    expect(primaryRule?.disallow).toEqual(['/admin', '/api/admin']);
  });

  it('blocks crawl in non-production deploy contexts', () => {
    process.env.CONTEXT = 'deploy-preview';

    const rules = robots().rules;
    const primaryRule = Array.isArray(rules) ? rules[0] : rules;

    expect(primaryRule?.disallow).toBe('/');
  });
});
