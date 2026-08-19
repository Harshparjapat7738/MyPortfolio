"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { Check, Copy, ExternalLink, Mail, MapPin, Phone, Send } from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactContent } from "@/lib/content";
import styles from "./Contact.module.css";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [copied, setCopied] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // No backend exists for this static site — submitting hands the message
  // off to the visitor's own email client via a mailto: link instead of
  // pretending to send it anywhere. See the note under the form.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(form.subject || `Portfolio contact from ${form.name || "your website"}`);
    const bodyLines = [form.message, "", `— ${form.name}`, form.email].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${contactContent.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (unsupported browser, permissions) — the
      // email is still visible and selectable as plain text, so no fallback
      // needed beyond leaving the button inert.
    }
  };

  return (
    <RevealSection id="contact" background="primary" className={styles.contact}>
      <div className={styles.inner}>
        <SectionHeading title={contactContent.heading} subtitle={contactContent.subtitle} />

        <div className={styles.grid}>
          <div className={styles.info}>
            <h3 className={styles.introHeading}>Let&apos;s Connect</h3>
            <p className={styles.introText}>{contactContent.intro}</p>

            <a href={`mailto:${contactContent.email}`} className={`btn btn-primary ${styles.emailCta}`}>
              <Mail size={18} aria-hidden="true" />
              Email Me
            </a>

            <div className={styles.rows}>
              <div className={styles.row}>
                <div className={styles.rowIcon} aria-hidden="true">
                  <Mail size={20} />
                </div>
                <div className={styles.rowContent}>
                  <div className={styles.rowLabel}>Email</div>
                  <div className={styles.rowValue}>
                    <a href={`mailto:${contactContent.email}`} className="link-underline">
                      {contactContent.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={styles.copyBtn}
                      aria-label={copied ? "Email address copied" : "Copy email address"}
                    >
                      {copied ? (
                        <Check size={15} key="check" className={styles.copyIconPop} />
                      ) : (
                        <Copy size={15} key="copy" className={styles.copyIconPop} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.rowIcon} aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div className={styles.rowContent}>
                  <div className={styles.rowLabel}>Phone</div>
                  <div className={styles.rowValue}>
                    <a href={`tel:+91${contactContent.phone}`} className="link-underline">
                      {contactContent.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.rowIcon} aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div className={styles.rowContent}>
                  <div className={styles.rowLabel}>Location</div>
                  <div className={styles.rowValue}>{contactContent.location}</div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.rowIcon} aria-hidden="true">
                  <ExternalLink size={20} />
                </div>
                <div className={styles.rowContent}>
                  <div className={styles.rowLabel}>LinkedIn</div>
                  <div className={styles.rowValue}>
                    <a
                      href={contactContent.linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {contactContent.linkedin.label}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className={`card ${styles.formCard}`} onSubmit={handleSubmit}>
            <div className={styles.formRow2}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Subject"
                className={styles.input}
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Your message"
                className={styles.textarea}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              <Send size={16} aria-hidden="true" />
              Send Message
            </button>
            <p className={styles.formNote}>
              This opens your email app with the message pre-filled — there&apos;s no server behind this form, so
              nothing is sent from this page.
            </p>
          </form>
        </div>
      </div>
    </RevealSection>
  );
}
