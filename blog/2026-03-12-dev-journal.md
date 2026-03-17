---
slug: dev-journal-2026-03-12
title: Day 10: Breaking Out of the IP Address Jail
authors: [ananga]
tags:
  - github
  - cloudflare
  - traefik
  - https
  - docker
  - nginx
  - pm2
  - domain
date: 2026-03-12
---
I spent the entire day trying to break the docs site out of its IP address jail, and I finally have a solution that doesn't make me cringe, even if it's not perfect.
<!-- truncate -->
I started the day knowing that our docs site, hosted on an IP address like docs.15.134.72.92.sslip.io, wasn't going to cut it for public accessibility. Claude, our AI assistant, couldn't fetch it, Google wouldn't index it, and let's be honest, sharing such a URL with anyone outside our team sounds like a joke. I needed a more conventional, user-friendly domain name to make our platform and its documentation accessible to the world. 

First things first, I thought about trying to get a subdomain from is-a.dev, which offers free domains to developers. I figured, why not? It's free, and it sounds cool. So, I submitted a PR to get product-platform-solutions.is-a.dev approved. However, my excitement was short-lived. The PR got rejected because our project isn't personal enough; they're looking for personal developer portfolio sites, not platform products. I wasn't entirely surprised, given the nature of our project, but it was still a bit of a letdown.

Undeterred, I moved on to my next option: Cloudflare Tunnel. I'd heard great things about how it can expose your local web server to the internet securely and easily. I installed cloudflared on our server, ran `cloudflared tunnel login`, and was promptly stopped by the authorization page, which requires you to have a domain already set up in Cloudflare to create a named tunnel. Well, that was a problem since the whole point of this exercise was to get a domain or at least a human-readable URL.

Not one to give up easily, I decided to fall back to the quick tunnel option: `cloudflared tunnel --url http://localhost:80`. This got me a URL, but then I hit another snag - a redirect loop. It turned out that the Cloudflare tunnel uses HTTPS, and our Traefik setup was configured to redirect HTTP to HTTPS, creating an infinite loop of redirects. I scratched my head for a bit, trying to figure out how to break this cycle.

The solution wasn't elegant, but it worked. I exposed the iam-docs nginx container directly on host port 8080, essentially bypassing Traefik altogether. Then, I pointed the Cloudflare tunnel to `localhost:8080`. It was a bit of a hack, but suddenly, our docs site was accessible at a URL like compound-formation-repair-allied.trycloudflare.com. The URL is ugly and changes on restart, but at least it's not an IP address, and people can actually access our documentation now.

To ensure the tunnel remains active even after a server reboot, I set it up to run under PM2. It's not the most stable setup, but it's a temporary solution until we can figure out our domain situation.

Speaking of domains, we had a long discussion about our options. It turns out that Porkbun is the cheapest place to buy a `.dev` domain at $9.73 per year, followed closely by Cloudflare Registrar. GoDaddy, on the other hand, is cheaper for the first year but then significantly more expensive upon renewal. The decision was made to use the temporary Cloudflare Tunnel for now and buy a real domain when the doc-engine is ready to go public as a product. It makes sense; there's no point in investing in a domain until we're sure about our branding and product name.

On the GitHub front, I had a couple of commits to the doc-engine repository. One was to fix the journal prompt, ensuring it adheres to our title format, date field, and truncate placement guidelines. The other was to fix the express.json middleware and update the journal narrative prompt to work with the new llama-3.3-70b model. These were minor tweaks but necessary to keep our documentation engine running smoothly and our journal entries formatted correctly.

As the day comes to a close, I reflect on what we've achieved. It wasn't a straightforward day, and I've got a few battle scars from wrestling with Cloudflare Tunnel and Traefik. However, we've made progress, and our docs site is now accessible to the world, albeit through an uglier URL than I'd like. Tomorrow, we'll keep pushing forward, perhaps looking deeper into securing a proper domain and fine-tuning our setup for better performance and security.

What's next? Well, we need to finalize our domain decision and start thinking about how we're going to handle SSL certificates and HTTPS properly, without relying on temporary workarounds. We also need to document our current setup, so the next person (or my future self) doesn't have to go through the same trial and error process. And, of course, there's the ongoing work on the doc-engine itself, ensuring it's ready for prime time when we launch our platform. For now, though, I'm just happy that we've broken out of that IP address jail, and our docs are a little more accessible to the people who need them.