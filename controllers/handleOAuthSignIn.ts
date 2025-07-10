import { Request, Response } from "express";
import { createClient } from "../lib/supabaseClient";

const handleOAuthSignIn = async (request: Request, response: Response) => {
    const code = request.query.code;

    if (code) {
        const supabase = createClient({ request, response });
        await supabase.auth.exchangeCodeForSession(code);
    }

    response.redirect("http://localhost:5173");
}

module.exports = handleOAuthSignIn;