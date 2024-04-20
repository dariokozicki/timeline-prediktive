# Prediktive Timeline

This is an assignment for Prediktive. It consists on a Timeline that, given a list of events with their date ranges, sorts them in rows such that they don't overlap each other (creates as many rows as necessary), and displays them between the ranges of the first and last cronological event.

You can zoom in and out to see the events better (this only makes the columns bigger, so there's no 'yearly' view for instance). You can also edit the titles inline (but this resets on refresh)

The drag-and-drop was tried but I figured it'd take much more time so it's not implemented.
The design is very simple on purpose since there wasn't a figma for reference, I used tailwindcss for most of the styling.

- How long you spent on the assignment:
  - ~6 hs
- What you like about your implementation
  - It scales with more or fewer events
- What you would change if you were going to do it again
  - I'd use grid instead of flexbox. If I was on a real project I'd use a library like primereact or fullcalendar that manages events.
- How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
  - I used google images to try and figure what you guys were looking for, since you used the word _compact_ I tried to have the timeline date range be as small as the events would let me, instead of a monthly thing. Also a full blown calendar seemed like overkill for this assignment.
- How you would test this if you had more time.
  - I'd use jest to create unit tests for the logic and snapshots for the visual aspect.
