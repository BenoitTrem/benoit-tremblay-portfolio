"use client";
import styles from "./contact.module.css";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";

type FormFields = { email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const locale = useLocale();
  const t = getT(locale);
  const c = t.contact;

  function validate(form: FormFields): FormErrors {
    const errors: FormErrors = {};
    if (!form.email.trim()) {
      errors.email = c.validation.emailRequired;
    } else if (!EMAIL_RE.test(form.email.trim())) {
      errors.email = c.validation.emailInvalid;
    }
    if (!form.subject.trim()) {
      errors.subject = c.validation.subjectRequired;
    }
    if (!form.message.trim()) {
      errors.message = c.validation.messageRequired;
    } else if (form.message.trim().length < 5) {
      errors.message = c.validation.messageTooShort;
    }
    return errors;
  }

  const [form, setForm] = useState<FormFields>({
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormFields, boolean>>
  >({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (status === "sent") return;
    if (touched[name as keyof FormFields]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name as keyof FormFields],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (status === "sent") return;
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name as keyof FormFields],
    }));
  };

  const handleReset = () => {
    setStatus("idle");
    setForm({ email: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, subject: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ email: "", subject: "", message: "" });
        setErrors({});
        setTouched({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (name: keyof FormFields) => ({
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: `${styles.input} ${errors[name] ? styles.inputError : ""}`,
  });

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>{c.pageTitle}</h1>
          <p className={styles.subtitle}>{c.pageSubtitle}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoCol}>
            <p className={styles.sectionHeading}>{c.direct}</p>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <Mail size={16} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{c.email}</p>
                  <a
                    href="mailto:bentrem2003@gmail.com"
                    className={styles.infoValue}
                  >
                    bentrem2003@gmail.com
                  </a>
                </div>
              </div>
              <div className={styles.infoDivider} />
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <MapPin size={16} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{c.location}</p>
                  <p className={styles.infoValue}>{c.locationValue}</p>
                </div>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.formCard}
            noValidate
          >
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                {c.form.email}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder={c.form.emailPlaceholder}
                {...field("email")}
                disabled={status === "sent"}
              />
              {errors.email && (
                <p className={styles.fieldError}>{errors.email}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="subject">
                {c.form.subject}
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder={c.form.subjectPlaceholder}
                {...field("subject")}
                disabled={status === "sent"}
              />
              {errors.subject && (
                <p className={styles.fieldError}>{errors.subject}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="message">
                {c.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={7}
                placeholder={c.form.messagePlaceholder}
                {...field("message")}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                disabled={status === "sent"}
              />
              {errors.message && (
                <p className={styles.fieldError}>{errors.message}</p>
              )}
            </div>

            <div className={styles.formFooter}>
              {status === "error" && (
                <p className={styles.errorMsg}>{c.form.error}</p>
              )}
              {status === "sent" ? (
                <div className={styles.sentRow}>
                  <p className={styles.successMsg}>
                    <CheckCircle size={15} /> {c.form.sent}
                  </p>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={handleReset}
                  >
                    {c.form.sendAnother}
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      {c.form.send} <Send size={15} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
