"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { isAdminUiPreview } from "@/lib/admin/preview";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (isAdminUiPreview()) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
      <div>
        <label htmlFor="email" className="text-sm text-neutral-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm text-neutral-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button
        type="submit"
        disabled={loading}
        className="w-full !bg-fleetSignal hover:!bg-blue-700 sm:w-auto"
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
