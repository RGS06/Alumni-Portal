"use client"

import { useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function SupabaseTest() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from("profiles").select("*")
      console.log("DATA:", data)
      console.log("ERROR:", error)
    }
    test()
  }, [])

  return null
}