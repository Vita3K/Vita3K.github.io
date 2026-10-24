import type { Reroute } from '@sveltejs/kit/hooks';
import { deLocalizeUrl } from '#lib/paraglide/runtime.js';
import { normalizeLegacyPathname } from '#lib/legacy-routes.js';

export const reroute: Reroute = (request) =>
    normalizeLegacyPathname(deLocalizeUrl(request.url).pathname);
