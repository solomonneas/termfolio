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
                  'open-source-soc.md': {
                    type: 'file',
                    content: 'project:soc',
                    permissions: '-rw-r--r--',
                    size: '2.8K',
                    modified: 'Dec 15 2025',
                  },
                  'watchtower.md': {
                    type: 'file',
                    content: 'project:watchtower',
                    permissions: '-rw-r--r--',
                    size: '3.1K',
                    modified: 'Jan 20 2026',
                  },
                  'vmware-to-proxmox.md': {
                    type: 'file',
                    content: 'project:vmware-migration',
                    permissions: '-rw-r--r--',
                    size: '2.2K',
                    modified: 'Aug 15 2025',
                  },
                  'hyperv-to-proxmox.md': {
                    type: 'file',
                    content: 'project:hyperv-migration',
                    permissions: '-rw-r--r--',
                    size: '2.0K',
                    modified: 'Jan 10 2026',
                  },
                  'laim.md': {
                    type: 'file',
                    content: 'project:laim',
                    permissions: '-rw-r--r--',
                    size: '2.4K',
                    modified: 'Jan 05 2025',
                  },
                  'linux-vm-labs.md': {
                    type: 'file',
                    content: 'project:linux-labs',
                    permissions: '-rw-r--r--',
                    size: '1.9K',
                    modified: 'Nov 20 2025',
                  },
                  'nset-hardware-inventory.md': {
                    type: 'file',
                    content: 'project:nset-inventory',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Dec 01 2024',
                  },
                  'portgrid.md': {
                    type: 'file',
                    content: 'project:portgrid',
                    permissions: '-rw-r--r--',
                    size: '2.1K',
                    modified: 'Jan 15 2026',
                  },
                  'network-observability.md': {
                    type: 'file',
                    content: 'project:network-observability',
                    permissions: '-rw-r--r--',
                    size: '1.8K',
                    modified: 'Aug 10 2025',
                  },
                  'samba-ad-fileserver.md': {
                    type: 'file',
                    content: 'project:samba-ad',
                    permissions: '-rw-r--r--',
                    size: '2.0K',
                    modified: 'Jan 18 2026',
                  },
                  'ndg-proxmox-workshop.md': {
                    type: 'file',
                    content: 'project:ndg-workshop',
                    permissions: '-rw-r--r--',
                    size: '1.5K',
                    modified: 'Jul 10 2025',
                  },
                  'homelab.md': {
                    type: 'file',
                    content: 'project:homelab',
                    permissions: '-rw-r--r--',
                    size: '2.4K',
                    modified: 'Nov 10 2024',
                  },
                  'apt44-intelligence.md': {
                    type: 'file',
                    content: 'project:apt44',
                    permissions: '-rw-r--r--',
                    size: '2.3K',
                    modified: 'Oct 15 2025',
                  },
                  'water-utility-security.md': {
                    type: 'file',
                    content: 'project:water-security',
                    permissions: '-rw-r--r--',
                    size: '2.1K',
                    modified: 'Oct 20 2025',
                  },
                  'solomonneas-dev.md': {
                    type: 'file',
                    content: 'project:solomonneas-dev',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Dec 10 2025',
                  },
                  'neovim.md': {
                    type: 'file',
                    content: 'project:neovim',
                    permissions: '-rw-r--r--',
                    size: '1.4K',
                    modified: 'Dec 20 2025',
                  },
                  'obsidian-pkm.md': {
                    type: 'file',
                    content: 'project:obsidian',
                    permissions: '-rw-r--r--',
                    size: '1.5K',
                    modified: 'Jul 15 2025',
                  },
                  'cyberbrief.md': {
                    type: 'file',
                    content: 'project:cyberbrief',
                    permissions: '-rw-r--r--',
                    size: '1.8K',
                    modified: 'Feb 05 2026',
                  },
                  'bro-hunter.md': {
                    type: 'file',
                    content: 'project:bro-hunter',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Feb 06 2026',
                  },
                  'fortisim.md': {
                    type: 'file',
                    content: 'project:fortisim',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Feb 07 2026',
                  },
                  'fortilogforge.md': {
                    type: 'file',
                    content: 'project:fortilogforge',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Feb 08 2026',
                  },
                  'playbook-forge.md': {
                    type: 'file',
                    content: 'project:playbook-forge',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Feb 09 2026',
                  },
                  'intel-workbench.md': {
                    type: 'file',
                    content: 'project:intel-workbench',
                    permissions: '-rw-r--r--',
                    size: '1.8K',
                    modified: 'Feb 10 2026',
                  },
                  'soc-showcase.md': {
                    type: 'file',
                    content: 'project:soc-showcase',
                    permissions: '-rw-r--r--',
                    size: '1.5K',
                    modified: 'Feb 11 2026',
                  },
                  'mcp-servers.md': {
                    type: 'file',
                    content: 'project:mcp-servers',
                    permissions: '-rw-r--r--',
                    size: '2.0K',
                    modified: 'Feb 12 2026',
                  },
                  'model-arena.md': {
                    type: 'file',
                    content: 'project:model-arena',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Feb 13 2026',
                  },
                  'prompt-library.md': {
                    type: 'file',
                    content: 'project:prompt-library',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Feb 15 2026',
                  },
                  'usage-tracker.md': {
                    type: 'file',
                    content: 'project:usage-tracker',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Feb 16 2026',
                  },
                  'proxguard.md': {
                    type: 'file',
                    content: 'project:proxguard',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Feb 19 2026',
                  },
                  'hci-viz.md': {
                    type: 'file',
                    content: 'project:hci-viz',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Feb 20 2026',
                  },
                  'mistify.md': {
                    type: 'file',
                    content: 'project:mistify',
                    permissions: '-rw-r--r--',
                    size: '1.7K',
                    modified: 'Feb 21 2026',
                  },
                  'variant-gallery.md': {
                    type: 'file',
                    content: 'project:variant-gallery',
                    permissions: '-rw-r--r--',
                    size: '1.6K',
                    modified: 'Feb 10 2026',
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
