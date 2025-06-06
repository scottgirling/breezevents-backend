import { Request, Response } from "express";
const createClient = require("../lib/supabaseClient");

const postSupabaseClient = async (request: Request, response: Response) => {
  try {
    const supabase = createClient({ request, response });

    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
      return response.status(500).json({ error: "Failed to get session" });
    }

    return response.status(200).json({ message: "Supabase client created", session: sessionData });
    } catch (err) {
        return response.status(500).json({ error: "Unexpected server error", details: err });
    }
}

module.exports = postSupabaseClient;