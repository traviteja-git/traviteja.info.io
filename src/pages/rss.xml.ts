import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog'))
    .filter(p => !p.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const site = context.site?.toString().replace(/\/$/, '') ?? 'https://traviteja.com';

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${site}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${site}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Raviteja Tholupunoori</title>
    <description>Data engineering, AI, and cloud architecture — by Raviteja Tholupunoori, Apache Airflow Champion at Deloitte.</description>
    <link>${site}/</link>
    <language>en-us</language>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
