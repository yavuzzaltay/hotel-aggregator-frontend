import type { ComprehensiveReportData } from './dynamic-data'

/**
 * Generates and downloads a rich, multi-section Excel CSV file containing
 * all data from the report: Executive KPIs, Property Matrix, Team KPIs,
 * Semantic Engine, Case Tickets, and Review Logs.
 */
export function downloadExcelReport(report: ComprehensiveReportData) {
  const meta = report.metadata
  const exec = report.executiveSummary
  const cases = report.caseManagement

  const rows: string[][] = []

  // Header / Metadata
  rows.push(['LUXURY HOTEL AGGREGATOR - EXECUTIVE INTELLIGENCE REPORT'])
  rows.push(['Report ID', meta.reportId])
  rows.push(['Generated At', meta.generatedAt])
  rows.push(['Date Range', meta.dateRange])
  rows.push(['Property Scope', meta.selectedProperty])
  rows.push(['Active Filters', meta.activeFiltersList.join(' | ')])
  rows.push([])

  // Executive Summary Section
  rows.push(['1. EXECUTIVE KPI SUMMARY'])
  rows.push(['Metric', 'Value', 'Benchmark / Target', 'Change'])
  rows.push(['Guest Rating Index (GRI™)', `${exec.griScore}%`, '85.0%', exec.griChange])
  rows.push(['Net Promoter Score (NPS)', `${exec.npsScore}`, '+50', 'Promoters 68% / Passives 22%'])
  rows.push(['Total Indexed Reviews', `${exec.totalReviews}`, `${exec.reviewsTarget} target`, 'Indexed from OTAs'])
  rows.push(['Response Rate %', `${exec.responseRate}%`, '80.0%', exec.responseRateChange])
  rows.push(['Avg Response Time', `${exec.avgResponseTimeHours} hrs`, '< 2.0 hrs', 'SLA Target'])
  rows.push(['Positive Sentiment %', `${exec.sentimentPositivePct}%`, '75.0%', 'Target Threshold'])
  rows.push(['Neutral Sentiment %', `${exec.sentimentNeutralPct}%`, '-', 'Monitor'])
  rows.push(['Negative Sentiment %', `${exec.sentimentNegativePct}%`, '< 10.0%', 'Alert Zone'])
  rows.push([])

  // Department Scores
  rows.push(['DEPARTMENTAL PERFORMANCE BREAKDOWN'])
  rows.push(['Department Name', 'GRI Score %', 'Period Change'])
  exec.departmentScores.forEach((dept) => {
    rows.push([dept.name, `${dept.score}%`, dept.change])
  })
  rows.push([])

  // Property Performance Matrix
  rows.push(['2. PROPERTY PERFORMANCE MATRIX'])
  rows.push([
    'Property Name',
    'Location',
    'GRI Score %',
    'Total Reviews',
    'NPS Score',
    'Response Rate %',
    'Top Positive Driver',
    'Top Negative Driver',
    'Booking Share %',
    'Google Share %',
    'Tripadvisor Share %',
  ])
  report.propertyBreakdown.forEach((prop) => {
    rows.push([
      prop.name,
      prop.location,
      `${prop.griScore}%`,
      `${prop.totalReviews}`,
      `${prop.nps}`,
      `${prop.responseRate}%`,
      prop.topPositiveDriver,
      prop.topNegativeDriver,
      `${prop.platformShare.booking}%`,
      `${prop.platformShare.google}%`,
      `${prop.platformShare.tripadvisor}%`,
    ])
  })
  rows.push([])

  // Semantic Engine
  rows.push(['3. SEMANTIC ENGINE & DRIVER ANALYSIS'])
  rows.push(['Category', 'Type', 'GRI Impact Pts', 'Mentions Count', 'Key Tags', 'Executive Insight'])
  report.semanticEngine.positiveDrivers.forEach((d) => {
    rows.push([d.category, 'POSITIVE', `+${d.impact}`, `${d.mentions}`, d.tags.join('; '), d.insight])
  })
  report.semanticEngine.negativeDrivers.forEach((d) => {
    rows.push([d.category, 'NEGATIVE', `${d.impact}`, `${d.mentions}`, d.tags.join('; '), d.insight])
  })
  rows.push([])

  // Team KPIs
  rows.push(['4. TEAM KPIS & STAFF OPERATIONS'])
  rows.push(['Staff Member', 'Role / Title', 'Assigned Property', 'Reviews Handled', 'Avg Response Time', 'Resolution Rate %', 'CSAT Rating', 'SLA Compliance %'])
  report.teamKpis.members.forEach((m) => {
    rows.push([
      m.name,
      m.role,
      m.property,
      `${m.reviewsHandled}`,
      `${m.avgResponseHours} hrs`,
      `${m.resolutionRatePct}%`,
      `${m.csatScore} / 5.0`,
      `${m.slaCompliancePct}%`,
    ])
  })
  rows.push([])

  // Case Management
  rows.push(['5. CASE MANAGEMENT & INCIDENT TICKETS'])
  rows.push([`Total Cases: ${cases.totalCases}`, `Open: ${cases.openCases}`, `In Progress: ${cases.inProgressCases}`, `Resolved: ${cases.resolvedCases}`, `SLA Compliance: ${cases.slaCompliancePct}%`])
  rows.push(['Ticket #', 'Room / Area', 'Incident Title', 'Category', 'Assignee', 'Priority', 'Status', 'Elapsed Time', 'SLA Met'])
  cases.tickets.forEach((t) => {
    rows.push([
      t.ticketNumber,
      t.roomOrArea,
      t.title,
      t.category,
      t.assignee,
      t.priority,
      t.status,
      t.elapsedTime,
      t.slaMet ? 'YES' : 'NO',
    ])
  })
  rows.push([])

  // Guest Review Logs
  rows.push(['6. INDEXED GUEST REVIEWS & FEEDBACK LOGS'])
  rows.push(['Guest Name', 'Property', 'Platform', 'Language', 'Score', 'Sentiment', 'CRM Badge', 'AI Reply Status', 'Review Snippet'])
  report.reviewLogs.forEach((r) => {
    rows.push([
      r.guestName,
      r.property,
      r.platform,
      r.language,
      `${r.rating}/${r.scale}`,
      r.sentiment.toUpperCase(),
      r.crmBadge?.label || 'Standard',
      r.aiReplyStatus,
      `"${r.reviewText.replace(/"/g, '""')}"`,
    ])
  })

  // Format into CSV content string with proper quotes escaping
  const csvContent =
    '\uFEFF' +
    rows
      .map((row) =>
        row
          .map((cell) => {
            const str = String(cell ?? '')
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return `"${str.replace(/"/g, '""')}"`
            }
            return str
          })
          .join(','),
      )
      .join('\r\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const fileName = `Luxury_Hotel_Aggregator_Report_${meta.reportId}_${meta.dateRange.replace(/\s+/g, '_')}.csv`

  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Triggers printing / PDF saving via native printable window with standard CSS
 * print rules, headers, footers, charts, and page breaks.
 */
export function triggerPdfPrint(report: ComprehensiveReportData) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to download/print the PDF report.')
    return
  }

  const meta = report.metadata
  const exec = report.executiveSummary

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${meta.title} - ${meta.reportId}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 15mm 12mm 15mm 12mm;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #18181b;
            background: #ffffff;
            margin: 0;
            padding: 20px;
            font-size: 11px;
            line-height: 1.4;
          }
          .header {
            border-bottom: 2px solid #18181b;
            padding-bottom: 12px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .brand {
            font-size: 20px;
            font-weight: 300;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #09090b;
          }
          .subtitle {
            font-size: 11px;
            color: #71717a;
            margin-top: 4px;
          }
          .meta-box {
            text-align: right;
            font-size: 10px;
            color: #52525b;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            background: #f4f4f5;
            border: 1px solid #e4e4e7;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
          }
          .grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 20px;
          }
          .kpi-card {
            border: 1px solid #e4e4e7;
            border-radius: 6px;
            padding: 12px;
            background: #fafafa;
          }
          .kpi-title {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #71717a;
            font-weight: 600;
          }
          .kpi-value {
            font-size: 22px;
            font-weight: 300;
            margin: 6px 0 2px 0;
            color: #09090b;
          }
          .kpi-caption {
            font-size: 9px;
            color: #16a34a;
            font-weight: 500;
          }
          .section-title {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #e4e4e7;
            padding-bottom: 6px;
            margin: 24px 0 12px 0;
            color: #09090b;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
            font-size: 10px;
          }
          th {
            background: #f4f4f5;
            text-align: left;
            padding: 6px 8px;
            font-size: 9px;
            text-transform: uppercase;
            color: #52525b;
            border-bottom: 1px solid #d4d4d8;
          }
          td {
            padding: 6px 8px;
            border-bottom: 1px solid #f4f4f5;
          }
          tr:nth-child(even) td {
            background: #fafafa;
          }
          .tag {
            display: inline-block;
            background: #eff6ff;
            color: #1d4ed8;
            border-radius: 3px;
            padding: 1px 5px;
            font-size: 9px;
            margin-right: 3px;
          }
          .tag-neg {
            background: #fff1f2;
            color: #be123c;
          }
          .status-badge {
            font-size: 9px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 3px;
          }
          .status-open { background: #fee2e2; color: #991b1b; }
          .status-progress { background: #fef3c7; color: #92400e; }
          .status-resolved { background: #dcfce7; color: #166534; }
          .page-break {
            page-break-before: always;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="background:#18181b; color:#fff; padding:10px 16px; margin:-20px -20px 20px -20px; display:flex; justify-content:space-between; align-items:center;">
          <span>📄 <strong>PDF Executive Report Preview</strong> (${meta.reportId})</span>
          <button onclick="window.print()" style="background:#2563eb; color:#fff; border:none; padding:6px 16px; border-radius:4px; font-weight:600; cursor:pointer;">Click Here to Print / Save as PDF</button>
        </div>

        <div class="header">
          <div>
            <div class="brand">${meta.title}</div>
            <div class="subtitle">${meta.subtitle}</div>
          </div>
          <div class="meta-box">
            <div><strong>Report ID:</strong> ${meta.reportId}</div>
            <div><strong>Generated:</strong> ${meta.generatedAt}</div>
            <div><span class="badge">${meta.dateRange}</span></div>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid-4">
          <div class="kpi-card">
            <div class="kpi-title">Guest Rating Index (GRI™)</div>
            <div class="kpi-value">${exec.griScore}%</div>
            <div class="kpi-caption">${exec.griChange}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-title">Net Promoter Score (NPS)</div>
            <div class="kpi-value">+${exec.npsScore}</div>
            <div class="kpi-caption" style="color:#2563eb;">Promoters: ${exec.sentimentPositivePct}%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-title">Reviews Indexed</div>
            <div class="kpi-value">${exec.totalReviews.toLocaleString()}</div>
            <div class="kpi-caption" style="color:#71717a;">Target: ${exec.reviewsTarget.toLocaleString()}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-title">Response Rate</div>
            <div class="kpi-value">${exec.responseRate}%</div>
            <div class="kpi-caption">${exec.responseRateChange}</div>
          </div>
        </div>

        <div style="margin-bottom: 12px; font-size:10px; color:#52525b; background:#f4f4f5; padding:8px 12px; border-radius:4px;">
          <strong>Applied Filter Scope:</strong> ${meta.selectedProperty} | ${meta.activeFiltersList.join(' · ')}
        </div>

        <div class="section-title">1. Portfolio Property Performance (17 Properties)</div>
        <table>
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Location</th>
              <th>GRI Score</th>
              <th>Reviews</th>
              <th>NPS</th>
              <th>Resp. Rate</th>
              <th>Top Positive Driver</th>
              <th>Top Area to Improve</th>
            </tr>
          </thead>
          <tbody>
            ${report.propertyBreakdown
              .map(
                (p) => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.location}</td>
                <td><strong>${p.griScore}%</strong></td>
                <td>${p.totalReviews}</td>
                <td>+${p.nps}</td>
                <td>${p.responseRate}%</td>
                <td><span class="tag">${p.topPositiveDriver}</span></td>
                <td><span class="tag tag-neg">${p.topNegativeDriver}</span></td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>

        <div class="section-title">2. Semantic Engine & Guest Sentiment Drivers</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <h4 style="margin:0 0 8px 0; color:#166534; font-size:11px; text-transform:uppercase;">Top Positive Drivers</h4>
            <table>
              <thead>
                <tr><th>Category</th><th>Impact</th><th>Mentions</th></tr>
              </thead>
              <tbody>
                ${report.semanticEngine.positiveDrivers
                  .map(
                    (d) => `
                  <tr>
                    <td><strong>${d.category}</strong><br><span style="font-size:8px; color:#71717a;">${d.tags.join(', ')}</span></td>
                    <td style="color:#16a34a; font-weight:600;">+${d.impact} pts</td>
                    <td>${d.mentions}</td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
          <div>
            <h4 style="margin:0 0 8px 0; color:#991b1b; font-size:11px; text-transform:uppercase;">Areas for Improvement</h4>
            <table>
              <thead>
                <tr><th>Category</th><th>Impact</th><th>Mentions</th></tr>
              </thead>
              <tbody>
                ${report.semanticEngine.negativeDrivers
                  .map(
                    (d) => `
                  <tr>
                    <td><strong>${d.category}</strong><br><span style="font-size:8px; color:#71717a;">${d.tags.join(', ')}</span></td>
                    <td style="color:#dc2626; font-weight:600;">${d.impact} pts</td>
                    <td>${d.mentions}</td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="page-break"></div>

        <div class="section-title">3. Team KPIs & Operational Performance</div>
        <table>
          <thead>
            <tr>
              <th>Team Member</th>
              <th>Role</th>
              <th>Assigned Property</th>
              <th>Reviews Handled</th>
              <th>Avg Resp. Time</th>
              <th>Resolution %</th>
              <th>CSAT Rating</th>
            </tr>
          </thead>
          <tbody>
            ${report.teamKpis.members
              .map(
                (m) => `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.role}</td>
                <td>${m.property}</td>
                <td>${m.reviewsHandled}</td>
                <td>${m.avgResponseHours} hrs</td>
                <td>${m.resolutionRatePct}%</td>
                <td><strong>${m.csatScore} / 5</strong></td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>

        <div class="section-title">4. Active Case Management & SLA Compliance</div>
        <div style="margin-bottom:10px; font-size:10px; color:#52525b;">
          Total Cases: <strong>${report.caseManagement.totalCases}</strong> | Open: <strong style="color:#dc2626">${report.caseManagement.openCases}</strong> | In Progress: <strong style="color:#d97706">${report.caseManagement.inProgressCases}</strong> | Resolved: <strong style="color:#16a34a">${report.caseManagement.resolvedCases}</strong> | SLA Compliance: <strong>${report.caseManagement.slaCompliancePct}%</strong>
        </div>
        <table>
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>Room / Suite</th>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${report.caseManagement.tickets
              .map(
                (t) => `
              <tr>
                <td><strong>${t.ticketNumber}</strong></td>
                <td>${t.roomOrArea}</td>
                <td>${t.title}</td>
                <td>${t.category}</td>
                <td>${t.assignee}</td>
                <td><span class="tag ${t.priority === 'Urgent' ? 'tag-neg' : ''}">${t.priority}</span></td>
                <td><span class="status-badge status-${t.status.toLowerCase().replace(/\s+/g, '')}">${t.status}</span></td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>

        <div class="section-title">5. Guest Review Log Samples</div>
        <table>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Property</th>
              <th>Platform</th>
              <th>Score</th>
              <th>Sentiment</th>
              <th>Review Excerpt</th>
            </tr>
          </thead>
          <tbody>
            ${report.reviewLogs
              .map(
                (r) => `
              <tr>
                <td><strong>${r.guestName}</strong><br><span style="font-size:8px; color:#2563eb;">${r.crmBadge?.label || ''}</span></td>
                <td>${r.property}</td>
                <td>${r.platform}</td>
                <td><strong>${r.rating}/${r.scale}</strong></td>
                <td><span class="tag ${r.sentiment === 'negative' ? 'tag-neg' : ''}">${r.sentiment.toUpperCase()}</span></td>
                <td style="max-width:280px; font-style:italic;">"${r.reviewText}"</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>

        <div style="margin-top:40px; border-top:1px solid #e4e4e7; padding-top:12px; font-size:9px; color:#a1a1aa; text-align:center;">
          Generated by Luxury Hotel Aggregator Executive Platform · Confidential Operational Intelligence
        </div>
      </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
}
