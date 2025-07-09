'use client'

import { Button, useField } from '@payloadcms/ui'
import React from 'react'

interface ResetPasswordButtonProps {
  label: string
  fieldPath: string
  hashPath: string
}

export default function ResetPasswordButton({
  label,
  fieldPath,
  hashPath,
}: ResetPasswordButtonProps) {
  // Hook sur le champ mot de passe à vider
  const { setValue: setPassword } = useField<string>({ path: fieldPath })
  const { setValue: setHash } = useField<string>({ path: hashPath })

  const handleClick = () => {
    setPassword(undefined) // retire le mot de passe en clair
    setHash(undefined) // retire le hash
  }

  return (
    <Button buttonStyle="secondary" onClick={handleClick}>
      {label}
    </Button>
  )
}
