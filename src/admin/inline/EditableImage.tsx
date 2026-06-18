import { useRef, useState } from 'react'
import { ImagePlus, Loader2 } from 'lucide-react'
import { useInlineEdit } from './InlineEditContext'
import { supabase } from '../../lib/supabase'

// ─────────────────────────────────────────────────────────────────────────────
// EditableImage
//
// Fora do modo edição renderiza um <img> idêntico ao original. No modo edição,
// adiciona um overlay "Trocar imagem" que envia o arquivo ao bucket já existente
// `site-assets` (mesma lógica do painel) e grava a nova URL.
// ─────────────────────────────────────────────────────────────────────────────

interface EditableImageProps {
  sectionKey: string
  field?: string
  path?: (string | number)[]
  value: string
  alt?: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function EditableImage({ sectionKey, field, path, value, alt, className, loading }: EditableImageProps) {
  const { isAdmin, editing, getValue, setField, slug } = useInlineEdit()
  const targetPath = path ?? [field as string]
  const display = getValue(sectionKey, targetPath, value ?? '')
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const img = <img src={display} alt={alt} className={className} loading={loading} />

  if (!isAdmin || !editing) return img

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${slug}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
      const filePath = `uploads/${fileName}`
      const { error } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(filePath)
      setField(sectionKey, targetPath, publicUrl)
    } catch (err: any) {
      console.error('Erro ao enviar imagem:', err)
      alert('Erro ao enviar a imagem: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <span className="relative block w-full h-full">
      {img}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
        disabled={uploading}
        className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-white text-[11px] font-bold uppercase tracking-wider opacity-0 hover:opacity-100 transition-opacity"
        style={{ outline: '1px dashed rgba(223, 183, 88, 0.7)' }}
      >
        {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
        <span>{uploading ? 'Enviando...' : 'Trocar imagem'}</span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </span>
  )
}
