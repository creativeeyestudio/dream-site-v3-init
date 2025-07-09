'use client' // ⚠️ Obligatoire (Client Component)

import React, { useEffect, useMemo, useState } from 'react'
import { Select, useConfig } from '@payloadcms/ui' // Nouveau chemin v3

const STORAGE_KEY = 'selectedSiteId'

const writeCookie = (id: string) => {
  // 1 an de durée + SameSite pour éviter les warning de Chrome
  document.cookie = `${STORAGE_KEY}=${id}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

export default function SiteSelector(reload: boolean = true) {
  // Le client‑config sérialisé est exposé par useConfig
  const {
    config: { serverURL },
  } = useConfig()

  const [sites, setSites] = useState<any[]>([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    setSelected(localStorage.getItem(STORAGE_KEY) || '')

    fetch(`${serverURL}/api/settings?limit=100`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setSites(data.docs ?? []))
  }, [serverURL])

  const options = useMemo(
    () => [
      { label: 'Sélectionner un site…', value: '' },
      ...sites.map((s) => ({
        label: s?.title,
        value: s?.id,
      })),
    ],
    [sites],
  )

  const selectedOption = options.find((o) => o.value === selected) || options[0]

  const onChange = (opt: { label: string; value: string } | null) => {
    if (reload) {
      const id = opt?.value ?? ''
      writeCookie(id)
      setSelected(id)
      localStorage.setItem(STORAGE_KEY, id)
      location.reload() // ou mise à jour via contexte
    }
  }

  return (
    <div style={{ width: '100%', marginTop: 10, marginBottom: 20 }}>
      <Select
        name="selectedSite"
        label="Site sélectionné"
        value={selectedOption} /* 👈 objet complet */
        options={options}
        onChange={onChange} /* 👈 reçoit objet */
      />
    </div>
  )
}
