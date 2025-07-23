import { SupasbaseContext } from "../controllers/interfaces/types";
const { createServerClient, parseCookieHeader, serializeCookieHeader } = require('@supabase/ssr');

require("dotenv").config({
	path: `${__dirname}/../../.env.SUPABASE_AUTH`
});

export const createClient = (context: SupasbaseContext) => {
  // return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
  //   cookies: {
  //     getAll() {
  //       return parseCookieHeader(context.request.headers.cookie ?? '');
  //     },
  //     setAll(cookiesToSet: any) {
  //       cookiesToSet.forEach(({ name, value, options } : { name: unknown, value: unknown, options: unknown}) => {
  //         const serialized = serializeCookieHeader(name, value, options);

  //         const existing = context.response.getHeader('Set-Cookie');
  //         const newValue = existing
  //           ? Array.isArray(existing)
  //             ? [...existing, serialized]
  //             : [existing, serialized]
  //           : serialized;

  //         context.response.setHeader('Set-Cookie', newValue);
  //       });
  //     },
  //   },
  // });
  return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
};

module.exports = createClient;