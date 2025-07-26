import { Request, Response } from "express";
import { createClient } from "../lib/supabaseClient";

export const getAuthConfirmation = async (request: Request, response: Response) => {
	const token_hash = request.query.token_hash;
	const type = request.query.type;
	const next = typeof request.query.next === "string" ? request.query.next : "/";

	if (token_hash && type) {
		try {
			const supabase = createClient({ request, response });
			const { error } = await supabase.auth.verifyOtp({
				type,
				token_hash,
			});
	
			if (!error) {
				return response.redirect(303, next);
			} else {
				console.error("Error verifying OTP: ", error);
			}
		} catch (err) {
			console.error("Error in TOP verification process: ", err);
		}
	}

	return response.redirect(303, "/auth/auth-code-error");
};