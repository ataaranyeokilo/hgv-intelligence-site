---
name: context-handoff
description: Prepares a concise project handoff in CONTEXT.md so a fresh agent can continue without losing important context. Use when agent context reaches around 40%, when the current discussion is becoming large, or when the user asks for a context handoff.
---

# context-handoff

Use this skill when the agent context reaches around 40% or when the current discussion is becoming large.

Goal:
Prepare the project so a fresh agent can continue without losing important context.

## What to do

1. Inspect the current repo state:

   * current branch
   * recent commits
   * changed files
   * current ticket
   * completed tickets
   * known bugs
   * pending decisions

2. Update `CONTEXT.md` with a short handoff section:

```md
# Latest Handoff

## Current Branch
...

## Current Ticket
...

## Completed Since Last Handoff
...

## Current Implementation State
...

## Database State
...

## Environment Notes
...

## Known Issues / Risks
...

## Next Recommended Action
...
```

3. Keep it concise.
   Do not dump chat history.
   Do not include secrets.
   Do not include `.env.local` values.
   Do not include long logs unless needed.

4. After updating `CONTEXT.md`, run:

```bash
git status
```

5. Tell Ata:

* what you added to `CONTEXT.md`
* whether the working tree is clean
* what the next agent should read first

## New agent startup instruction

After this skill runs, the next agent should be told:

```md
Read CONTEXT.md, STACK.md, and COMMUNICATION.md first.

Then summarize:
1. current project state
2. current branch
3. current ticket
4. next safest implementation step

Do not write code until the plan is confirmed.
```

## Rules

* Preserve important engineering decisions.
* Remove noise.
* Prefer facts over guesses.
* Mention uncertainty clearly.
* Never store secrets.
* Never rely only on chat memory.
* Treat `CONTEXT.md` as the project source of truth.

## Inspection checklist

Before writing the handoff, gather facts from the repo (not chat memory alone):

```bash
git branch --show-current
git log --oneline -10
git status --short
```

Also scan for ticket references in branch names, commit messages, and open issues/PRs if present.

## Writing the handoff

- Append or replace the `# Latest Handoff` section at the **top** of `CONTEXT.md` (after the file title if present). Keep older project background below it.
- Use bullet points and short sentences.
- Record only verified state: branch name, ticket ID, files touched, migrations applied, env vars **named** (never valued).
- If something is unknown, write `Unknown — verify before proceeding` rather than guessing.

## Reporting to Ata

End with a short summary:

1. **CONTEXT.md changes** — which sections were added or updated
2. **Working tree** — clean or list uncommitted changes
3. **Next agent reads** — `CONTEXT.md` → `STACK.md` → `COMMUNICATION.md`, then confirm plan before coding
