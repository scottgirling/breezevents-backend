import { Request, Response } from "express";
import { createClient } from "../lib/supabaseClient";

export const getAuthConfirmation = async (request: Request, response: Response) => {
	const token_hash = request.query.token_hash;
	console.log(token_hash, "<--- token_hash")
	const type = request.query.type;
	console.log(type, "<--- type (before hard code)")
	const next = typeof request.query.next === "string" ? request.query.next : "/";
	
	if (token_hash && type) {
		try {
			const supabase = createClient({ request, response });
			const { error, data } = await supabase.auth.verifyOtp({
				type: "signup",
				token_hash: token_hash as string,
			});

			console.log("OTP verification data: ", data)
	
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