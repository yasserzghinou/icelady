import { NextRequest, NextResponse } from 'next/server';

import { assertAdminSession } from '@/lib/admin/guard';
import {
  buildRelativeRedirectPath,
  getSafeReturnTo,
  hasTrustedOrigin,
  toRequestUrl
} from '@/lib/admin/http';
import { revalidateServiceContent } from '@/lib/admin/revalidate';
import { updateServiceData } from '@/lib/admin/store';

function redirectToRelative(request: NextRequest, target: string): NextResponse {
  const response = NextResponse.redirect(toRequestUrl(request, target));
  response.headers.set('Location', target);
  return response;
}

function redirectWithStatus(request: NextRequest, returnTo: string, status: string, slug?: string) {
  const target = buildRelativeRedirectPath(returnTo, {
    status,
    slug
  });

  return redirectToRelative(request, target);
}

export async function POST(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const unauthorized = await assertAdminSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  if (!hasTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  const formData = await request.formData();
  const returnTo = getSafeReturnTo(formData.get('returnTo'));
  const slug = context.params.slug;

  const galleryImages = String(formData.get('galleryImages') || '')
    .split('\n')
    .map((image) => image.trim())
    .filter(Boolean);

  const updated = updateServiceData(slug, {
    name: String(formData.get('name') || ''),
    category: String(formData.get('category') || ''),
    tagline: String(formData.get('tagline') || ''),
    summary: String(formData.get('summary') || ''),
    duration: String(formData.get('duration') || ''),
    priceNote: String(formData.get('priceNote') || ''),
    heroImage: String(formData.get('heroImage') || ''),
    galleryImages,
    featured: formData.get('featured') === 'on',
    seoTitle: String(formData.get('seoTitle') || ''),
    seoDescription: String(formData.get('seoDescription') || ''),
    fr: {
      name: String(formData.get('frName') || ''),
      category: String(formData.get('frCategory') || ''),
      tagline: String(formData.get('frTagline') || ''),
      summary: String(formData.get('frSummary') || ''),
      seoTitle: String(formData.get('frSeoTitle') || ''),
      seoDescription: String(formData.get('frSeoDescription') || '')
    },
    ar: {
      name: String(formData.get('arName') || ''),
      category: String(formData.get('arCategory') || ''),
      tagline: String(formData.get('arTagline') || ''),
      summary: String(formData.get('arSummary') || ''),
      seoTitle: String(formData.get('arSeoTitle') || ''),
      seoDescription: String(formData.get('arSeoDescription') || '')
    }
  });

  if (!updated) {
    return redirectWithStatus(request, returnTo, 'service-not-found', slug);
  }
  revalidateServiceContent(slug);

  return redirectWithStatus(request, returnTo, 'service-saved', slug);
}
