---
slug: dev-journal-2026-03-01
title: "Day 5: Expanding Publishing Capabilities"
authors: [ananga]
tags: [confluence, doc-engine, github, docusaurus]
---

Today, I expanded the publishing capabilities of our doc-engine to include Confluence Cloud as a second destination, alongside our existing Docusaurus site.

<!-- truncate -->

## What We Did

I started by building a Confluence publisher, which involved creating a markdown to Confluence storage format converter in `confluence.js`. This converter enables our doc-engine to transform markdown content into a format compatible with Confluence. Next, I updated `publisher/index.js` to fan out to all destinations simultaneously, allowing us to publish content to both Docusaurus and Confluence at the same time.

### Accomplished
- Built `confluence.js` publisher with markdown to Confluence storage format converter
- Updated `publisher/index.js` to support multiple publication destinations
- Configured Confluence Cloud as a second publication destination
- Updated all writers to use `publishAll` instead of `publishDoc` directly
- Added Confluence environment variables to `.env` file

### Key Decisions
- Chose to use Confluence Cloud as a secondary publication destination to provide an alternative platform for our documentation
- Decided to update the `publisher/index.js` to support multiple destinations, rather than creating a separate publisher for Confluence, to maintain a unified publishing process

### Issues Encountered
- Initially, the converter in `confluence.js` had issues with formatting, but resolving this required careful review of the Confluence API documentation and adjustments to the converter logic
- The `CONFLUENCE_API_TOKEN` had to be regenerated due to permissions issues, which caused a brief delay in testing

### Next Session
- Integrate a new automation workflow using GitHub Actions to streamline documentation updates
- Explore using Groq for AI-powered content suggestions in our documentation pipeline