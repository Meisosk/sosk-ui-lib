import { useState, FormEvent, ChangeEvent } from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { TextField } from "./Form/TextField";
import { DismissibleAlert } from "./DismissibleAlert";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm({
  onSubmit,
  submitLabel = "Send message",
  successMessage = "Your message has been sent!",
  errorMessage = "There was an issue sending your message. Please try again.",
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormData>(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange =
    (field: keyof ContactFormData) => (e: ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await onSubmit(values);
      setValues(emptyForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          required
          fullWidth
        />
        <TextField
          label="Email Address"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          required
          fullWidth
        />
        <TextField
          label="Subject"
          value={values.subject}
          onChange={handleChange("subject")}
          fullWidth
        />
        <TextField
          label="Your message"
          value={values.message}
          onChange={handleChange("message")}
          required
          fullWidth
          multiline
          minRows={4}
        />

        {status === "success" && (
          <DismissibleAlert
            severity="success"
            onClose={() => setStatus("idle")}
          >
            {successMessage}
          </DismissibleAlert>
        )}
        {status === "error" && (
          <DismissibleAlert severity="error" onClose={() => setStatus("idle")}>
            {errorMessage}
          </DismissibleAlert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={status === "submitting"}
          fullWidth
        >
          {status === "submitting" ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            submitLabel
          )}
        </Button>
      </Stack>
    </Box>
  );
}
