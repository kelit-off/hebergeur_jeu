export default function LoginPage() {
    return (
        <div>
            <div>
                <div>
                    <p>Connexion</p>
                </div>

                <form>
                    <div>
                        <label>Adresse e-mail</label>
                        <input id="email" type="email" name="email" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label>Mot de passe</label>
                        <input id="password" type="password" name="password" placeholder="••••••••" />
                    </div>

                        <button>

                        </button>
                </form>
            </div>
            <p> Tu n'as pas de compte ? <a href="/register">Inscription</a></p>
        </div>
    )
}