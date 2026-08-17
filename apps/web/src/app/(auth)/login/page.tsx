"use client"

import { useState } from "react"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    const submit = (e) => {
        e.preventDefault();
        
        
    }

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

                <form onSubmit={submit}>
                    <div className="flex flex-col">
                        <label htmlFor="email">Adresse e-mail</label>
                        <div>
                            <input id="email" type="email" name="email" placeholder="you@example.com" className="rounded-lg py-2 px-4" onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value}))} />
                        </div>
                    </div>

                    <div>
                        <label>Mot de passe</label>
                        <input id="password" type="password" name="password" placeholder="••••••••" onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>

                        <button type="submit">
                            Connexion
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