// Declarative virtual filesystem tree
// Each node is either a directory (children object) or a file (content string key)
// File content keys map to generators in src/data/index.ts

export interface FSNode {
  type: 'file' | 'dir';
  children?: Record<string, FSNode>;
  content?: string; // key into content registry
  permissions?: string;
  size?: string;
  modified?: string;
}

export const fsTree: Record<string, FSNode> = {
  '/': {
    type: 'dir',
    children: {
      home: {
        type: 'dir',
        children: {
          solomon: {
            type: 'dir',
            children: {
              '.bashrc': {
                type: 'file',
                content: 'dotfile:bashrc',
                permissions: '-rw-r--r--',
                size: '1.2K',
                modified: 'Jan 05 2025',
              },
              '.plan': {
                type: 'file',
                content: 'dotfile:plan',
                permissions: '-rw-r--r--',
                size: '0.3K',
                modified: 'Dec 20 2024',
              },
              '.secrets': {
                type: 'file',
                content: 'dotfile:secrets',
                permissions: '-rw-------',
                size: '0.1K',
                modified: 'Jan 01 2025',
              },
              '.ssh': {
                type: 'dir',
                children: {
                  'authorized_keys': {
                    type: 'file',
                    content: 'dotfile:ssh-authorized-keys',
                    permissions: '-rw-------',
                    size: '0.4K',
                    modified: 'Nov 15 2024',
                  },
                  'config': {
                    type: 'file',
                    content: 'dotfile:ssh-config',
                    permissions: '-rw-------',
                    size: '0.6K',
                    modified: 'Jan 10 2025',
                  },
                },
              },
              'about.md': {
                type: 'file',
                content: 'about',
                permissions: '-rw-r--r--',
                size: '2.1K',
                modified: 'Jan 15 2025',
              },
              'socials.md': {
                type: 'file',
                content: 'socials',
                permissions: '-rw-r--r--',
                size: '0.5K',
                modified: 'Feb 01 2025',
              },
              'resume.pdf': {
                type: 'file',
                content: 'resume',
                permissions: '-rw-r--r--',
                size: '142K',
                modified: 'Dec 01 2024',
              },
              projects: {
                type: 'dir',
                children: {
                  'termfolio.md': {
                    type: 'file',
                    content: 'project:termfolio',
                    permissions: '-rw-r--r--',
                    size: '1.8K',
                    modified: 'Jan 28 2025',
                  },
                  'homelab.md': {
                    type: 'file',
                    content: 'project:homelab',
                    permissions: '-rw-r--r--',
                    size: '2.4K',
                    modified: 'Nov 10 2024',
                  },
                  'solomonneas-dev.md': {
                    type: 'file',
                    content: 'project:solomonneas-dev',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Oct 22 2024',
                  },
                },
              },
              experience: {
                type: 'dir',
                children: {
                  'README.md': {
                    type: 'file',
                    content: 'experience',
                    permissions: '-rw-r--r--',
                    size: '3.2K',
                    modified: 'Jan 10 2025',
                  },
                },
              },
              education: {
                type: 'dir',
                children: {
                  'README.md': {
                    type: 'file',
                    content: 'education',
                    permissions: '-rw-r--r--',
                    size: '1.1K',
                    modified: 'Sep 01 2024',
                  },
                },
              },
              blog: {
                type: 'dir',
                children: {
                  'hello-world.md': {
                    type: 'file',
                    content: 'blog:hello-world',
                    permissions: '-rw-r--r--',
                    size: '0.8K',
                    modified: 'Jan 30 2025',
                  },
                  'why-terminal-portfolio.md': {
                    type: 'file',
                    content: 'blog:why-terminal-portfolio',
                    permissions: '-rw-r--r--',
                    size: '1.2K',
                    modified: 'Jan 31 2025',
                  },
                  'homelab-journey.md': {
                    type: 'file',
                    content: 'blog:homelab-journey',
                    permissions: '-rw-r--r--',
                    size: '1.5K',
                    modified: 'Feb 12 2025',
                  },
                },
              },
              certifications: {
                type: 'dir',
                children: {
                  'README.md': {
                    type: 'file',
                    content: 'certifications',
                    permissions: '-rw-r--r--',
                    size: '0.4K',
                    modified: 'Jan 20 2025',
                  },
                },
              },
            },
          },
        },
      },
      var: {
        type: 'dir',
        children: {
          log: {
            type: 'dir',
            children: {
              'auth.log': {
                type: 'file',
                content: 'auth-log',
                permissions: '-rw-r-----',
                size: '4.7K',
                modified: 'Jan 31 2025',
              },
            },
          },
        },
      },
      usr: {
        type: 'dir',
        children: {
          bin: {
            type: 'dir',
            children: {},
          },
        },
      },
      etc: {
        type: 'dir',
        children: {
          hostname: {
            type: 'file',
            content: 'hostname',
            permissions: '-rw-r--r--',
            size: '20B',
            modified: 'Jan 01 2025',
          },
        },
      },
    },
  },
};
