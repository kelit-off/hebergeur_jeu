"use client"

import api from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        addressComplement: "",
        postalCode: "",
        city: "",
        region: "",
        country: "",
        company: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState({
        type: "",
        message: ""
    });


    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            return setError({ type: "missing_firstName", message: "Le prénom est requis" });
        }

        if (!formData.lastName.trim()) {
            return setError({ type: "missing_lastName", message: "Le nom est requis" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            return setError({ type: "invalid_email", message: "L'adresse email n'est pas valide" });
        }

        if (formData.phone && !/^[\d\s+().-]{6,}$/.test(formData.phone)) {
            return setError({ type: "invalid_phone", message: "Le numéro de téléphone n'est pas valide" });
        }

        if (!formData.address.trim()) {
            return setError({ type: "missing_address", message: "L'adresse est requise" });
        }

        if (!/^\d{5}$/.test(formData.postalCode)) {
            return setError({ type: "invalid_postalCode", message: "Le code postal doit contenir 5 chiffres" });
        }

        if (!formData.city.trim()) {
            return setError({ type: "missing_city", message: "La ville est requise" });
        }

        if (!formData.country.trim()) {
            return setError({ type: "missing_country", message: "Le pays est requis" });
        }

        if (formData.password.length < 8) {
            return setError({ type: "weak_password", message: "Le mot de passe doit contenir au moins 8 caractères" });
        }

        if (formData.password !== formData.confirmPassword) {
            return setError({ type: "password_not_match", message: "Les mots de passe ne correspondent pas" });
        }

        setError({ type: "", message: "" });
        

        try {
            const result = await api.post("/v1/auth/register", formData);
            

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message ?? "Une erreur est survenue, veuillez réessayer";
                setError({ type: "server_error", message });
            } else {
                setError({ type: "unknown_error", message: "Une erreur inattendue est survenue" });
            }
        } finally {
            // setLoading(false);
    }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-[#161826] px-4 relative overflow-hidden">
            {/* glow d'ambiance en fond */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[36rem] rounded-full bg-[#9184d9]/15 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-[#e9e9ed] tracking-tight">
                        Inscription
                    </h1>
                    <p className="mt-1.5 text-sm text-[#e9e9ed]/50">
                        Accédez à votre espace
                    </p>
                </div>

                <div className="rounded-xl bg-[#232532] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-7">
                    <form onSubmit={submit} className="flex flex-col gap-5">

                        <h2 className="text-amber-50 font-bold">Informations personnelles</h2>

                        <div className="flex flex-row justify-around">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-xs font-medium mb-1.5 text-amber-50/60"
                                >
                                    Prénom
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    placeholder="Jean"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Nom
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    placeholder="Dupont"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-around">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
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
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Numéro de téléphone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="06 12 34 56 78"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.phone}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>

                        <h2 className="text-amber-50 font-bold">Adresse de facturation</h2>

                        <div className="flex flex-row justify-around">
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Adresse
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    autoComplete="street-address"
                                    placeholder="12 rue des Lilas"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.address}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="addressComplement"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Complément d'adresse
                                </label>
                                <input
                                    id="addressComplement"
                                    name="addressComplement"
                                    type="text"
                                    autoComplete="address-line2"
                                    placeholder="Appartement, étage..."
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.addressComplement}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-around">
                            <div>
                                <label
                                    htmlFor="postalCode"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Code postal
                                </label>
                                <input
                                    id="postalCode"
                                    name="postalCode"
                                    type="text"
                                    autoComplete="postal-code"
                                    placeholder="75001"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Ville
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    placeholder="Paris"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.city}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-around">
                            <div>
                                <label
                                    htmlFor="region"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Région
                                </label>
                                <input
                                    id="region"
                                    name="region"
                                    type="text"
                                    autoComplete="address-level1"
                                    placeholder="Île-de-France"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.region}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="country"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Pays
                                </label>
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    autoComplete="country-name"
                                    placeholder="France"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.country}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>


                        <div className="flex flex-row justify-start">
                            <div className="w-full">
                                <label
                                    htmlFor="company"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Société (optionnel)
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    autoComplete="organization"
                                    placeholder="Nom de l'entreprise"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.company}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>

                        <h2 className="text-amber-50 font-bold">Sécurité du compte</h2>

                        <div className="flex flex-row justify-around">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Mot de passe
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.password}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-xs font-medium mb-1.5 text-[#e9e9ed]/60"
                                >
                                    Confirmer le mot de passe
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full h-10 px-3 rounded-lg text-sm text-[#e9e9ed] placeholder:text-[#e9e9ed]/30 bg-[#161826] border border-white/[0.08] outline-none transition-colors focus:border-[#9184d9] focus:ring-2 focus:ring-[#9184d9]/20"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                />
                            </div>
                        </div>

                        {error.type && (
                            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                                <span>{error.message}</span>
                            </div>
                        )}


                        <button
                            type="submit"
                            className="mt-1 h-10 rounded-lg text-sm font-medium text-[#161826] bg-[#9184d9] transition-colors hover:bg-[#a7a1db] active:bg-[#796cbf]"
                        >
                            S'inscrire
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-[#e9e9ed]/40">
                    Déja un compte ?{" "}
                    <a href="/login" className="text-[#9184d9] hover:text-[#a7a1db] transition-colors">
                        Connecte toi
                    </a>
                </p>
            </div>
        </div>
    )
}
