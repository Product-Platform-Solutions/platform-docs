---
slug: dev-journal-2026-03-02
title: Day 8: The IP Address Migration Nightmare
authors: [ananga]
tags:
  - github
  - keycloak
  - setup
  - aws
  - traefik
  - https
  - docker
  - nginx
date: 2026-03-02
---
I just spent the entire day dealing with the aftermath of a simple EC2 instance restart, a painful IP address migration that broke everything from SSH to GitHub webhooks. 
<!-- truncate -->
I started my day like any other, with a steaming cup of coffee and a quick scan of my to-do list. But little did I know, I was in for a wild ride. I had stopped my EC2 t3.micro instance the night before, and when I started it up again, I noticed something was off. The public IP address had changed - it had gone from 3.25.125.195 to 3.26.241.107. At first, I thought it was no big deal, but as I started trying to access my server, I realized that this small change had broken almost everything.

My first hint of trouble was when I tried to SSH into the server. The connection refused, and I was greeted with a "Permission denied" error message. I tried a few different approaches, thinking maybe it was just a minor issue with my SSH config, but nothing seemed to work. That's when I realized that the IP address change had also affected my GitHub webhooks. I had five different repositories set up with webhooks pointing to the old IP address, and now they were all broken.

I knew I had to update the webhooks, but before I could do that, I had to update the Traefik routing configuration. I had hardcoded the old IP address in the labels for keycloak, frontend, and n8n, so I needed to update those first. I fired up my text editor and started searching for the old IP address in my docker-compose.yml file. It took a few minutes to update all the necessary labels, but eventually, I had everything pointing to the new IP address.

But that was just the beginning. I still had to update the platform-docs context.md file, which had the old IP address hardcoded in it. And to make matters worse, I had also hardcoded the old IP address in my GitHub secret SERVER_HOST, which was used by my Actions workflow to deploy changes to the server. I was starting to feel like I was playing a game of whack-a-mole, where every time I fixed one issue, another one would pop up.

As I was updating all these different configurations, I realized that I had made a critical mistake. I had been running my server without an Elastic IP, which meant that the public IP address would change every time the instance was stopped or started. I had heard of Elastic IPs before, but I had never thought it was a big deal. After all, how often do you really need to stop and start an EC2 instance? But now, I was faced with the consequences of my actions.

I decided to allocate an Elastic IP, which would give me a permanent IP address that would survive stop/start cycles. I went to the AWS dashboard and requested a new Elastic IP, which was assigned to me as 15.134.72.92. But before I could associate it with my instance, I had to update all the configurations again to point to the new Elastic IP. I used sed to replace all occurrences of the old IP addresses with the new one, which saved me a lot of time and effort.

As I was waiting for the Elastic IP to be associated with my instance, I decided to recreate the iam-docs container, which had the old IP address in its Traefik labels. But I had to wait for docker-compose to come up first, so the iam-network existed. It was one of those moments where you feel like you're stuck in limbo, waiting for one thing to finish before you can move on to the next.

Finally, after what felt like an eternity, the Elastic IP was associated with my instance, and I was able to update all the configurations to point to the new IP address. I ran sed across all the config files to replace both old IPs with the new one, and slowly but surely, things started to come back online. The GitHub webhooks were working again, Traefik routing was fixed, and the docs site was back up. It was a huge relief, and I felt like I had finally climbed out of the rabbit hole.

As I looked back on the day's events, I realized that I had learned a valuable lesson. Never run a server without an Elastic IP. The 15 minutes it takes to allocate one can save hours of work every time the instance restarts. It's one of those things that seems like a minor detail, but it can make all the difference in the world.

I also took a moment to review my GitHub activity for the day. I had made a few commits to the doc-engine repository, including a fix for the journal prompt and a fix for the express.json middleware. It was a small consolation after the chaos of the day, but it was a reminder that even in the midst of debugging and fixing issues, there is always room for improvement and iteration.

As I closed my laptop and called it a day, I couldn't help but feel a sense of accomplishment. I had faced a difficult challenge and had come out on top. And as I looked forward to the next day, I knew that I would be better prepared to tackle whatever issues came my way. The question on my mind now was, what other potential issues was I not seeing, and how could I proactively prevent them from becoming major problems? Only time would tell, but for now, I was just grateful to have made it through the day with my sanity intact.