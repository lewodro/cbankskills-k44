// content/demos.ts
// YouTube Video IDs per skill
// Format: '[vertical]/[skill-slug]' → 'VIDEO_ID'

export const skillDemos: Record<string, string> = {
  // Financial Analysis
  'financial-analysis/dcf-model':           'FeZ8DwScwbk',
  'financial-analysis/comps-analysis':      'YBAfqyLs35o',

  // Investment Banking
  'investment-banking/cim-builder':         'gJ-_pl3AXlI',
  'investment-banking/merger-model':        'q4id0q-iEKE',

  // Equity Research
  'equity-research/morning-note':           'IWewaPLc42s',
  'equity-research/initiating-coverage':   'WiuqVXgmDT0',

  // Private Equity
  'private-equity/ic-memo':                'EWYMvdeEWJU',
  'private-equity/deal-screening':         'cpVaImKWk2I',

  // Fund Administration
  'fund-admin/nav-tieout':                 '0UO0b_8XmL0',
  'fund-admin/gl-recon':                   'zXh1ajegr6I',

  // Wealth Management
  'wealth-management/financial-plan':      'a9WtpuJGgeI',
  'wealth-management/portfolio-rebalance': '7olAfogH6bo',

  // Operations & Compliance
  'operations/kyc-doc-parse':              'TXrqUUF2Fxs',
  'operations/kyc-rules':                  'x_QTxogBbFQ',
}

// Helper — construct clean embed URL from Video ID
export function getEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay:        '1',
    mute:            '1',
    loop:            '1',
    controls:        '0',
    playlist:        videoId,  // required for loop to work
    modestbranding:  '1',
    rel:             '0',
    showinfo:        '0',
    vq:              'large',  // hint 480p as default quality
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

// Helper — get Video ID for a given vertical + skill slug
export function getDemoId(vertical: string, skill: string): string | null {
  return skillDemos[`${vertical}/${skill}`] ?? null
}