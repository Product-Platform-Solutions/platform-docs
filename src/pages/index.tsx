import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div style={{padding: '4rem', textAlign: 'center'}}>
      <h1>{siteConfig.title}</h1>
      <p style={{fontSize: '1.2rem'}}>{siteConfig.tagline}</p>
      <div style={{marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center'}}>
        <Link className="button button--primary button--lg" to="/docs/00-project-overview/vision-and-goals">
          📖 Documentation
        </Link>
        <Link className="button button--secondary button--lg" to="/blog">
          📓 Dev Journal
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <HomepageHeader />
      </main>
    </Layout>
  );
}
