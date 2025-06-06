import { Request, Response } from "express";
const createClient = require("../lib/supabaseClient");

const getAuthConfirmation = async (request: Request, response: Response) => {
	const token_hash = request.query.token_hash;
	const type = request.query.type;
	const next = typeof request.query.next === "string" ? request.query.next : "/";

	if (token_hash && type) {
		const supabase = createClient({ request, response });
		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});

		if (!error) {
			return response.redirect(303, next);
		}
	}

	return response.redirect(303, "/auth/auth-code-error");
};

module.exports = getAuthConfirmation;