import { BOLD, FG, RESET, DIM, CRLF } from '../utils/ansi';

export function getProjectTermfolio(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> termfolio${RESET}`,
    `  ${DIM}Interactive terminal portfolio${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} React + xterm.js terminal emulator`,
    `  ${FG.green}[+]${RESET} Virtual filesystem with ANSI-rendered content`,
    `  ${FG.green}[+]${RESET} Full shell emulation: history, line editing, tab completion`,
    `  ${FG.green}[+]${RESET} Easter eggs included`,
    '',
    `  ${DIM}Stack:${RESET}  React 19, TypeScript, xterm.js, Vite`,
    `  ${DIM}URL:${RESET}    https://termfolio.solomonneas.dev`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectSOC(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Open Source SOC${RESET}`,
    `  ${DIM}Production-grade Security Operations Center${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Seven-VM integrated architecture: SIEM, case management, threat intel`,
    `  ${FG.green}[+]${RESET} Monitors ~200 endpoints across Windows, Linux, and network devices`,
    `  ${FG.green}[+]${RESET} $140K-$217K cost avoidance over 3 years vs. managed MSSP`,
    `  ${FG.green}[+]${RESET} Equivalent value to $50K-$150K commercial cyber range`,
    `  ${FG.green}[+]${RESET} Custom automation bridging alerts to incident response workflows`,
    '',
    `  ${DIM}Stack:${RESET}  Wazuh, TheHive, Cortex, MISP, Zeek, Suricata, Elasticsearch`,
    `  ${DIM}Status:${RESET} ${FG.yellow}Wazuh live, full stack in progress${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectWatchtower(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Watchtower NOC Dashboard${RESET}`,
    `  ${DIM}Unified network operations visibility platform${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Interactive topology canvas with expandable device clusters`,
    `  ${FG.green}[+]${RESET} Dual-view topology (L2 Physical / L3 Logical) with CDP/LLDP discovery`,
    `  ${FG.green}[+]${RESET} Real-time WebSocket updates for device status and alerts`,
    `  ${FG.green}[+]${RESET} Cisco-style port grid visualization matching physical layouts`,
    `  ${FG.green}[+]${RESET} Proxmox hypervisor panel: VMs, containers, storage metrics`,
    `  ${FG.green}[+]${RESET} Mermaid diagram export for documentation`,
    '',
    `  ${DIM}Stack:${RESET}  FastAPI, React, TypeScript, Redis, WebSocket, ReactFlow`,
    `  ${DIM}URL:${RESET}    https://watchtower.solomonneas.dev`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/watchtower`,
    `  ${DIM}Status:${RESET} ${FG.yellow}In Progress${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectVMwareMigration(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> VMware to Proxmox Migration${RESET}`,
    `  ${DIM}6-node cluster infrastructure migration${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} 196 CPU cores, 2.75 TB RAM across 6 Proxmox nodes`,
    `  ${FG.green}[+]${RESET} Dual-port 10G NICs with LACP bonding and VLAN segmentation`,
    `  ${FG.green}[+]${RESET} ~$343K five-year cost avoidance vs. VMware per-core licensing`,
    `  ${FG.green}[+]${RESET} NETLAB+ integration for student cybersecurity lab pods`,
    '',
    `  ${DIM}Stack:${RESET}  Proxmox VE, 10G Networking, LACP, KVM/QEMU, NETLAB+`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectHyperVMigration(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Hyper-V to Proxmox Migration${RESET}`,
    `  ${DIM}Production infrastructure transition with AD migration${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} "Leapfrog" DC migration using AD replication (no V2V conversion)`,
    `  ${FG.green}[+]${RESET} VHDX-to-QCOW2 conversion for Linux VM workloads`,
    `  ${FG.green}[+]${RESET} Migrated LibreNMS, Netdisco, and Switchmap monitoring apps`,
    `  ${FG.green}[+]${RESET} Open-source Samba AD file server automation toolkit`,
    '',
    `  ${DIM}Stack:${RESET}  Windows Server, Hyper-V, Proxmox VE, Active Directory, PowerShell`,
    `  ${DIM}Status:${RESET} ${FG.yellow}In Progress${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

// removed LAIM

export function getProjectLinuxLabs(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Linux+ VM Labs${RESET}`,
    `  ${DIM}CompTIA Linux+ certification lab infrastructure${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} 31 hands-on labs with 100% coverage of all 5 exam domains`,
    `  ${FG.green}[+]${RESET} Upgraded from EOL systems to Rocky Linux, Fedora, Ubuntu 24.04`,
    `  ${FG.green}[+]${RESET} Custom pod architecture with snapshot-based reset`,
    `  ${FG.green}[+]${RESET} Complete instructor guides and student documentation`,
    '',
    `  ${DIM}Stack:${RESET}  Rocky Linux, Fedora, Ubuntu 24.04, Proxmox VE, NETLAB+`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectNSETInventory(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> NSET Hardware Inventory${RESET}`,
    `  ${DIM}BAS Capstone: IT asset tracking CRUD application${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Secure auth with bcrypt hashing and login throttling`,
    `  ${FG.green}[+]${RESET} Multi-field search across serial, model, brand, location, status`,
    `  ${FG.green}[+]${RESET} CSV export preserving current search filters`,
    `  ${FG.green}[+]${RESET} Role-based access with 37 predefined locations`,
    '',
    `  ${DIM}Stack:${RESET}  PHP, MariaDB, PDO, JavaScript`,
    `  ${DIM}Grade:${RESET}  ${FG.green}100%${RESET}`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectPortGrid(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> PortGrid${RESET}`,
    `  ${DIM}Modern network port visualization dashboard${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Real-time port status with 60s auto-refresh and color coding`,
    `  ${FG.green}[+]${RESET} Instant search across port names, MACs, VLANs, neighbors`,
    `  ${FG.green}[+]${RESET} Drag-and-drop device grouping with localStorage persistence`,
    `  ${FG.green}[+]${RESET} One-line Proxmox LXC deployment automation`,
    '',
    `  ${DIM}Stack:${RESET}  Next.js 15, React 19, TanStack, TypeScript, LibreNMS API`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/portgrid`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectNetworkObservability(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Network Observability Framework${RESET}`,
    `  ${DIM}Integrated L2/L3 topology mapping and monitoring${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Replaced manual cable tracing with instant MAC-to-port queries`,
    `  ${FG.green}[+]${RESET} Automated hourly polling via cron preventing topology staleness`,
    `  ${FG.green}[+]${RESET} Standardized SNMP across 20+ physical and virtual assets`,
    `  ${FG.green}[+]${RESET} 100% monitoring coverage: switches, APs, servers, firewalls`,
    '',
    `  ${DIM}Stack:${RESET}  Netdisco, LibreNMS, SNMP, PostgreSQL, Ubuntu 22.04`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectSambaAD(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Samba AD File Server${RESET}`,
    `  ${DIM}AD-integrated file server replacing fragmented legacy systems${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Automated single-command provisioning with AD domain join`,
    `  ${FG.green}[+]${RESET} SMB3 hardening with mandatory signing and encryption`,
    `  ${FG.green}[+]${RESET} SNMP monitoring for CPU, memory, disk, and network stats`,
    `  ${FG.green}[+]${RESET} Comprehensive audit logging for compliance tracking`,
    '',
    `  ${DIM}Stack:${RESET}  Ubuntu 24.04, Samba, Active Directory, Proxmox VE, XFS`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/samba-ad-migration`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectNDGWorkshop(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> NDG Proxmox Workshop${RESET}`,
    `  ${DIM}18-hour intensive Proxmox VE 8 deployment training${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Infrastructure foundations, clustering, and production deployment`,
    `  ${FG.green}[+]${RESET} HA, backup strategies with Proxmox Backup Server`,
    `  ${FG.green}[+]${RESET} NETLAB+ pod deployment and linked clone workflows`,
    `  ${FG.green}[+]${RESET} Applied immediately to production infrastructure`,
    '',
    `  ${DIM}Stack:${RESET}  Proxmox VE 8, NETLAB+, Clustering, KVM/QEMU`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectHomelab(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Proxmox Homelab${RESET}`,
    `  ${DIM}Multi-node virtualization cluster for DevOps and security testing${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Three-node Proxmox VE cluster with high availability`,
    `  ${FG.green}[+]${RESET} Ceph distributed storage with VM replication`,
    `  ${FG.green}[+]${RESET} VLAN segmentation for network isolation`,
    `  ${FG.green}[+]${RESET} Hosts Pi-hole, Gitea, Grafana, and monitoring services`,
    '',
    `  ${DIM}Stack:${RESET}  Proxmox VE, Ceph, ZFS, Linux, Networking`,
    `  ${DIM}Status:${RESET} ${FG.yellow}In Progress${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectAPT44(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> APT44 Intelligence Assessment${RESET}`,
    `  ${DIM}Threat intelligence report on Russia's Sandworm (GRU Unit 74455)${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Five-phase operational methodology analysis`,
    `  ${FG.green}[+]${RESET} Documented campaigns: Ukraine power grid, NotPetya, Viasat`,
    `  ${FG.green}[+]${RESET} Comprehensive malware catalog: wipers, backdoors, frameworks`,
    `  ${FG.green}[+]${RESET} Actionable mitigation recommendations for defensive teams`,
    '',
    `  ${DIM}Stack:${RESET}  Threat Intel, MITRE ATT&CK, OSINT, Malware Analysis`,
    `  ${DIM}Origin:${RESET} University of South Florida`,
    `  ${DIM}Status:${RESET} ${FG.green}Published${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectWaterSecurity(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Water Utility Security Research${RESET}`,
    `  ${DIM}Critical infrastructure cybersecurity analysis${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Documented nation-state pre-positioning (Volt Typhoon)`,
    `  ${FG.green}[+]${RESET} Catalogued real-world incidents: Oldsmar, Aliquippa, Muleshoe`,
    `  ${FG.green}[+]${RESET} Mapped vulnerabilities across 50,000+ water systems`,
    `  ${FG.green}[+]${RESET} Prioritized mitigation framework with 90-day action items`,
    '',
    `  ${DIM}Stack:${RESET}  Security Intelligence, SCADA, Research`,
    `  ${DIM}Origin:${RESET} University of South Florida`,
    `  ${DIM}Status:${RESET} ${FG.green}Published${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectSolomonNeasDev(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> solomonneas.dev${RESET}`,
    `  ${DIM}Personal portfolio with terminal/NOC dashboard aesthetic${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Static site generation with Astro 5.x and Tailwind CSS 4`,
    `  ${FG.green}[+]${RESET} Type-safe content management with Zod schema validation`,
    `  ${FG.green}[+]${RESET} Dynamic theme engine with localStorage persistence`,
    `  ${FG.green}[+]${RESET} MDX blog posts with RSS feed generation`,
    '',
    `  ${DIM}Stack:${RESET}  Astro, Tailwind CSS, Vercel, Cloudflare`,
    `  ${DIM}URL:${RESET}    https://solomonneas.dev`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/astro-portfolio`,
    `  ${DIM}Status:${RESET} ${FG.yellow}In Progress${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}





export function getProjectCyberBRIEF(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> CyberBRIEF${RESET}`,
    `  ${DIM}AI-powered threat intelligence with BLUF reports${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Live at cyberbrief.solomonneas.dev (Railway deploy)`,
    `  ${FG.green}[+]${RESET} AI-powered BLUF threat intelligence reports`,
    `  ${FG.green}[+]${RESET} Multi-source: Brave Search, Gemini, Perplexity APIs`,
    `  ${FG.green}[+]${RESET} ATT&CK mapping and IOC extraction per report`,
    `  ${FG.green}[+]${RESET} Weekly rotating topic system via cron automation`,
    `  ${FG.green}[+]${RESET} Rate limited (3/hr, 5/day per IP) with BYOK deep research`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript, FastAPI, Perplexity API, Railway`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/cyberbrief`,
    `  ${DIM}URL:${RESET}    https://cyberbrief.solomonneas.dev`,
    `  ${DIM}Status:${RESET} ${FG.green}Live${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectBroHunter(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Bro Hunter${RESET}`,
    `  ${DIM}Zeek + Suricata threat hunting platform${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Zeek + Suricata threat hunting platform with 15+ analysis pages`,
    `  ${FG.green}[+]${RESET} PCAP upload wizard with automated Zeek/Suricata/analysis pipeline`,
    `  ${FG.green}[+]${RESET} Beacon detection, DNS threat analysis, session reconstruction`,
    `  ${FG.green}[+]${RESET} Live packet capture management with tcpdump integration`,
    `  ${FG.green}[+]${RESET} Threat intel feeds (OTX, AbuseIPDB) with bulk lookup`,
    `  ${FG.green}[+]${RESET} Interactive analytics: top talkers, protocol breakdown, threat heatmap`,
    `  ${FG.green}[+]${RESET} HTML/JSON report generation with executive summaries`,
    `  ${FG.green}[+]${RESET} Global search (Ctrl+K) across IPs, domains, alerts, connections`,
    '',
    `  ${DIM}Stack:${RESET}  React 18, TypeScript, FastAPI, Tailwind, Python`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/bro-hunter`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed (4 phases shipped)${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectFortiSim(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> FortiSim${RESET}`,
    `  ${DIM}FortiGate firewall rule simulator${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Visual policy builder with drag-and-drop interface`,
    `  ${FG.green}[+]${RESET} Real-time rule validation and conflict detection`,
    `  ${FG.green}[+]${RESET} Traffic flow simulation and testing`,
    `  ${FG.green}[+]${RESET} Configuration export to FortiGate CLI format`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/fortisim`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectFortiLogForge(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> FortiLogForge${RESET}`,
    `  ${DIM}FortiGate log analysis and visualization${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Real-time log parsing and enrichment`,
    `  ${FG.green}[+]${RESET} Interactive dashboards for security events`,
    `  ${FG.green}[+]${RESET} Threat pattern detection and alerting`,
    `  ${FG.green}[+]${RESET} Historical trend analysis and reporting`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/fortilogforge`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectPlaybookForge(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Playbook Forge${RESET}`,
    `  ${DIM}SOC playbook parser with mermaid diagram generation${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Natural language playbook parsing`,
    `  ${FG.green}[+]${RESET} Automated workflow diagram generation`,
    `  ${FG.green}[+]${RESET} MITRE ATT&CK technique mapping`,
    `  ${FG.green}[+]${RESET} Export to multiple formats: Mermaid, JSON, Markdown`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/playbook-forge`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectIntelWorkbench(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Intel Workbench${RESET}`,
    `  ${DIM}OSINT and threat intelligence analysis workbench${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Multi-source data aggregation and correlation`,
    `  ${FG.green}[+]${RESET} Entity relationship mapping and visualization`,
    `  ${FG.green}[+]${RESET} Automated enrichment pipelines`,
    `  ${FG.green}[+]${RESET} Export to MISP, TheHive, and other platforms`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/intel-workbench`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectSOCShowcase(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> SOC Showcase${RESET}`,
    `  ${DIM}SOC Stack portfolio showcase with 5 design variants${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Five distinct UI/UX design implementations`,
    `  ${FG.green}[+]${RESET} Responsive layouts for all screen sizes`,
    `  ${FG.green}[+]${RESET} Dark/light theme support with smooth transitions`,
    `  ${FG.green}[+]${RESET} Component library showcase`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/soc-showcase`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectMCPServers(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> MCP Servers${RESET}`,
    `  ${DIM}9 Model Context Protocol servers bridging AI to security tools${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Zeek, Suricata, Wazuh, TheHive integration`,
    `  ${FG.green}[+]${RESET} MISP, Cortex, MITRE ATT&CK connectivity`,
    `  ${FG.green}[+]${RESET} Rapid7 InsightIDR and Sophos Central support`,
    `  ${FG.green}[+]${RESET} Standardized MCP protocol for AI agent orchestration`,
    '',
    `  ${DIM}Stack:${RESET}  TypeScript, MCP SDK`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas?tab=repositories&q=mcp`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}



export function getProjectPromptLibrary(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Prompt Library${RESET}`,
    `  ${DIM}Dual-mode prompt management with browse/copy UI and REST API${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Organized prompt collections with tagging and search`,
    `  ${FG.green}[+]${RESET} One-click copy with syntax highlighting`,
    `  ${FG.green}[+]${RESET} REST API for programmatic access`,
    `  ${FG.green}[+]${RESET} Variable templating and placeholder support`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/prompt-library`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}


export function getProjectProxGuard(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> ProxGuard${RESET}`,
    `  ${DIM}Proxmox security auditor with CIS benchmarks${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Automated configuration parsing and analysis`,
    `  ${FG.green}[+]${RESET} CIS benchmark compliance checking`,
    `  ${FG.green}[+]${RESET} Remediation script generation`,
    `  ${FG.green}[+]${RESET} Security posture reporting and recommendations`,
    '',
    `  ${DIM}Stack:${RESET}  React, TypeScript`,
    `  ${DIM}GitHub:${RESET} https://github.com/solomonneas/proxguard`,
    `  ${DIM}Status:${RESET} ${FG.green}Completed${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}



// removed Variant Gallery
