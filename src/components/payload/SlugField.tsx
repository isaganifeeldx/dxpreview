'use client'

import type { TextFieldClientProps } from 'payload'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  FieldLabel,
  TextInput,
  useDocumentInfo,
  useField,
  useForm,
  useFormFields,
  useServerFunctions,
  useTranslation,
} from '@payloadcms/ui'
import { formatSlug } from '@/lib/formatSlug'

import './SlugField.scss'

type SlugFieldProps = TextFieldClientProps & {
  useAsSlug: string
}

/**
 * Payload slug field UI with live title sync and "Edit" instead of "Unlock".
 */
export default function SlugField({ field, path, useAsSlug }: Readonly<SlugFieldProps>) {
  const { admin, label } = field
  const { readOnly: readOnlyFromProps } = admin || {}
  const { t } = useTranslation()
  const { collectionSlug, globalSlug } = useDocumentInfo()
  const { slugify } = useServerFunctions()
  const { setValue, showError, value } = useField<string>({ path: path || field.name })
  const { getData, getDataByPath } = useForm()
  const [isLocked, setIsLocked] = useState(true)

  const titleValue = useFormFields(([fields]) => {
    const raw = fields?.[useAsSlug]?.value
    return typeof raw === 'string' ? raw : ''
  })

  // While locked, keep the slug in sync with the title as the user types.
  useEffect(() => {
    if (readOnlyFromProps || !isLocked) return
    const next = formatSlug(titleValue)
    if (next !== (value ?? '')) {
      setValue(next)
    }
  }, [isLocked, readOnlyFromProps, setValue, titleValue, value])

  const handleGenerate = useCallback(
    async (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      const valueToSlugify = getDataByPath(useAsSlug)
      const formattedSlug = await slugify({
        collectionSlug,
        data: getData(),
        globalSlug,
        path,
        valueToSlugify,
      })

      if (formattedSlug === null || formattedSlug === undefined) {
        setValue('')
        return
      }

      if (value !== formattedSlug) {
        setValue(formattedSlug)
      }
    },
    [collectionSlug, getData, getDataByPath, globalSlug, path, setValue, slugify, useAsSlug, value],
  )

  const toggleLock = useCallback((e: React.MouseEvent<Element>) => {
    e.preventDefault()
    setIsLocked((prev) => !prev)
  }, [])

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
      </div>
      <TextInput
        AfterInput={
          readOnlyFromProps ? undefined : (
            <div className="slug-field-component__actions">
              {!isLocked && (
                <Button
                  buttonStyle="none"
                  className="lock-button"
                  id={`field-${path}-generate`}
                  onClick={handleGenerate}
                >
                  {t('authentication:generate')}
                </Button>
              )}
              <Button
                buttonStyle="none"
                className="lock-button"
                id={`field-${path}-lock`}
                onClick={toggleLock}
              >
                {isLocked ? 'Edit' : t('general:lock')}
              </Button>
            </div>
          )
        }
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnlyFromProps || isLocked)}
        showError={showError}
        value={value}
      />
    </div>
  )
}
