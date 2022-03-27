# cryptid-solver

Quick and dirty solver for a board game Cryptid.

It checks the initial board state and tries to provide all the possible valid locations from combination of clues. User can provide specific clues in order to refine the results.

## Notes

The main script file is total mess, horrible spaghetti code at its current state. I may clean it up a bit at some point.

There's also a bug when using advanced rules. The app may return obviously invalid locations as valid locations.
