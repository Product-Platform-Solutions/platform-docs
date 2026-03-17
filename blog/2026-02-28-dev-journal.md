---
slug: dev-journal-2026-02-28
title: Day 13: Taming the Doc Engine Beast
authors: [ananga]
tags:
  - github
  - groq
  - doc-engine
  - docusaurus
  - github-actions
date: 2026-02-28
---

As I sat down at my desk, I knew I had a long day ahead of me - I was determined to get the doc-engine up and running, and I wasn't leaving until it was writing journals like a pro. 
<!-- truncate -->
I'd been thinking about this day for weeks, ever since I first conceived of the idea for a self-writing documentation system. The goal was ambitious: build a service that could auto-generate journals, changelogs, and incident reports from GitHub activity. I'd started by reading through the context, vision, and roadmap files from the docs site, trying to get a sense of what I needed to build. But today was the day I'd finally start coding.

I started by setting up a new Node.js project and installing the necessary dependencies. I knew I'd need a webhook trigger to listen to GitHub push events, a cron scheduler to fire daily at 23:55 UTC to write the journal, and some manual REST API endpoints for triggering writes. I also wanted to integrate with the ai-debug-agent for incident reports, and use the Groq API to generate the actual markdown content. Easy enough, right?

The first few hours were a blur of coding and debugging. I got the webhook trigger set up and tested, and then moved on to implementing the cron scheduler. But as I was testing the scheduler, I realized that I had a problem - port 3001 was already taken by the auto-tracker service. I grumbled to myself as I changed the port to 3002, wondering why I hadn't checked for conflicts earlier.

As I continued to code, I encountered another issue - the Groq model I was using, llama3-70b, was deprecated. I spent a frustrating hour trying to figure out why my API calls were failing, before finally discovering the problem and switching to the newer llama-3.3-70b-versatile model. It was a small setback, but it was starting to get under my skin.

Despite the setbacks, I pushed on, determined to get the doc-engine working. I implemented the manual REST API endpoints and integrated with the ai-debug-agent, and then started testing the system end-to-end. But as I was testing, I realized that I'd made another mistake - I was committing to the wrong branch. Instead of committing to the develop branch, I was committing to main. I face-palmed, wondering how I could have been so careless.

As I fixed the branch issue, I also noticed that the frontmatter tags format was off. Instead of writing a YAML array, Groq was writing a string. I spent some time debugging the issue, and eventually figured out that I needed to modify the Groq API call to return the tags in the correct format.

Just when I thought I was making progress, I encountered another issue - the journal was being written to the wrong directory. Instead of being written to the blog/ directory, it was being written to the docs/ directory. I cursed my luck, wondering why this was happening. But as I dug deeper, I realized that it was a simple configuration issue - I just needed to update the GitHub API commit to write to the correct directory.

As the day wore on, I continued to debug and fix issues. I added a session_notes field to the journal trigger, so that conversation-based content could drive the journal instead of just GitHub commits. And I modified the day numbering to be sequential, instead of date-based. It was a small change, but it made a big difference in how the journal looked and felt.

Finally, after hours of coding and debugging, I got the first automated journal entry published successfully. It was a small victory, but it felt amazing. I'd tamed the doc-engine beast, and it was now writing journals like a pro.

As I looked back on the day's work, I realized that it had been a wild ride. I'd encountered countless setbacks and issues, but I'd persevered and pushed through. And in the end, it had all been worth it - the doc-engine was up and running, and it was going to make my life so much easier.

But as I packed up my things and headed home, I couldn't help but wonder what the next day would bring. Would the doc-engine continue to run smoothly, or would I encounter new issues and challenges? Only time would tell, but for now, I was just happy to have made it through the day with my sanity intact.

As I drifted off to sleep that night, I couldn't help but feel a sense of pride and accomplishment. I'd built something truly amazing, and it was going to change the way I worked forever. The doc-engine was more than just a tool - it was a game-changer. And I couldn't wait to see what the future held. 

The next day would bring new challenges, but for now, I was just going to bask in the glory of a job well done. The doc-engine was alive, and it was going to make my life so much easier. Bring on the next challenge, I'm ready.