interface SeoJsonLdProps {
  schema: Record<string, unknown>;
}

export function SeoJsonLd({ schema }: SeoJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
