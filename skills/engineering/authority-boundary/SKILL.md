---
name: authority-boundary
description: Use when an action could merge, deploy, touch secrets, mutate production/shared state, or otherwise cross a consequential boundary — separate capability (how) from authority (who/may), prefer reversible work, and interpret instructions through the protected path. Triggers include merge, deploy, production, credentials, "just force it", admin bypass, irreversible data changes, or any moment "I can" is about to substitute for "I'm allowed."
---

# Authority boundary

**Capability** is how to cause an effect. **Authority** is which identity may
cause which effect, on which resource, in which environment, for how long, under
what approval, audit, and recovery contract.

Keep them separate. Work broadly where mistakes are cheap. Narrow, revocable
grants at consequential boundaries.

This is *can vs may*. For proving the effect actually happened, use
[prove-the-outcome](../prove-the-outcome/SKILL.md). For owning delivery inside
an allowed envelope, use [whole-job](../../productivity/whole-job/SKILL.md).

## Default envelope: reversible work is wide

Inspect, edit, build, test, simulate, and iterate where effects are isolated and
recoverable. Most mistakes there are feedback, not incidents.

A grant should be legible when consequence rises. Name:

- worker identity
- operation and target resource
- environment and scope
- lifetime and revocation path
- approval or separation of duties (if any)
- audit receipt / postcondition
- rollback or recovery path

## Stage consequential effects

Split high-consequence work so each stage has its own authority and evidence:

```text
Assess → Prepare → Canary → Approve → Cut over → Verify
                         ↘ on failure: Roll back
```

Canary proof is not production authority. Production access is not proof the
system is healthy. Collect claim-matched evidence at each stage before asking to
cross the next gate.

## Interpret instructions through the contract

| Instruction | Means | Does not mean |
|---|---|---|
| "Merge it" | Complete the protected merge path | Admin bypass, skipping required checks |
| "Deploy" | Prepare and follow the release contract | Unapproved production cutover |
| "Use the credential" | Use the scoped grant for this job | Exfiltrate, broaden, or persist secrets in the repo/transcript |
| "Fix prod" | Diagnose; propose the smallest safe change | Unilateral irreversible mutation without the normal gate |

When irreversible target or scope stays ambiguous after reading local policy,
**ask before crossing**. Do not invent authority from urgency.

## Credentials and secrets

- Prefer ambient tools whose credentials stay outside model-visible context
  (broker, OS keychain, CI OIDC) over pasting secrets into the trajectory.
- Prefer read-only identities for inspection.
- Do not put secrets in the repository, tickets, or proof packets.
- A grant should be revocable even if a trajectory is still running.

If the job requires a capability you lack, name the missing grant and the
smallest scope that would unblock it. Building credential plumbing can be a
nested whole job — do not silently widen access "so the agent can finish."

## Encode settled boundaries mechanically

Put stable rules in identity policy, typed operations, scoped tools, environment
boundaries, tests, and merge gates. Make wrong actions unavailable where
consequence justifies it. Keep prose for judgment the system cannot yet express.

One decision point: decode the requested effect → evaluate against the identity's
grant → on denial, return a precise reason and the safe next action. The same
model should cover direct commands, scheduled work, and higher-level tools.

## Anti-patterns

- Treating tool availability as permission
- Force-push, `--no-verify`, admin merge, or secret expansion to satisfy a verb
- Holding long-lived prod credentials in agent context "for convenience"
- Skipping canary/approval because the change "looks small"
- Asking the user to paste a secret into chat when a broker exists
- Continuing past an access denial by guessing another path that weakens the boundary

## Before a consequential action

1. What exact effect am I about to cause?
2. Which identity and grant authorize it?
3. Is there a reversible or staged path first?
4. What evidence will prove success — and what is the recovery if it fails?
5. If any answer is missing, stop and ask or prepare; do not cross.

---

_Inspired by Ryan Lopopolo's harness-engineering thesis on authority ([lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) `docs/authority`) and the OpenAI [Harness engineering](https://openai.com/index/harness-engineering/) essay. Prose is our own._
