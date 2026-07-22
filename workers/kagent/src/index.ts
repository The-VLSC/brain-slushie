export interface Env {
  ENVIRONMENT: string;
  OWNER_PRINCIPAL: string;
  KAGENT_PRINCIPAL: string;
  ACCESS_AUD?: string;
}

type PrincipalRole = "owner" | "kagent" | "agent" | "anonymous";

interface IdentityContext {
  email: string | null;
  role: PrincipalRole;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "referrer-policy": "no-referrer"
    }
  });

function identityFromRequest(request: Request, env: Env): IdentityContext {
  const email = request.headers.get("cf-access-authenticated-user-email");
  if (!email) return { email: null, role: "anonymous" };

  const normalized = email.toLowerCase();
  if (normalized === env.OWNER_PRINCIPAL.toLowerCase()) {
    return { email, role: "owner" };
  }
  if (normalized === env.KAGENT_PRINCIPAL.toLowerCase()) {
    return { email, role: "kagent" };
  }
  return { email, role: "agent" };
}

function requireRole(identity: IdentityContext, allowed: PrincipalRole[]): Response | null {
  return allowed.includes(identity.role)
    ? null
    : json({ error: "forbidden", requiredRoles: allowed }, 403);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const identity = identityFromRequest(request, env);

    if (request.method === "GET" && url.pathname === "/health") {
      return json({
        service: "thevlsc-kagent",
        status: "ok",
        environment: env.ENVIRONMENT,
        authenticated: identity.role !== "anonymous"
      });
    }

    if (request.method === "GET" && url.pathname === "/v1/whoami") {
      const denied = requireRole(identity, ["owner", "kagent", "agent"]);
      if (denied) return denied;
      return json({ principal: identity.email, role: identity.role });
    }

    if (request.method === "POST" && url.pathname === "/v1/admin/deploy-intent") {
      const denied = requireRole(identity, ["owner", "kagent"]);
      if (denied) return denied;

      return json({
        accepted: true,
        requestedBy: identity.email,
        note: "This endpoint records intent only. Production deployment remains protected by GitHub environment approval."
      }, 202);
    }

    if (request.method === "POST" && url.pathname === "/v1/owner/policy") {
      const denied = requireRole(identity, ["owner"]);
      if (denied) return denied;
      return json({ accepted: false, reason: "Policy mutation is not enabled in the foundation release." }, 501);
    }

    return json({ error: "not_found" }, 404);
  }
} satisfies ExportedHandler<Env>;
