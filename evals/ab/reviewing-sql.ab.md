# A/B Eval: reviewing-sql

**Skill under test:** [skills/data/reviewing-sql/SKILL.md](../../skills/data/reviewing-sql/SKILL.md)

Measures whether the skill makes the model catch a hidden **join fan-out** — the
#1 cause of inflated metrics — in a query that looks fine at a glance.

## Task (identical for both arms)

> Review the following SQL for correctness. Is it right? If not, say exactly
> what's wrong and how you'd fix it.
>
> ```sql
> SELECT
>   o.customer_id,
>   SUM(o.order_amount) AS total_revenue,
>   COUNT(*)            AS order_count
> FROM orders o
> LEFT JOIN order_line_items li ON li.order_id = o.order_id
> WHERE o.order_date >= '2026-01-01'
> GROUP BY o.customer_id;
> ```
>
> Schema: `orders` has one row per order, with `order_amount`.
> `order_line_items` has one row per line item — several per order.

**The planted bug:** joining to `order_line_items` fans out each order into one
row per line item. So `SUM(o.order_amount)` double-counts the order amount once
per line item (inflated revenue), and `COUNT(*)` counts line items, not orders.

## Rubric (for the blind judge)

- **[critical]** Identifies the join fan-out / row multiplication from the
  one-to-many join.
- Explains `SUM(o.order_amount)` is inflated because order rows are duplicated.
- Notes `COUNT(*)` counts line items, not orders.
- Proposes a correct fix (drop the join if line items aren't needed; or
  pre-aggregate line items to one row per order before joining; or
  `COUNT(DISTINCT o.order_id)` and sum over a deduped order set).

Score each response **0–5** on catching the core bug and the quality of the fix.

## Pass criterion

Treatment mean ≥ control mean **+ 1.0** over **≥ 3** runs, with treatment
catching the fan-out more reliably than control.

## Example run (2026-06, model: Opus 4.8)

Two control arms + two treatment arms + one blind judge, scored 0–5 on the rubric:

| Arm | Run 1 | Run 2 | Mean |
|---|---|---|---|
| Control (no skill) | 5 | 5 | **5.0** |
| Treatment (skill injected) | 5 | 5 | **5.0** |

**Lift: 0.0.** All four arms caught the fan-out, explained the inflated `SUM`
and miscounted `COUNT(*)`, and proposed dropping the unused join. The judge rated
them comparable (treatment R3 was marginally deepest — it warned that
`COUNT(DISTINCT order_id)` rescues the count but *not* the `SUM` — but not enough
to move the score).

**Interpretation — this is a useful negative result, not a failure.** On a task
this model already handles, the skill is redundant, so lift is ~0. To detect real
lift you must run the eval at the model's *competence frontier*: a subtler trap
(e.g. fan-out hidden behind two joins and a `DISTINCT` that looks like it fixes
things), a weaker/cheaper model, or a task the base model fails ~half the time.
A skill's value shows up exactly where the model would otherwise get it wrong —
so target those tasks when measuring lift.
