import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()

    const response = await fetch('https://api.resemble.ai/v2/clips', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEMBLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        voice_uuid: 'your-voice-uuid', // You'll need to create a voice in Resemble AI
        output_format: 'mp3',
      }),
    })

    const data = await response.json()
    
    return new Response(
      JSON.stringify({ audioUrl: data.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})