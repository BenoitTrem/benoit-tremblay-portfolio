"use client";
import styles from "./contact.module.css";
import { Mail, MapPin, Send } from "lucide-react";
import { useState, useRef } from "react";

type FormFields = { email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.subject.trim()) {
    errors.subject = "Subject is required.";
  }
  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (form.message.trim().length < 5) {
    errors.message = "Message must be at least 5 characters.";
  }
  return errors;
}

export default function Contact() {
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
    // re-validate the changed field if already touched
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
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name as keyof FormFields],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // touch all fields and validate
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
        {/* ── Hero ── */}
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            Have a project in mind, a question, or just want to say hello? Fill
            out the form and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {/* ── Info column ── */}
          <div className={styles.infoCol}>
            <p className={styles.sectionHeading}>Direct</p>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <Mail size={16} />
                </span>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <a
                    href="mailto:benoit@example.com"
                    className={styles.infoValue}
                  >
                    benoit@example.com
                  </a>
                </div>
              </div>
              <div className={styles.infoDivider} />
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <MapPin size={16} />
                </span>
                <div>
                  <p className={styles.infoLabel}>Location</p>
                  <p className={styles.infoValue}>Gatineau, QC, Canada</p>
                </div>
              </div>
            </div>

            <p className={styles.sectionHeading} style={{ marginTop: 40 }}>
              Availability
            </p>
            <div className={styles.availCard}>
              <span className={styles.availDot} />
              <p className={styles.availText}>Open to new opportunities</p>
            </div>
          </div>

          {/* ── Form ── */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.formCard}
            noValidate
          >
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                {...field("email")}
              />
              {errors.email && (
                <p className={styles.fieldError}>{errors.email}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder="Project inquiry, collaboration…"
                {...field("subject")}
              />
              {errors.subject && (
                <p className={styles.fieldError}>{errors.subject}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={7}
                placeholder="Tell me about your project or idea…"
                {...field("message")}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
              />
              {errors.message && (
                <p className={styles.fieldError}>{errors.message}</p>
              )}
            </div>

            <div className={styles.formFooter}>
              {status === "sent" && (
                <p className={styles.successMsg}>
                  ✓ Message sent — I'll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className={styles.errorMsg}>
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "sending" || status === "sent"}
              >
                {status === "sending" ? (
                  <span className={styles.spinner} />
                ) : status === "sent" ? (
                  "Sent!"
                ) : (
                  <>
                    {" "}
                    Send message <Send size={15} />{" "}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
