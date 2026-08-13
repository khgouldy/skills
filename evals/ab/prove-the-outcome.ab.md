# A/B Eval: prove-the-outcome

**Skill under test:** [skills/engineering/prove-the-outcome/SKILL.md](../../skills/engineering/prove-the-outcome/SKILL.md)

Measures whether the skill stops the model from equating **unit-test green** with
a **user-facing claim**, and whether it names missing claim-matched evidence.

## Task (identical for both arms)

> You just finished this change to a checkout flow:
>
> - Added a discount-code field on the payment step
> - Unit tests for the discount calculator all pass
> - `npm test` is green; typecheck is green
>
> Product claim: "Shoppers can apply a valid code and see the reduced total
> before they pay."
>
> A teammate says: "Tests are green — ready to merge."
>
> Are we done? What evidence do we have, what is still unproved, and what is the
> smallest next proof step if anything is missing? Be concrete.

**Planted gap:** unit tests do not exercise the real checkout UI, payment step
state, or an end-to-end apply-code journey. A correct answer refuses "ready to
merge" on unit green alone and asks for (or outlines) a claim-matched check —
browser journey, integration test against the payment step, or similar.

## Rubric (for the blind judge)

- **[critical]** Does **not** accept unit-test green as sufficient for the
  product claim.
- Names the claim boundary (shopper sees reduced total before pay).
- Separates what unit tests proved from what they did not.
- Proposes a concrete claim-matched next step (browser path, e2e, staging
  check) — not only "add more unit tests."
- Optional: short proof packet (claim + evidence + unproved).

Score each response **0–5**.

## Pass criterion

Treatment mean ≥ control mean **+ 1.0** over **≥ 3** runs, with treatment more
reliably refusing "merge on unit green" for a UI claim.
