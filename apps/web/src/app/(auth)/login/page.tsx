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
        <div>
            <div>
                <div>
                    <p>Connexion</p>
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
            <p> Tu n'as pas de compte ? <a href="/register">Inscription</a></p>
        </div>
    )
}