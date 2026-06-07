import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useDynamicContent(pageKey: string, defaultData: any) {
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    // 1. Fetch from Supabase
    async function loadData() {
      try {
        // Query section_key matching pageKey prefix, or the exact nossa_equipe_members key
        const { data: dbData, error } = await supabase
          .from('site_sections')
          .select('*')
          .eq('site_slug', 'smartcompany')
          .or(`section_key.like.${pageKey}_%,section_key.eq.nossa_equipe_members`)

        if (error) throw error

        if (dbData && dbData.length > 0) {
          const updated = { ...defaultData }
          
          dbData.forEach((sec: any) => {
            const key = sec.section_key.replace(`${pageKey}_`, '')
            
            if (sec.section_key === 'nossa_equipe_members') {
              updated.members = sec.metadata?.members ?? defaultData.members ?? []
            } else if (sec.section_key === 'recomendacoes_items') {
              updated.books = sec.metadata?.books ?? defaultData.books ?? []
              updated.movies = sec.metadata?.movies ?? defaultData.movies ?? []
            } else if (sec.section_key === 'valuation_opportunities') {
              updated.opportunities = sec.metadata?.opportunities ?? defaultData.opportunities ?? []
            } else if (sec.section_key === 'valuation_phases') {
              updated.phases = sec.metadata?.phases ?? defaultData.phases ?? []
            } else if (key === 'hero') {
              updated.hero = {
                badge: sec.metadata?.badge ?? defaultData.hero?.badge ?? '',
                title: sec.title ?? defaultData.hero?.title ?? '',
                subtitle: sec.metadata?.subtitle ?? defaultData.hero?.subtitle ?? '',
                content: sec.content ?? defaultData.hero?.content ?? ''
              }
            } else if (key === 'mvv') {
              updated.mvv = {
                mission: sec.metadata?.mission ?? defaultData.mvv?.mission ?? '',
                vision: sec.metadata?.vision ?? defaultData.mvv?.vision ?? '',
                purpose_o_que: sec.metadata?.purpose_o_que ?? defaultData.mvv?.purpose_o_que ?? '',
                purpose_como: sec.metadata?.purpose_como ?? defaultData.mvv?.purpose_como ?? '',
                purpose_por_que: sec.metadata?.purpose_por_que ?? defaultData.mvv?.purpose_por_que ?? ''
              }
            } else if (key === 'values') {
              updated.values = sec.metadata?.values ?? defaultData.values ?? []
            } else if (key === 'founder') {
              updated.founder = {
                founder_name: sec.metadata?.founder_name ?? defaultData.founder?.founder_name ?? '',
                founder_title: sec.metadata?.founder_title ?? defaultData.founder?.founder_title ?? '',
                image_url: sec.metadata?.image_url ?? defaultData.founder?.image_url ?? '',
                quote: sec.metadata?.quote ?? defaultData.founder?.quote ?? '',
                experience_summary: sec.metadata?.experience_summary ?? defaultData.founder?.experience_summary ?? '',
                biography: sec.content ?? defaultData.founder?.biography ?? ''
              }
            } else if (key === 'timeline') {
              updated.timeline = sec.metadata?.events ?? defaultData.timeline ?? []
            } else if (key === 'reasons') {
              updated.reasons = sec.metadata?.reasons ?? defaultData.reasons ?? []
            } else if (key === 'faqs') {
              updated.faqs = sec.metadata?.faqs ?? defaultData.faqs ?? []
            } else if (key === 'stats') {
              updated.stats = sec.metadata?.stats ?? defaultData.stats ?? []
            } else if (key === 'pillars') {
              updated.pillars = sec.metadata?.pillars ?? defaultData.pillars ?? []
            } else if (key === 'clients') {
              updated.clients = sec.metadata?.clients ?? defaultData.clients ?? []
              updated.clientsTitle = sec.title ?? defaultData.clientsTitle ?? ''
              updated.clientsDesc = sec.content ?? defaultData.clientsDesc ?? ''
            } else {
              // Generic fallback for any other sections (e.g. journeys, ebooks, painPoints, modules, bonuses, etc.)
              let contentVal = sec.content
              if (sec.content && (sec.content.trim().startsWith('{') || sec.content.trim().startsWith('['))) {
                try {
                  contentVal = JSON.parse(sec.content)
                } catch (e) {
                  // Not a valid JSON, keep as string
                }
              }

              if (defaultData[key] !== undefined) {
                if (Array.isArray(defaultData[key])) {
                  updated[key] = Array.isArray(contentVal) ? contentVal : (sec.metadata?.[key] ?? defaultData[key])
                } else if (typeof defaultData[key] === 'object' && defaultData[key] !== null) {
                  if (typeof contentVal === 'object' && contentVal !== null) {
                    updated[key] = { ...defaultData[key], ...contentVal }
                  } else {
                    updated[key] = {
                      title: sec.title ?? defaultData[key].title ?? '',
                      content: sec.content ?? defaultData[key].content ?? '',
                      ...defaultData[key],
                      ...(sec.metadata ?? {})
                    }
                  }
                } else {
                  updated[key] = sec.content ?? defaultData[key]
                }
              } else {
                updated[key] = contentVal ?? {
                  title: sec.title,
                  content: sec.content,
                  ...sec.metadata
                }
              }
            }
          })
          
          setData(updated)
        }
      } catch (err) {
        console.error(`Erro ao carregar conteúdo dinâmico para a página ${pageKey}:`, err)
      }
    }

    loadData()

    // 2. Listen to live preview message events from parent Dashboard builder
    const handleMessage = (event: MessageEvent) => {
      const msgPageKey = event.data?.pageKey
      if (
        event.data?.type === 'LIVE_PREVIEW_UPDATE' &&
        (msgPageKey === pageKey ||
         msgPageKey === pageKey.replace('_', '-') ||
         msgPageKey?.replace(/-/g, '') === pageKey.replace(/_/g, ''))
      ) {
        setData((prev: any) => ({ ...prev, ...event.data.data }))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [pageKey])

  return data
}
