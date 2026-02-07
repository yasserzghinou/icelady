'use client';

import { FormEvent, useState } from 'react';

type LeadFormErrors = {
  name?: string;
  phone?: string;
  slot?: string;
  zone?: string;
  contactPreference?: string;
};

interface CryoLeadCaptureCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  labels: {
    name: string;
    phone: string;
    slot: string;
    zone: string;
    contactPreference: string;
    zoneOptions: string[];
    contactPreferenceOptions: string[];
    submit: string;
    submitHint: string;
    privacyNote: string;
  };
  success: {
    title: string;
    message: string;
  };
}

export function CryoLeadCaptureCard({
  eyebrow,
  title,
  subtitle,
  labels,
  success
}: CryoLeadCaptureCardProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [slot, setSlot] = useState('');
  const [zone, setZone] = useState(labels.zoneOptions[0] || '');
  const [contactPreference, setContactPreference] = useState(
    labels.contactPreferenceOptions[0] || ''
  );
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const validate = (): LeadFormErrors => {
    const nextErrors: LeadFormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Veuillez renseigner votre nom.';
    }

    if (!/^\+?[0-9()\s-]{8,}$/.test(phone.trim())) {
      nextErrors.phone = 'Veuillez saisir un numero valide.';
    }

    if (slot.trim().length < 2) {
      nextErrors.slot = 'Indiquez un creneau prefere.';
    }

    if (zone.trim().length < 2) {
      nextErrors.zone = 'Selectionnez une zone.';
    }

    if (contactPreference.trim().length < 2) {
      nextErrors.contactPreference = 'Selectionnez un canal de contact.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    setErrors(nextErrors);
    setRequestError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const sourcePath = typeof window !== 'undefined' ? window.location.pathname : undefined;
      const locale = sourcePath?.split('/').filter(Boolean)[0];
      const response = await fetch('/api/forms/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          slot: slot.trim(),
          zone: zone.trim(),
          contactPreference: contactPreference.trim(),
          sourcePath,
          locale,
          website: ''
        })
      });

      if (!response.ok) {
        setRequestError("Impossible d'envoyer la demande. Veuillez reessayer.");
        return;
      }

      setSubmitted(true);
      setName('');
      setPhone('');
      setSlot('');
      setZone(labels.zoneOptions[0] || '');
      setContactPreference(labels.contactPreferenceOptions[0] || '');
    } catch {
      setRequestError('Une erreur est survenue. Veuillez reessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-stone/35 bg-white/80 p-6 shadow-soft md:p-7">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h3 className="mt-3 font-heading text-3xl">{title}</h3>
      <p className="mt-3 text-sm text-text/75">{subtitle}</p>

      {submitted ? (
        <div
          className="mt-6 rounded-2xl border border-accent/35 bg-accent/10 p-4 text-sm text-text/85"
          data-analytics-id="cryo-lead-success"
        >
          <p className="font-semibold">{success.title}</p>
          <p className="mt-1">{success.message}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="focus-ring mt-3 inline-flex rounded-full border border-text/20 bg-white/80 px-4 py-1.5 font-semibold text-text hover:border-accent hover:text-accent"
          >
            Nouvelle demande
          </button>
        </div>
      ) : (
        <form
          className="mt-6 space-y-3"
          onSubmit={handleSubmit}
          noValidate
          data-analytics-form="cryo-lead-capture"
        >
          <div>
            <label
              htmlFor="lead-name"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-text/70"
            >
              {labels.name}
            </label>
            <input
              id="lead-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="mt-1 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'lead-name-error' : undefined}
            />
            {errors.name ? (
              <p id="lead-name-error" className="mt-1 text-xs text-red-700">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-text/70"
            >
              {labels.phone}
            </label>
            <input
              id="lead-phone"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
              className="mt-1 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
            />
            {errors.phone ? (
              <p id="lead-phone-error" className="mt-1 text-xs text-red-700">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="lead-zone"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-text/70"
            >
              {labels.zone}
            </label>
            <select
              id="lead-zone"
              name="zone"
              value={zone}
              onChange={(event) => setZone(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
              aria-invalid={Boolean(errors.zone)}
              aria-describedby={errors.zone ? 'lead-zone-error' : undefined}
            >
              {labels.zoneOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.zone ? (
              <p id="lead-zone-error" className="mt-1 text-xs text-red-700">
                {errors.zone}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="lead-contact-preference"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-text/70"
            >
              {labels.contactPreference}
            </label>
            <select
              id="lead-contact-preference"
              name="contactPreference"
              value={contactPreference}
              onChange={(event) => setContactPreference(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
              aria-invalid={Boolean(errors.contactPreference)}
              aria-describedby={
                errors.contactPreference ? 'lead-contact-preference-error' : undefined
              }
            >
              {labels.contactPreferenceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.contactPreference ? (
              <p id="lead-contact-preference-error" className="mt-1 text-xs text-red-700">
                {errors.contactPreference}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="lead-slot"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-text/70"
            >
              {labels.slot}
            </label>
            <input
              id="lead-slot"
              name="slot"
              value={slot}
              onChange={(event) => setSlot(event.target.value)}
              placeholder="Ex: Mardi 15:00"
              className="mt-1 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
              aria-invalid={Boolean(errors.slot)}
              aria-describedby={errors.slot ? 'lead-slot-error' : undefined}
            />
            {errors.slot ? (
              <p id="lead-slot-error" className="mt-1 text-xs text-red-700">
                {errors.slot}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-accentDark"
            data-analytics-id="cryo-lead-submit"
          >
            {submitting ? 'Envoi...' : labels.submit}
          </button>

          <p className="text-xs text-text/60">{labels.submitHint}</p>
          <p className="text-xs text-text/55">{labels.privacyNote}</p>
          {requestError ? <p className="text-xs text-red-700">{requestError}</p> : null}
        </form>
      )}
    </div>
  );
}
