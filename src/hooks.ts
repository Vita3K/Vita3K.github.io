import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';
import { normalizeLegacyPathname } from '$lib/legacy-routes';

export const reroute: Reroute = (request) =>
    normalizeLegacyPathname(deLocalizeUrl(request.url).pathname);
