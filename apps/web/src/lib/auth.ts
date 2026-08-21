import { cookies } from "next/headers";
import api from "./api";

export async function getCurrentUser() {
    const token = (await cookies()).get("access_token")?.value;
    if(!token) return null;

    try {
        const {data} =  await api.get("/v1/auth/me", {
            headers: {Authorization: `Bearer ${token}`},
        });
        return data;
    } catch {
        return null
    }
}