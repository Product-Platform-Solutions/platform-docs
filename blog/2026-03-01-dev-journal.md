---
slug: dev-journal-2026-03-17
title: Day 7: The Intelligence Pipeline That Almost Worked
authors: [ananga]
tags:
  - github
  - groq
  - setup
  - react
  - auto-tracker
  - n8n
  - groq
  - github-actions
  - automation
  - doc-engine
  - journal
  - iam-platform
  - ai-debug-agent
  - platform-docs
  - incident
  - confluence
  - docusaurus
  - docker
  - nginx
  - pm2
  - oauth
---
I spent the entire day building the intelligence pipeline for the doc-engine, and while it mostly works, the one failure that's still haunting me is the fact that index.md can't set itself as its own parent page on Confluence - a quirk that has me questioning the very fabric of our documentation system.
<!-- truncate -->
I started the day with a clear goal in mind: building the intelligence pipeline for the doc-engine. This involved adding three new components: analyzer.js, roadmap-sync.js, and confluence-sync.js. The analyzer.js component would call Groq to analyze every git push and determine which docs need updating. The roadmap-sync.js component would read roadmap.md and tick completed checkboxes based on commit evidence. And the confluence-sync.js component would walk the entire platform-docs tree and mirror everything to Confluence.

I began by working on the analyzer.js component. I spent a few hours writing the code and testing it with various git push scenarios. I was using the Groq API to analyze the commits and determine which docs needed updating. The API was straightforward to use, but I did run into some issues with authentication. I had to spend some time figuring out how to pass the authentication token correctly. Once I got that working, I moved on to the roadmap-sync.js component.

The roadmap-sync.js component was relatively straightforward to implement. I used the fs module to read the roadmap.md file and parse it using a markdown parser. I then used the commit history to determine which checkboxes should be ticked. I spent some time debugging the code, but eventually, I got it working as expected.

The confluence-sync.js component was the most challenging part of the day. I had to use the Confluence API to create and update pages. The API was complex, and I had to spend some time reading the documentation to figure out how to use it correctly. I also had to handle errors and exceptions, which added to the complexity of the code. After several hours of work, I finally got the confluence-sync.js component working.

With all three components working, I rewrote the webhook.js file to run the full intelligence pipeline on every push. This involved calling the analyzer.js component to determine which docs needed updating, applying the doc updates, syncing the roadmap, and performing an incremental Confluence sync for changed files. I also added a new endpoint, /trigger/sync, which would trigger a full Confluence sync on demand.

As I was testing the new pipeline, I ran into an issue with the publishers/index.js file. It was only publishing to GitHub, but I needed it to publish to both GitHub and Confluence simultaneously. I spent some time rewriting the code to fan out to both platforms.

Finally, after hours of work, I was ready to run the first full sync. I triggered the /trigger/sync endpoint and waited anxiously for the results. The sync process took several minutes to complete, but eventually, I saw the results. Out of 36 files, 35 had been successfully pushed to Confluence. The one failure was index.md, which was trying to set itself as its own parent page. I was confused and frustrated by this error, as I didn't understand why it was happening.

After some research, I discovered that this was a quirk of Confluence. If the section parent page title matched a child page title, Confluence would prevent the child page from being created. I was surprised by this behavior, as it seemed counterintuitive. I made a mental note to look into this further and find a workaround.

As I reflected on the day's work, I realized that building the intelligence pipeline was just the first step. The real challenge was going to be making the system understand what changed and updating the right docs automatically. This was what I meant by "sentient documentation." It wasn't just about auto-generating content; it was about creating a system that could understand the context and make intelligent decisions.

I also took a look at the GitHub activity for the day. I had made a few commits to the doc-engine repository, including a fix for the journal prompt and a fix for the express.json middleware. These were minor issues, but they were important for getting the pipeline working correctly.

As I wrap up this journal entry, I'm left with more questions than answers. How can I work around the Confluence quirk that's preventing index.md from being created? How can I make the system more intelligent and able to understand the context of the changes? These are the questions that I'll be exploring in the coming days. For now, I'm just relieved that the pipeline is mostly working, and I can start to see the potential of sentient documentation.