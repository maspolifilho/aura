"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [origin, setOrigin] = useState<"obstetra" | "outro_canal" | "">("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!origin) {
      toast.error("Selecione como você conheceu a Clínica Aura.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          phone: formData.get("phone"),
          email: formData.get("email") || undefined,
          origin,
          obstetricianName: formData.get("obstetricianName") || undefined,
          notes: formData.get("notes") || undefined,
        }),
      });

      if (!response.ok) throw new Error("Falha no envio");

      toast.success("Recebemos seu contato! Em breve falamos com você.");
      form.reset();
      setOrigin("");
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Nome completo</Label>
          <Input id="fullName" name="fullName" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Telefone/WhatsApp</Label>
          <Input id="phone" name="phone" required placeholder="(75) 9...." />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail (opcional)</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Como conheceu a Clínica Aura?</Label>
          <Select
            value={origin}
            onValueChange={(value) => setOrigin(value as typeof origin)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="obstetra">Indicação do obstetra</SelectItem>
              <SelectItem value="outro_canal">Outro canal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {origin === "obstetra" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="obstetricianName">Nome do obstetra</Label>
          <Input id="obstetricianName" name="obstetricianName" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Mensagem (opcional)</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Conte um pouco sobre sua gestação ou dúvida"
        />
      </div>

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar contato"}
      </Button>
    </form>
  );
}
