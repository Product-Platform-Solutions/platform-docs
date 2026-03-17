---
slug: dev-journal-2026-03-17
title: Day 14: Taming the Doc Engine Beast
authors: [ananga]
tags: [github, doc-engine, docusaurus, journal]
date: 2026-03-17
---
I spent most of today wrestling with the doc engine, trying to get it to behave and produce the kind of journal entries I need, and I'm still not entirely sure I've tamed the beast. 
<!-- truncate -->
The day started innocently enough. I had a clear plan: fix the sanitize tag normalization filter, title quoting in prompt, and make sure the day number override was working correctly. Simple enough, right? I dove into the code, navigated to the relevant parts of the doc-engine repository, and started making changes. The first commit, `fix: sanitize tag normalization filter, title quoting in prompt [doc-engine]`, was straightforward. I updated the `sanitizeTag` function to properly handle quotes in titles and made sure the filter was correctly applied. I committed the change, pushed it to GitHub, and waited for the automated tests to run.

But as I worked on the next task, things started to get complicated. The `day number override` feature was proving to be more difficult than I expected. I wanted to allow users to manually set the day number for a journal entry, rather than relying on the automatic incrementing system. Sounds simple, but it required some significant changes to the underlying logic. I spent a good chunk of time refactoring the code, updating the `dayNumber` variable to be a `let` instead of a `const`, and adding the necessary checks to handle the override. The commit, `feat: day number override, backfill Days 4-11, fix const->let dayNumber [doc-engine]`, was a significant one, and I was relieved when the tests passed.

Just as I was about to take a break, I noticed that the journal prompt was still not quite right. The title format was off, the date field was missing, and the truncate placement was incorrect. I sighed and dove back into the code. This time, I had to update the `journalPrompt` function to fix the title format, add the date field, and move the truncate placement to the correct spot. The commit, `fix: journal prompt — title format, date field, truncate placement, tag list [doc-engine]`, was a bit of a mess, with multiple changes and updates. But I was determined to get it just right.

As the day wore on, I encountered more and more issues. The `express.json` middleware was not working as expected, and I had to update the `llama-3.3-70b` model to fix the problem. The commit, `fix: express.json middleware, journal narrative prompt, llama-3.3-70b model [doc-engine]`, was a bit of a hack, but it got the job done. I was starting to feel like I was fighting a losing battle, with each fix introducing new problems.

Despite the frustrations, I persevered. I took breaks, grabbed some coffee, and came back to the code with fresh eyes. And slowly but surely, things started to come together. The journal entries were looking better, the title formats were correct, and the day number override was working as expected.

But just as I thought I was done, I noticed that the markdown tags were not being sanitized correctly. I groaned and added another task to my list. The commit, `fix: sanitizeMarkdown tag normalization, title quoting, day number override [doc-engine]`, was a bit of a repeat, but I was determined to get it right.

As the day drew to a close, I took a step back and evaluated my progress. The doc engine was still a bit temperamental, but it was working better than it had in weeks. I had fixed a ton of issues, and the journal entries were starting to look like I wanted them to. It wasn't perfect, but it was a start.

So what's next? I still need to tackle the automated testing for the doc engine, and I want to add some more features to make it easier to use. I also need to take a closer look at the `docusaurus` configuration and make sure it's working as expected. And then there's the issue of integrating the doc engine with the rest of the Product Platform Solutions platform... But for now, I'm just going to take a deep breath, pour myself a cup of coffee, and enjoy the small victory of having made it through another day of debugging and coding. The doc engine may still be a beast, but I'm starting to feel like I'm gaining the upper hand.