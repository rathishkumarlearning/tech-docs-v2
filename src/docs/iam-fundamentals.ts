import { Doc } from './index'

export const iamFundamentals: Doc = {
  slug: 'iam-fundamentals',
  title: 'IAM Fundamentals — Identity, Access, and Zero Trust',
  description: 'Everything you need to know about Identity and Access Management: authentication, authorization, OAuth, OIDC, RBAC, and the Zero Trust model.',
  author: 'Rathish Kumar',
  date: '2026-02-28',
  readTime: '18 min read',
  source: 'Internal',
  category: 'Security',
  tags: ['iam', 'security', 'oauth', 'zero-trust', 'authentication'],
  accent: '#ef4444',
  sections: [
    {
      id: 1,
      title: 'What is IAM?',
      duration: '2 min',
      content: `
        <p><strong>Identity and Access Management (IAM)</strong> is the discipline of ensuring the right people have the right access to the right resources at the right time. It's the foundation of every secure system.</p>
        <p>IAM answers three fundamental questions:</p>
        <ul>
          <li><strong>Who are you?</strong> (Authentication / Identity)</li>
          <li><strong>What can you do?</strong> (Authorization / Access Control)</li>
          <li><strong>What did you do?</strong> (Auditing / Accountability)</li>
        </ul>
        <blockquote><p>IAM is not a product — it's an architecture. Every system has IAM, whether designed intentionally or cobbled together accidentally.</p></blockquote>
        <h4>The IAM Stack</h4>
        <table>
          <thead>
            <tr><th>Layer</th><th>Purpose</th><th>Examples</th></tr>
          </thead>
          <tbody>
            <tr><td>Identity Provider (IdP)</td><td>Who is this user?</td><td>Okta, Azure AD, Auth0</td></tr>
            <tr><td>Authentication</td><td>Prove your identity</td><td>Passwords, MFA, SSO</td></tr>
            <tr><td>Authorization</td><td>What can you access?</td><td>RBAC, ABAC, policies</td></tr>
            <tr><td>Session Management</td><td>Maintain login state</td><td>Tokens, cookies, sessions</td></tr>
            <tr><td>Audit & Compliance</td><td>Track all access</td><td>Logs, SIEM, SOC2</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 2,
      title: 'Authentication Deep Dive',
      duration: '3 min',
      content: `
        <p>Authentication verifies <em>who you are</em>. It's the front door of security, and getting it wrong means everything behind it is compromised.</p>
        <h4>Authentication Factors</h4>
        <ul>
          <li><strong>Something you know</strong> — passwords, PINs, security questions</li>
          <li><strong>Something you have</strong> — phone, hardware key (YubiKey), smart card</li>
          <li><strong>Something you are</strong> — fingerprint, face recognition, iris scan</li>
        </ul>
        <p>Multi-factor authentication (MFA) combines two or more of these factors. It's the single most effective security measure — reducing account compromise by <strong>99.9%</strong> according to Microsoft.</p>
        <h4>Modern Authentication Flows</h4>
        <pre><code>// Typical OAuth 2.0 + OIDC flow
1. User clicks "Login with Google"
2. App redirects to Google's authorization endpoint
3. User authenticates with Google
4. Google redirects back with authorization code
5. App exchanges code for tokens (access + id + refresh)
6. App validates id_token to confirm identity
7. App uses access_token to call APIs</code></pre>
        <h4>Token Types</h4>
        <table>
          <thead>
            <tr><th>Token</th><th>Purpose</th><th>Lifetime</th></tr>
          </thead>
          <tbody>
            <tr><td>ID Token (JWT)</td><td>Identity claims (who you are)</td><td>1 hour</td></tr>
            <tr><td>Access Token</td><td>API authorization (what you can do)</td><td>15 min - 1 hour</td></tr>
            <tr><td>Refresh Token</td><td>Get new access tokens</td><td>Days to weeks</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 3,
      title: 'Authorization Models',
      duration: '3 min',
      content: `
        <p>Authorization determines <em>what you can do</em> after you've proven who you are. There are several models, each with trade-offs:</p>
        <h4>RBAC (Role-Based Access Control)</h4>
        <p>The most common model. Users are assigned roles, and roles have permissions.</p>
        <pre><code>// RBAC Example
const roles = {
  admin:  ['read', 'write', 'delete', 'manage-users'],
  editor: ['read', 'write'],
  viewer: ['read'],
}

function canAccess(user, permission) {
  return roles[user.role]?.includes(permission) ?? false
}</code></pre>
        <h4>ABAC (Attribute-Based Access Control)</h4>
        <p>More flexible than RBAC. Access decisions based on attributes of the user, resource, and environment.</p>
        <pre><code>// ABAC Example
function canAccess(user, resource, action, environment) {
  // User attributes: department, clearance level, location
  // Resource attributes: classification, owner, type
  // Environment: time of day, IP address, device trust

  if (resource.classification === 'confidential' 
      && user.clearance < 3) return false
  
  if (environment.outsideWorkHours 
      && !user.hasRemoteAccess) return false
  
  return true
}</code></pre>
        <h4>Comparison</h4>
        <table>
          <thead>
            <tr><th>Model</th><th>Pros</th><th>Cons</th></tr>
          </thead>
          <tbody>
            <tr><td>RBAC</td><td>Simple, well-understood, easy to audit</td><td>Role explosion in complex orgs</td></tr>
            <tr><td>ABAC</td><td>Fine-grained, context-aware</td><td>Complex policies, harder to debug</td></tr>
            <tr><td>ReBAC</td><td>Relationship-based (Google Zanzibar)</td><td>Complex graph models</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 4,
      title: 'OAuth 2.0 & OpenID Connect',
      duration: '3 min',
      content: `
        <p>OAuth 2.0 is the <strong>authorization</strong> framework. OpenID Connect (OIDC) is the <strong>identity</strong> layer on top. Together, they power most modern authentication.</p>
        <h4>OAuth 2.0 Grant Types</h4>
        <ul>
          <li><strong>Authorization Code + PKCE</strong> — for web apps, SPAs, mobile. The gold standard.</li>
          <li><strong>Client Credentials</strong> — machine-to-machine (no user involved)</li>
          <li><strong>Device Code</strong> — for TVs, IoT (limited input devices)</li>
          <li><s>Implicit Grant</s> — <strong>DEPRECATED</strong>. Never use in new apps.</li>
          <li><s>Resource Owner Password</s> — <strong>DEPRECATED</strong>. Direct password sharing.</li>
        </ul>
        <h4>PKCE (Proof Key for Code Exchange)</h4>
        <pre><code>// PKCE protects the authorization code flow
// Essential for SPAs and mobile apps

1. Generate random code_verifier (43-128 chars)
2. Create code_challenge = SHA256(code_verifier)
3. Send code_challenge in authorization request
4. Send code_verifier in token exchange
5. Server verifies: SHA256(code_verifier) === stored challenge

// This prevents authorization code interception attacks</code></pre>
        <h4>OIDC Claims</h4>
        <p>The ID token contains identity claims as a JWT:</p>
        <pre><code>{
  "iss": "https://accounts.google.com",
  "sub": "user-unique-id-12345",
  "aud": "your-app-client-id",
  "exp": 1709571200,
  "iat": 1709567600,
  "email": "user@example.com",
  "name": "Rathish Kumar",
  "picture": "https://..."
}</code></pre>
      `
    },
    {
      id: 5,
      title: 'Zero Trust Architecture',
      duration: '2 min',
      content: `
        <p>Zero Trust is a security model where <strong>nothing is trusted by default</strong> — not even traffic inside your network. Every request must be verified.</p>
        <blockquote><p>"Never trust, always verify." — Zero Trust principle</p></blockquote>
        <h4>Core Principles</h4>
        <ul>
          <li><strong>Verify explicitly</strong> — authenticate and authorize every request based on all available data (identity, device, location, behavior)</li>
          <li><strong>Least privilege access</strong> — give minimum permissions needed, just-in-time, just-enough</li>
          <li><strong>Assume breach</strong> — design systems as if the attacker is already inside</li>
        </ul>
        <h4>Zero Trust vs Traditional</h4>
        <table>
          <thead>
            <tr><th>Aspect</th><th>Traditional</th><th>Zero Trust</th></tr>
          </thead>
          <tbody>
            <tr><td>Trust model</td><td>Trust inside network</td><td>Trust nothing</td></tr>
            <tr><td>Perimeter</td><td>Network boundary</td><td>Identity is the perimeter</td></tr>
            <tr><td>Access</td><td>VPN = full access</td><td>Per-resource authorization</td></tr>
            <tr><td>Monitoring</td><td>Perimeter only</td><td>Every transaction</td></tr>
          </tbody>
        </table>
        <h4>Implementation Pillars</h4>
        <pre><code>// Zero Trust decision flow
function authorizeRequest(request) {
  // 1. Identity verification
  const identity = verifyToken(request.token)
  
  // 2. Device health check
  const device = checkDeviceCompliance(request.deviceId)
  
  // 3. Context evaluation
  const risk = evaluateRisk({
    identity,
    device,
    location: request.geoIP,
    time: Date.now(),
    behavior: getUserBehaviorScore(identity.sub)
  })
  
  // 4. Policy decision
  if (risk > THRESHOLD) return { allow: false, reason: 'High risk score' }
  
  // 5. Minimal access grant
  return { allow: true, scope: getMinimalScope(identity.role, request.resource) }
}</code></pre>
      `
    },
    {
      id: 6,
      title: 'Session Management',
      duration: '2 min',
      content: `
        <p>Sessions maintain authentication state between requests. Getting session management wrong leads to hijacking, fixation, and privilege escalation attacks.</p>
        <h4>Token-Based Sessions (Modern)</h4>
        <pre><code>// JWT stored in httpOnly cookie
res.cookie('session', jwt, {
  httpOnly: true,     // No JavaScript access
  secure: true,       // HTTPS only
  sameSite: 'lax',    // CSRF protection
  maxAge: 3600000,    // 1 hour
  path: '/',
})

// Token refresh pattern
if (isTokenExpiring(accessToken)) {
  const newTokens = await refreshTokens(refreshToken)
  setAccessToken(newTokens.access_token)
}</code></pre>
        <h4>Session Security Checklist</h4>
        <ul>
          <li>✅ Use <code>httpOnly</code> cookies (prevents XSS token theft)</li>
          <li>✅ Set <code>secure</code> flag (HTTPS only)</li>
          <li>✅ Use <code>sameSite=lax</code> or <code>strict</code> (CSRF protection)</li>
          <li>✅ Rotate session IDs on privilege changes</li>
          <li>✅ Implement absolute session timeout (max 24h)</li>
          <li>✅ Support session revocation (logout invalidates server-side)</li>
          <li>✅ Monitor concurrent sessions (alert on anomalies)</li>
        </ul>
      `
    },
    {
      id: 7,
      title: 'IAM Architecture Patterns',
      duration: '2 min',
      content: `
        <p>How you architect IAM determines your system's security posture, scalability, and developer experience.</p>
        <h4>Centralized vs Federated IAM</h4>
        <table>
          <thead>
            <tr><th>Pattern</th><th>Description</th><th>Best For</th></tr>
          </thead>
          <tbody>
            <tr><td>Centralized</td><td>Single IdP, all apps delegate</td><td>Enterprise, internal apps</td></tr>
            <tr><td>Federated</td><td>Multiple IdPs, trust relationships</td><td>B2B, multi-org</td></tr>
            <tr><td>Hybrid</td><td>Central core + federated edges</td><td>Large enterprises, M&A</td></tr>
          </tbody>
        </table>
        <h4>API Gateway Pattern</h4>
        <pre><code>// API Gateway handles all auth
Client → API Gateway → Microservice
         ↓
    1. Validate JWT
    2. Check permissions
    3. Rate limit
    4. Add user context headers
    5. Forward to service

// Service receives pre-authenticated request
// with X-User-Id, X-User-Role headers</code></pre>
        <h4>Token Exchange Pattern</h4>
        <p>In microservice architectures, services need to call other services on behalf of users:</p>
        <pre><code>// OAuth Token Exchange (RFC 8693)
POST /token
grant_type=token-exchange
&subject_token={user's_token}
&subject_token_type=access_token
&audience=downstream-service
&scope=read:data</code></pre>
      `
    },
    {
      id: 8,
      title: 'The IAM Checklist',
      duration: '1 min',
      content: `
        <p>Whether you're building a startup or securing an enterprise, here's your IAM checklist:</p>
        <h4>Authentication</h4>
        <ul>
          <li>✅ MFA enabled for all accounts (TOTP or WebAuthn)</li>
          <li>✅ OAuth 2.0 + PKCE for web/mobile apps</li>
          <li>✅ Password policies: 12+ chars, breach checking</li>
          <li>✅ Brute force protection (rate limiting, lockout)</li>
          <li>✅ SSO for enterprise (SAML or OIDC)</li>
        </ul>
        <h4>Authorization</h4>
        <ul>
          <li>✅ Least privilege by default</li>
          <li>✅ RBAC minimum, ABAC where context matters</li>
          <li>✅ Regular access reviews (quarterly minimum)</li>
          <li>✅ Just-in-time access for sensitive resources</li>
        </ul>
        <h4>Operations</h4>
        <ul>
          <li>✅ Centralized logging of all auth events</li>
          <li>✅ Anomaly detection (impossible travel, brute force)</li>
          <li>✅ Incident response plan for credential compromise</li>
          <li>✅ Regular rotation of service credentials</li>
          <li>✅ Disaster recovery for IdP (backup auth methods)</li>
        </ul>
        <blockquote><p>IAM isn't a one-time setup. It's an ongoing practice. Review, improve, and adapt as threats evolve and your organization grows.</p></blockquote>
      `
    },
  ],
}
