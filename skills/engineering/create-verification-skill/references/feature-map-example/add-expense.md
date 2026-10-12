# Add an expense

A signed-in user records an expense with a name, an amount, and a date. It
appears at the top of the expense list and counts toward the month's total.

## Sub-features

- `ADD-1` Add from the web form.
- `ADD-2` Add from the CLI.
- `ADD-3` Reject an empty name or a non-positive amount.
- `ADD-4` The new expense survives a reload.

## How to get to it (user POV)

- Web: the **Add expense** button above the list on the home page.
- Web: keyboard shortcut `n` anywhere on the home page.
- CLI: `tally add "<name>" <amount>`.

## Driving it with the browser harness and the CLI

Preconditions: baseline state, signed in, doctor passing.

- **Open the form.** Click the button named `Add expense`. Observe a dialog
  titled `New expense`.
- **Fill and save.** Type `Lunch` into `Name` and `12.50` into `Amount`, then
  click `Save`. Observe the dialog close and a first list row reading
  `Lunch — $12.50`.
- **Check the total.** Observe the `This month` figure rise by `12.50`.
- **Reload.** Reload the page. Observe the `Lunch` row still first (`ADD-4`).
- **Reject bad input.** Reopen the form, leave `Name` empty, click `Save`.
  Observe the inline error `Name is required` and no new row (`ADD-3`).
- **CLI path.** Run `tally add "Taxi" 20`. Observe exit code 0 and
  `Added Taxi ($20.00)` on stdout, then a `Taxi` row in the web list (`ADD-2`).
- **Stored value.** Run `tally list --json` and confirm both new expenses with
  their amounts.

## Gotchas

- The shortcut `n` does nothing while a text field has focus.
- Amounts are entered in dollars but stored in cents; `12.5` and `12.50` are the
  same expense, so do not assert on the raw input string.
- The list is cached for five seconds. Wait for the new row instead of reading
  the list immediately after saving.
