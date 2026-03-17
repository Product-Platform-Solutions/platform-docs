---
slug: dev-journal-2026-03-02
title: Day 7: Building the Intelligence Pipeline for Doc-Engine
authors: [ananga]
tags:
  - github
  - groq
  - doc-engine
  - confluence
  - https
  - github-actions
  - automation
date: 2026-03-02
---
I just spent the last 12 hours building the intelligence pipeline for doc-engine, and I'm still reeling from the sheer complexity of it all - but the moment the first full sync to Confluence worked, all the struggle became worth it.
<!-- truncate -->
Today was one of those days where I bit off more than I could chew, but somehow managed to swallow it all. The goal was ambitious: build an intelligence pipeline for doc-engine that could analyze every git push, determine which docs need updating, and then sync those changes to Confluence. Easy to say, not so easy to do.

I started the day by creating a new component called analyzer.js. This script uses the Groq API to analyze the commit history and figure out which documents have been modified. I chose Groq because of its ability to handle complex queries and its scalability. The script itself is relatively simple - it makes a POST request to the Groq API with the commit data and then parses the response to determine which documents need updating. However, getting the Groq API to work seamlessly with my existing codebase took a few hours of debugging. I had to wrestle with authentication issues and figure out the correct query parameters to pass to the API.

Once analyzer.js was working, I moved on to creating roadmap-sync.js. This script reads the roadmap.md file and checks off completed tasks based on the commit evidence. The idea is to have the system understand what's been completed and reflect that in the roadmap. This script was a bit trickier to implement, as I had to parse the Markdown file and update the checkboxes accordingly. I used a combination of Regex and string manipulation to achieve this. It wasn't the most elegant solution, but it worked.

The next component I built was confluence-sync.js. This script walks the entire platform-docs tree and mirrors everything to Confluence. I used the Confluence API to create and update pages, and had to handle errors and edge cases along the way. One of the biggest challenges was figuring out how to handle page hierarchies - Confluence has a quirky way of handling parent-child page relationships, and I had to write custom logic to handle this.

With all three components built, I rewrote webhook.js to run the full intelligence pipeline on every push. This script now calls analyzer.js to determine which documents need updating, applies the updates, syncs the roadmap, and then does an incremental Confluence sync for changed files. I also added a new endpoint, /trigger/sync, which allows me to trigger a full Confluence sync on demand. This was a lot of work, but it's a crucial part of the doc-engine architecture.

As I was building these components, I was also rebuilding publishers/index.js to fan out to both GitHub and Confluence simultaneously. This script now handles the publication of documents to both platforms, and ensures that the Confluence sync is triggered after every publication.

The first full sync to Confluence was a tense moment. I had tested each component individually, but I had no idea if they would all work together seamlessly. I triggered the sync and waited. And waited. And then, suddenly, I saw the documents start to appear in Confluence. 35 out of 36 files were successfully synced - the one failure was due to a Confluence quirk where a page can't be set as its own parent page. I was a bit frustrated by this, but it was a minor setback.

As I reflected on the day's work, I realized that what I'm building with doc-engine is more than just an auto-generating documentation tool. It's a system that understands what changed and updates the right docs automatically. This is what separates doc-engine from every other tool in the market. It's not just about generating content - it's about having a sentient documentation system that can adapt to changing requirements.

I took a brief detour to fix some issues with the journal prompt and express.json middleware. I committed these changes to the doc-engine repository, along with some other minor fixes. It was a small distraction from the main task at hand, but it was necessary to keep the codebase tidy.

As I look back on the day's work, I'm proud of what I've accomplished. The intelligence pipeline is a complex beast, but it's a crucial part of the doc-engine architecture. Tomorrow, I'll continue to refine and debug the system, but for now, I'm just going to bask in the glow of a job well done. The question now is - how do I take this system to the next level and make it even more intelligent? That's a challenge for another day.