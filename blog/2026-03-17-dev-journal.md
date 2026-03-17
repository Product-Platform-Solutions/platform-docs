---
slug: dev-journal-2026-03-17
title: "Day 13: Refactoring the Docs Engine and Resurrecting the Journal"
authors: [ananga]
tags: [- github, keycloak, setup, aws, traefik, https, react, auto-tracker, n8n, groq, github-actions, automation, doc-engine, journal, iam-platform, ai-debug-agent, platform-docs, incident, mfa, scim, ldap, confluence, docusaurus, docker, nginx, pm2, oauth, cloudflare, atlassian]
---
I began the day with a daunting task: a major quality and completeness session for the docs project, and it quickly became apparent that my journal quality was in dire need of a overhaul. As I reviewed the live docs site via Cloudflare tunnel, I realized that my Day 11 entry read like a bullet point status report, lacking the narrative depth I strived for. 
<!-- truncate -->
I decided to start by rewriting the journal Groq prompt completely. I switched from a structured bullet format to a full narrative of 800-1200 words, hoping to capture the messy details and unexpected moments that make for a compelling story. I also upgraded the model from llama-3.1-8b-instant to llama-3.3-70b-versatile, which promised to bring more nuance and versatility to the generated text. Additionally, I added a day number override parameter to ensure that backfilling would work correctly.

As I delved deeper into the code, I stumbled upon a frustrating issue: the root cause of journals being skipped. After some debugging, I discovered that the express.json() middleware was missing from index.js, causing all manual API request bodies to be silently dropped. It was a trivial fix, but one that had been eluding me for far too long. I added the middleware and watched as the journals began to populate correctly.

Next, I turned my attention to the frontmatter issues that had been plaguing me. I corrected the truncate placement, moving it immediately after the hook sentence, and updated the title to include the Day N with a punchy description in quotes. I also added a date field and implemented tag normalization in the sanitizeMarkdown function to sanitize the tags.

With the technical issues resolved, I embarked on the daunting task of backfilling all the missing journal days: Days 4, 5, 7, 8, 9, 10, and 11. I relied on my memory and transcript context to recreate the events of each day, aiming to capture the struggles, decisions, and wins that had occurred. It was a painstaking process, but one that ultimately yielded a cohesive and detailed narrative.

However, my progress was soon hindered by a series of build failures. I encountered issues with multiline YAML tags, which were rejected by Docusaurus. To resolve this, I created a python3 inline conversion script and applied it to all 8 files, converting the tags to an inline array format. I also encountered problems with unquoted titles containing colons, which broke YAML parsing. A quick sed script across all files resolved this issue.

Furthermore, I discovered a duplicate aws key in tags.yml, which prompted me to rewrite the entire file cleanly. I took this opportunity to add missing tags, including docusaurus, api, domain, ec2, cloudflare, atlassian, confluence, docker, nginx, pm2, and oauth. With the tags normalized and the files updated, the build finally turned green.

As the day drew to a close, I reflected on the progress I had made. The blog now displayed all 12 days in order, with proper titles, hook sentences, and truncate placement. The sanitizeMarkdown function had been updated to automatically convert multiline tags to an inline array format, preventing future build failures. It had been a long and arduous day, but the sense of accomplishment I felt made it all worthwhile.

In reviewing my GitHub activity, I noticed that I had committed several fixes and features to the doc-engine repository. These included sanitizing markdown tags, normalizing titles, and adding a day number override. I also updated the journal prompt to reflect the new title format, date field, and truncate placement.

As I look to the next day, I am aware that there are still many challenges to overcome. I need to continue refining the docs engine, ensuring that it is robust and reliable. I also need to maintain the journal, using it as a tool to reflect on my progress and identify areas for improvement. With the technical issues resolved and the narrative in place, I am confident that I can make significant strides in the days to come. The question now is: what will tomorrow bring, and how will I rise to meet the challenges that lie ahead?