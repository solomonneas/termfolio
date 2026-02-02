import { fsTree, type FSNode } from './fsTree';

export class FileSystem {
  private tree = fsTree;

  resolve(path: string, cwd: string): string {
    // Handle special paths
    if (path === '~' || path === '') return '/home/solomon';
    if (path.startsWith('~/')) path = '/home/solomon/' + path.slice(2);
    if (!path.startsWith('/')) path = cwd + '/' + path;

    // Normalize: resolve . and ..
    const parts = path.split('/').filter(Boolean);
    const resolved: string[] = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        resolved.pop();
      } else {
        resolved.push(part);
      }
    }
    return '/' + resolved.join('/');
  }

  getNode(absPath: string): FSNode | null {
    if (absPath === '/') return this.tree['/'];

    const parts = absPath.split('/').filter(Boolean);
    let node = this.tree['/'];

    for (const part of parts) {
      if (!node.children || !node.children[part]) return null;
      node = node.children[part];
    }
    return node;
  }

  isDir(absPath: string): boolean {
    const node = this.getNode(absPath);
    return node?.type === 'dir';
  }

  isFile(absPath: string): boolean {
    const node = this.getNode(absPath);
    return node?.type === 'file';
  }

  list(absPath: string): { name: string; node: FSNode }[] | null {
    const node = this.getNode(absPath);
    if (!node || node.type !== 'dir' || !node.children) return null;

    return Object.entries(node.children)
      .map(([name, child]) => ({ name, node: child }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getContent(absPath: string): string | null {
    const node = this.getNode(absPath);
    if (!node || node.type !== 'file') return null;
    return node.content ?? null;
  }

  getDisplayPath(absPath: string): string {
    if (absPath === '/home/solomon') return '~';
    if (absPath.startsWith('/home/solomon/')) return '~/' + absPath.slice(14);
    return absPath;
  }
}
