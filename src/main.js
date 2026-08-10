import './style.css'

const DATA_URL = `${import.meta.env.BASE_URL}exchanges.json`

let records = []

const findingsEl = document.getElementById('findings')
const inputEl = document.getElementById('input')
const tableContainer = document.getElementById('table-container')

function setFindings(message) {
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
    setFindings('No matching records found')
    return
  }

  setFindings(
    `We have found ${results.length} matching record${results.length === 1 ? '' : 's'}`
  )

  const table = document.createElement('table')
  table.className =
    'w-full border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line/80 bg-white/75 text-left text-sm shadow-[0_12px_40px_-20px_rgba(10,22,40,0.3)] backdrop-blur-sm sm:text-base'

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
      'px-3 py-3 font-display text-xs font-semibold uppercase tracking-wider first:pl-4 last:pr-4 sm:px-4'
    headRow.appendChild(th)
  })
  thead.appendChild(headRow)
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  results.forEach((result, index) => {
    const tr = document.createElement('tr')
    tr.className =
      'animate-row border-t border-line/70 transition hover:bg-signal/5'
    tr.style.animationDelay = `${Math.min(index, 12) * 30}ms`

    const code = document.createElement('td')
    code.className =
      'whitespace-nowrap px-3 py-3 font-display text-xs font-semibold tracking-wide text-signal first:pl-4 sm:px-4 sm:text-sm'
    code.textContent = result.code

    const name = document.createElement('td')
    name.className = 'px-3 py-3 font-semibold text-ink sm:px-4'
    name.textContent = result.name

    const cells = [code, name]

    if (showAddress) {
      const address = document.createElement('td')
      address.className = 'px-3 py-3 text-slate/80 sm:px-4'
      address.textContent = result.address
      cells.push(address)
    }

    const navCell = document.createElement('td')
    navCell.className = 'px-3 py-3 text-right last:pr-4 sm:px-4'

    const navLink = document.createElement('a')
    navLink.href = `https://maps.google.com/?q=${result.lat},${result.lng}`
    navLink.target = '_blank'
    navLink.rel = 'noopener noreferrer'
    navLink.className =
      'inline-flex items-center gap-1.5 rounded-lg bg-signal px-3 py-1.5 font-display text-xs font-semibold text-white transition hover:bg-signal-deep hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal'
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
        ? `${records.length} exchanges loaded — type 3+ characters to search`
        : 'Type 3 characters at least to see results'
    )
    return
  }

  drawTable(records)
}

setFindings('Loading results…')

fetch(DATA_URL)
  .then((response) => {
    if (!response.ok) throw new Error('Failed to load exchange data')
    return response.json()
  })
  .then((data) => {
    records = data.map(normalizeRecord)
    setFindings(
      `${records.length} exchanges loaded — type 3+ characters to search`
    )
  })
  .catch(() => {
    setFindings('Unable to load exchange data. Please try again later.')
  })

inputEl.addEventListener('input', handleSearch)
window.addEventListener('resize', () => {
  if (inputEl.value.trim().length >= 3 && records.length) {
    drawTable(records)
  }
})
