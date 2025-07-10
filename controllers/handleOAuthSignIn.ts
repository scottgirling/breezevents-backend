import { Request, Response } from "express";
import { createClient } from "../lib/supabaseClient";

const handleOAuthSignIn = async (request: Request, response: Response) => {
    const code = request.query.code;

    if (code) {
        const supabase = createClient({ request, response });
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log(data, "<--- data")
        console.log(error, "<--- error")
    }

    response.redirect("http://localhost:5173/account");
}

module.exports = handleOAuthSignIn;