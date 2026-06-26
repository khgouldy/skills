---
name: unslop
description: Use when writing or editing prose a human will read — docs, READMEs, PR descriptions, commit messages, comments, reports, summaries, release notes, user-facing messages — to strip the tells of AI-generated text and add a human voice. Triggers include "make this sound less like AI", "tighten this writing", "unslop this", or any pass over text where the goal is that it not read as machine-generated.
---

# Unslop

Edit text to remove AI patterns and add a human voice. This is a *quality* pass
on prose, not on code.

## Process

1. Scan for the patterns below.
2. Rewrite, preserving meaning and matching the intended tone.
3. Add voice (next section) — removing tells is only half the job.
4. Self-audit: ask "what makes this obviously AI-generated?" and fix what's left.

## Add voice

Sterile, voiceless writing is as obvious as the patterns below.

- **Have an opinion.** React to facts instead of neutrally listing pros and cons.
- **Vary rhythm.** Short sentences. Then longer ones that take their time.
- **Acknowledge complexity.** "Impressive, and a little unsettling" beats
  "impressive."
- **Use "I" when it fits.** First person isn't unprofessional.
- **Be specific.** Not "this is concerning" but the concrete thing that concerns
  you, named.

## Patterns to cut

**Content**

1. **Significance inflation** — "pivotal moment", "testament to", "evolving
   landscape", "leaves an indelible mark". State what happened.
2. **Vague attribution** — "experts believe", "studies suggest", "some argue".
   Name the source or cut it.
3. **Superficial -ing tails** — "...highlighting the importance of...",
   "...ensuring...", "...showcasing...". Delete or replace with a real fact.
4. **Promotional adjectives** — "vibrant", "breathtaking", "groundbreaking",
   "renowned", "must-have". Use neutral description.
5. **Formulaic challenge arcs** — "Despite challenges, X continues to thrive."
   Replace with specifics.

**Language**

6. **AI vocabulary** — additionally, crucial, delve, enhance, foster, garner,
   intricate, leverage, landscape (abstract), pivotal, showcase, tapestry,
   testament, underscore, utilize. Use plain words.
7. **Copula avoidance** — "serves as", "stands as", "boasts", "features". Just
   "is" or "has".
8. **Negative parallelism** — "It's not just X, it's Y." State the point directly.
9. **Forced rule of three** — three items where the real count is two or four.
10. **Synonym cycling** — protagonist / main character / central figure / hero in
    one paragraph. Pick one word, repeat it.

**Style**

11. **Em dashes** — avoid them; they're a strong tell. Use a period or a comma.
    Don't just swap in parentheses, that trades one tell for another.
12. **Colon-as-connector** — colons are fine before a list or example, not as
    mid-sentence drama. Rewrite so the point stands without the crutch.
13. **Boldface overuse** — don't bold every proper noun or acronym.
14. **Restating inline-header lists** — "**Performance:** Performance improved..."
    The label just echoes the line. Convert to prose. (A bold lead-in that names
    an item and is followed by *new* detail is fine.)
15. **Title-case headings** — use sentence case.
16. **Decorative emojis** — remove from headings and bullets.
17. **Curly quotes** — replace with straight quotes.

**Tone artifacts**

18. **Chatbot phrases** — "I hope this helps!", "Let me know if...", "Certainly!",
    "Great question!" Cut them.
19. **Cutoff disclaimers** — "While specific details are limited..." Find the
    detail or cut the sentence.
20. **Sycophancy** — "You're absolutely right!" Respond directly.

**Filler and jargon**

21. **Filler phrases** — "in order to" → "to"; "due to the fact that" → "because";
    "it is important to note that" → (delete).
22. **Over-hedging** — "could potentially possibly be argued that it might" →
    "may".
23. **Abstract metaphor nouns** — substrate, wedge, vector, locus, nexus,
    primitive (as noun), surface (as in "API surface"), scaffolding (metaphor),
    paradigm, gold-plating. These sound technical but usually have a plainer,
    concrete word. "Substrate" → "base"; "gold-plating" → "more than the job
    needs."

**Plain speech**

24. **Say the concrete thing.** Don't wrap a simple point in abstract framing or
    describe how something *feels* instead of what it *does*. "Types that follow
    your schema" names a feeling; "a column rename fails the build" names the
    mechanism. If you can't restate it as a concrete instruction, fact, or
    number, cut it.
25. **One idea per sentence.** If the reader has to backtrack to parse it, split
    it.
26. **Active voice.** "Queries are validated" → "the compiler validates queries."
    Passive is fine only when the actor is unknown or genuinely doesn't matter.
27. **Cut adverbs or use a stronger verb.** "Runs quickly" → "is fast" or the
    number. An adverb propping up a weak verb means the verb is wrong.

---

_Inspired by the `unslop` skill in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own; trigger scoped to prose-writing tasks for this repo._
