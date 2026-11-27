const BLOCKED_PROBE_RE = /^\/(?:\.git|\.env|\.htaccess|wp-login\.php|wp-admin|xmlrpc\.php|phpmyadmin)/i;

const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.liskinlabs.com https://kuka-krl-support-gateway.redminotpro5.workers.dev https://checkout.dodopayments.com; frame-src 'self' https://sim.liskinlabs.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://checkout.dodopayments.com; object-src 'none';",
};

function withSecurityHeaders(res) {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    out.headers.set(k, v);
  }
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const safePath = "/" + url.pathname.replace(/^\/+/, "");

    if (BLOCKED_PROBE_RE.test(safePath)) {
      return withSecurityHeaders(new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } }));
    }

    if (host === "www.liskinlabs.com" || host === "docs.liskinlabs.com") {
      return withSecurityHeaders(Response.redirect(`https://liskinlabs.com${safePath}${url.search}`, 301));
    }

    if (safePath === "/kuka-krl-extension" || safePath.startsWith("/kuka-krl-extension/")) {
      const rest = safePath.replace(/^\/kuka-krl-extension\/?/, "/");
      if (rest === "/sim" || rest.startsWith("/sim/")) {
        const sub = rest.replace(/^\/sim\/?/, "/");
        return withSecurityHeaders(Response.redirect(`https://sim.liskinlabs.com${sub}${url.search}`, 301));
      }
      return withSecurityHeaders(Response.redirect(`https://liskinlabs.com${rest}${url.search}`, 301));
    }

    if (safePath === "/sim" || safePath.startsWith("/sim/")) {
      const sub = safePath.replace(/^\/sim\/?/, "/");
      return withSecurityHeaders(Response.redirect(`https://sim.liskinlabs.com${sub}${url.search}`, 301));
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return withSecurityHeaders(new Response("Method Not Allowed", { status: 405 }));
    }

    const res = await env.ASSETS.fetch(request);
    return withSecurityHeaders(res);
  },
};
