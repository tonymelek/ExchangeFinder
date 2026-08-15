import './style.css'

const DATA_URL = `${import.meta.env.BASE_URL}exchanges.json`

let records = []

const findingsEl = document.getElementById('findings')
const inputEl = document.getElementById('input')
const tableContainer = document.getElementById('table-container')

function setFindings(message, tone = 'muted') {
  const tones = {
    muted: 'text-slate/60',
    ok: 'text-ok',
    warn: 'text-coral',
    loading: 'text-signal',
  }

  findingsEl.className = `mt-5 flex min-h-7 items-center justify-center gap-2 text-center text-sm font-medium tracking-wide ${tones[tone] ?? tones.muted}`

  if (tone === 'loading') {
    findingsEl.innerHTML = `
      <span class="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true"></span>
      <span>${message}</span>
    `
    return
  }

  findingsEl.textContent = message
}

function clearResults() {
  tableContainer.replaceChildren()
}

function normalizeRecord(raw) {
  return {
    code: raw.CODE ?? '',
    name: String(raw['SITE\nNAME'] ?? '').toUpperCase(),
    address: raw.Address ?? '',
    lat: raw.LATITUDE,
    lng: raw.LONGITUDE,
  }
}

function drawTable(source) {
  const query = inputEl.value.trim().toUpperCase()
  const results = source.filter((record) => record.name.includes(query))
  const showAddress = window.innerWidth > 450

  clearResults()

  if (results.length === 0) {
    setFindings(`No matches for “${inputEl.value.trim()}” — try a shorter name`, 'warn')
    return
  }

  setFindings(
    `${results.length} matching exchange${results.length === 1 ? '' : 's'}`,
    'ok'
  )

  const table = document.createElement('table')
  table.className =
    'result-panel w-full border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line/80 bg-white/85 text-left text-sm backdrop-blur-sm sm:text-base'

  const thead = document.createElement('thead')
  const headRow = document.createElement('tr')
  headRow.className = 'bg-ink text-mist'

  const headers = showAddress
    ? ['Code', 'Exchange', 'Address', '']
    : ['Code', 'Exchange', '']

  headers.forEach((label) => {
    const th = document.createElement('th')
    th.scope = 'col'
    th.textContent = label
    th.className =
      'px-3 py-3.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] first:pl-4 last:pr-4 sm:px-4'
    headRow.appendChild(th)
  })
  thead.appendChild(headRow)
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  results.forEach((result, index) => {
    const tr = document.createElement('tr')
    tr.className =
      'animate-row border-t border-line/60 transition hover:bg-signal/[0.04]'
    tr.style.animationDelay = `${Math.min(index, 12) * 28}ms`

    const code = document.createElement('td')
    code.className = 'whitespace-nowrap px-3 py-3.5 first:pl-4 sm:px-4'
    const codeBadge = document.createElement('span')
    codeBadge.className =
      'inline-flex rounded-md bg-mist px-2 py-1 font-display text-[11px] font-bold tracking-wide text-signal sm:text-xs'
    codeBadge.textContent = result.code
    code.appendChild(codeBadge)

    const name = document.createElement('td')
    name.className = 'px-3 py-3.5 font-semibold text-ink sm:px-4'
    name.textContent = result.name

    const cells = [code, name]

    if (showAddress) {
      const address = document.createElement('td')
      address.className = 'px-3 py-3.5 text-slate/75 sm:px-4'
      address.textContent = result.address
      cells.push(address)
    }

    const navCell = document.createElement('td')
    navCell.className = 'px-3 py-3.5 text-right last:pr-4 sm:px-4'

    const navLink = document.createElement('a')
    navLink.href = `https://maps.google.com/?q=${result.lat},${result.lng}`
    navLink.target = '_blank'
    navLink.rel = 'noopener noreferrer'
    navLink.className =
      'inline-flex items-center gap-1.5 rounded-lg bg-amber px-3 py-2 font-display text-xs font-bold text-ink transition hover:bg-amber-deep hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber'
    navLink.innerHTML = `
      <span>Navigate</span>
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    `

    navCell.appendChild(navLink)
    cells.push(navCell)

    cells.forEach((cell) => tr.appendChild(cell))
    tbody.appendChild(tr)
  })

  table.appendChild(tbody)
  tableContainer.appendChild(table)
}

function handleSearch() {
  clearResults()

  if (inputEl.value.trim().length < 3) {
    setFindings(
      records.length
        ? `${records.length} exchanges ready — type at least 3 characters`
        : 'Type at least 3 characters to search',
      'muted'
    )
    return
  }

  drawTable(records)
}

setFindings('Loading exchange data…', 'loading')

fetch(DATA_URL)
  .then((response) => {
    if (!response.ok) throw new Error('Failed to load exchange data')
    return response.json()
  })
  .then((data) => {
    records = data.map(normalizeRecord)
    setFindings(
      `${records.length} exchanges ready — type at least 3 characters`,
      'muted'
    )
  })
  .catch(() => {
    setFindings('Unable to load exchange data. Please try again later.', 'warn')
  })

inputEl.addEventListener('input', handleSearch)
window.addEventListener('resize', () => {
  if (inputEl.value.trim().length >= 3 && records.length) {
    drawTable(records)
  }
})
