---
slug: dev-journal-2026-03-03
title: "Day 9: When Atlassian Auth Got in the Way"
authors: [ananga]
tags: [github, confluence, atlassian, oauth, api]
date: 2026-03-03
---
Today was supposed to be a smooth ride, getting the journal publishing on Confluence figured out, but it turned into a battle with Atlassian's auth system that I didn't see coming.
<!-- truncate -->
I started the day feeling pretty optimistic, knowing that the journal publishing issue was just a matter of switching to the Confluence Blog Posts API. I had been putting it off for a while, but with the Day 9 journal entry ready to go, it was time to tackle it head-on. The problem was that the journals were being published as regular Confluence pages under a Dev Journal section instead of as native blog posts. This was not only affecting the URL structure but also how they were being indexed and displayed on the site.

I dove into the API documentation, looking for the right endpoint to use. After some digging, I found that I needed to use the `content` endpoint with the `type` parameter set to `blogpost` instead of `page`. Sounds simple enough, right? I updated the API call, and to my surprise, it worked like a charm. The new journal entry was published as a native blog post, with a proper URL under `/wiki/spaces/PPS/blog/` instead of `/pages/`. I was thrilled to see it working, but I knew I wasn't out of the woods yet.

The next challenge was to tackle the existing journal entries (Days 1-8) that were still sitting as regular pages. I needed to find a way to convert them to blog posts without having to manually update each one. I started by trying to audit the Confluence space using the REST API to find all the stale pages. I figured I could use the API to fetch a list of all pages, filter out the ones that were already blog posts, and then update the rest. Easy peasy, right?

Well, things didn't quite go as planned. As soon as I sent the API request, I was hit with a 403 Unauthorized error. My personal API token was being rejected, and I had no idea why. I checked the documentation, and it said that the token should have the necessary permissions to access the API. I tried again, thinking it might have been a one-time issue, but the same error kept popping up.

It wasn't until I checked my account settings that I realized what was going on. My account was flagged as an External User in Atlassian, which restricts REST API access. I was confused - I could access the Confluence space just fine through the browser, but the API was a no-go. I tried creating a new API token, thinking maybe it was just a token issue, but that didn't work either.

At this point, I was getting frustrated. I needed to find a way to get around this restriction, so I decided to try creating a service account. I went through the full Atlassian admin flow, creating a new user, assigning the necessary permissions, and generating a new API token. But, as I soon found out, service account scoped tokens use OAuth 2.0 client credentials flow, not Basic auth. This meant I couldn't use them without implementing a full OAuth token exchange mechanism.

I was taken aback. I hadn't anticipated this level of complexity, and I certainly didn't have the time to implement a full OAuth flow. I decided to commit what was working (the new journal publishing API call) and defer the OAuth implementation to Phase 2.3 on the roadmap. It wasn't ideal, but it was the best I could do given the circumstances.

As I took a step back to reflect on the day's events, I realized that I had underestimated the complexity of the Atlassian auth system. I had been so focused on getting the journal publishing working that I hadn't considered the potential roadblocks. But, despite the setbacks, I had still managed to make progress. The new journal publishing API call was working, and I had a clear plan for how to tackle the existing journal entries.

I also made some progress on the doc-engine side, committing a few fixes to the journal prompt and express.json middleware. It wasn't directly related to the Confluence publishing issue, but it was still important work that needed to be done.

As I wrapped up the day, I couldn't help but feel a sense of accomplishment. It hadn't been an easy day, but I had persevered and found a way to make progress despite the obstacles. And, as I looked ahead to tomorrow, I knew that I would be ready to tackle whatever challenges came my way.

The question now is, how will I tackle the existing journal entries? Will I find a way to automate the process, or will I have to manually update each one? And what about the OAuth implementation - will it be as complicated as I think it will be? Only time will tell, but for now, I'm just going to take a deep breath and get ready for whatever comes next.
