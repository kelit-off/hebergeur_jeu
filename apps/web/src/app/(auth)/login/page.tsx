"use client";

import { useState } from "react";
import axios from "axios";
import api from "@/lib/api";

type FormData = {
    email: string;
    password: string;
};

type FormError = {
    type: string;
    message: string;
};

export default function LoginForm() {
    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
    const [error, setError] = useState<FormError>({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            return setError({ type: "invalid_email", message: "L'adresse email n'est pas valide" });
        }

        if (!formData.password) {
            return setError({ type: "missing_password", message: "Le mot de passe est requis" });
        }

        setError({ type: "", message: "" });
        setLoading(true);

        try {
            await api.post("/auth/login", formData);
            // TODO: redirection après connexion réussie (ex: router.push("/dashboard"))
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setError({ type: "invalid_credentials", message: "Email ou mot de passe incorrect" });
                } else {
                    const message = err.response?.data?.message ?? "Une erreur est survenue, veuillez réessayer";
                    setError({ type: "server_error", message });
                }
            } else {
                setError({ type: "unknown_error", message: "Une erreur inattendue est survenue" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-[#161826] px-4 relative overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[36rem] rounded-full bg-[#9184d9]/15 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-[#e9e9ed] tracking-tight">
                        Connexion
                    </h1>
                    <p className="mt-1.5 text-sm text-[#e9e9ed]/50">
                        Accédez à votre espace
                    </p>
                </div>

                <div className="rounded-xl bg-[#232532] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-7">
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="vous@exemple.com"
                                className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-xs font-medium text-[#e9e9ed]/60">
                                    Mot de passe
                                </label>
                                <a href="/forgot-password" className="text-xs text-[#9184d9] hover:text-[#a7a1db] transition-colors">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {error.type && (
                            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                                <span>{error.message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 h-10 rounded-lg text-sm font-medium text-[#161826] bg-[#9184d9] transition-colors hover:bg-[#a7a1db] active:bg-[#796cbf] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-[#e9e9ed]/40">
                    Pas encore de compte ?{" "}
                    <a href="/register" className="text-[#9184d9] hover:text-[#a7a1db] transition-colors">
                        Crée-en un
                    </a>
                </p>
            </div>
        </div>
    );
}