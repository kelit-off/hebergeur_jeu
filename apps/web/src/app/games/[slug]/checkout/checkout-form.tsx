"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { apiFetch, ApiError } from "@/lib/api";
import type { Game } from "@/lib/types";

function PaymentStep() {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Le paiement a échoué");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="rounded-full bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {submitting ? "Paiement en cours..." : "Payer et créer mon serveur"}
      </button>
    </form>
  );
}

export function CheckoutForm({ game }: { game: Game }) {
  const router = useRouter();
  const [serverName, setServerName] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiFetch("/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ gameSlug: game.slug, serverName }),
      });
      setClientSecret(res.clientSecret);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        router.push(`/login?redirect=/games/${game.slug}/checkout`);
        return;
      }
      setError(e instanceof ApiError ? e.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <Elements stripe={getStripe()} options={{ clientSecret }}>
        <PaymentStep />
      </Elements>
    );
  }

  return (
    <form onSubmit={startCheckout} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nom du serveur</label>
        <input
          type="text"
          required
          minLength={3}
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          placeholder="Mon serveur"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Préparation..." : "Continuer vers le paiement"}
      </button>
    </form>
  );
}
