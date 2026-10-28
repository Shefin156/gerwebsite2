import { useState, type FormEvent } from 'react'
import { CONTACT } from '../../content/ger'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Status = 'idle' | 'error' | 'sent'

/**
 * Contact details + enquiry form. The form opens the visitor's email app with the message
 * pre-filled (no server needed). Swap `handleSubmit` for an API call when you have one.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setStatus('error')
      form.reportValidity()
      return
    }
    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? '').trim()
    const subject = `Enquiry from ${get('name')}${get('company') ? ` (${get('company')})` : ''}`
    const body = [get('message'), '', `${get('name')}`, get('company'), get('email'), get('phone')].filter(Boolean).join('\n')
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const details = [
    { icon: 'user', label: 'Contact person', value: CONTACT.person },
    { icon: 'pin', label: 'Address', value: CONTACT.address },
    ...CONTACT.phones.map((p) => ({ icon: 'phone', label: p.label, value: p.value, href: p.href })),
    { icon: 'mail', label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: 'globe', label: 'Website', value: CONTACT.website, href: `https://${CONTACT.website}` },
  ]

  return (
    <section id="contact" className="section bg-canvas-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="Contact" title="Let’s talk about your plant." lead="Tell us about your feedstock, site and goals, and we’ll get back to you." />
          <Reveal as="ul" className="mt-10 space-y-5">
            {details.map((d) => (
              <li key={d.label + d.value} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                  <Icon name={d.icon} className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-muted">{d.label}</p>
                  {'href' in d && d.href ? (
                    <a href={d.href} className="link mt-0.5 inline-block text-[15px] text-ink" {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-[15px] leading-relaxed text-ink">{d.value}</p>
                  )}
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal>
          <form noValidate onSubmit={handleSubmit} className="card p-6 md:p-9" aria-describedby="form-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Company" name="company" autoComplete="organization" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <label className="mt-5 block">
              <span className="text-[13px] font-medium text-ink">
                Message <span className="text-primary">*</span>
              </span>
              <textarea name="message" required rows={5} className="field mt-2 resize-y" placeholder="E.g. POME biogas plant for a 60 t/h palm oil mill" />
            </label>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-status" className="text-[13px] text-muted" role="status">
                {status === 'error' && <span className="text-[#B4442F]">Please fill in the required fields.</span>}
                {status === 'sent' && <span className="text-primary">Your email app should now open with the message ready to send.</span>}
                {status === 'idle' && 'Fields marked * are required.'}
              </p>
              <button type="submit" className="btn-primary justify-center">
                Send enquiry <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}

function Field({ label, name, type = 'text', required = false, autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} className="field mt-2" />
    </label>
  )
}
