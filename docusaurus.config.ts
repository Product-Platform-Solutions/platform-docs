import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Product Platform Solutions',
  tagline: 'Enterprise IAM Platform — Built Open Source, Zero Cost',
  favicon: 'img/favicon.ico',
  url: 'https://docs.3.25.125.195.sslip.io',
  baseUrl: '/',
  organizationName: 'Product-Platform-Solutions',
  projectName: 'platform-docs',
  onBrokenLinks: 'warn',
  markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Product-Platform-Solutions/platform-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Development Journal',
          blogDescription: 'Automated daily development journal',
          editUrl: 'https://github.com/Product-Platform-Solutions/platform-docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'PPS Platform',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Dev Journal', position: 'left'},
        {
          href: 'https://github.com/Product-Platform-Solutions',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {label: 'IAM Platform', href: 'https://github.com/Product-Platform-Solutions/iam-platform'},
            {label: 'Auto Tracker', href: 'https://github.com/Product-Platform-Solutions/auto-tracker'},
            {label: 'AI Debug Agent', href: 'https://github.com/Product-Platform-Solutions/ai-debug-agent'},
          ],
        },
        {
          title: 'Platform',
          items: [
            {label: 'App', href: 'https://app.3.25.125.195.sslip.io'},
            {label: 'Keycloak', href: 'https://keycloak.3.25.125.195.sslip.io'},
            {label: 'n8n', href: 'https://n8n.3.25.125.195.sslip.io'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Product Platform Solutions. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
