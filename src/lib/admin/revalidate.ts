import { revalidatePath } from 'next/cache';

const locales = ['fr', 'en', 'ar'] as const;

export function revalidateBusinessContent(): void {
  revalidatePath('/');
  revalidatePath('/contact');

  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/pages/contact`);
    revalidatePath(`/${locale}/pages/cryotherapie`);
  }
}

export function revalidateServiceContent(slug: string): void {
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/collections/all`);
    revalidatePath(`/${locale}/products/${slug}`);
  }

  revalidatePath(`/en/products/${slug}`);
}
