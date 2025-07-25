import { Request, Response } from "express";
import { createClient } from "../lib/supabaseClient";

export const handleOAuthSignIn = async (request: Request, response: Response) => {
    const code = request.query.code;

    if (code) {
        const supabase = createClient({ request, response });
        await supabase.auth.exchangeCodeForSession(code);
    }

    response.redirect("https://breezevents.netlify.app/account");
}

// above code never reached - using implicit flow currently