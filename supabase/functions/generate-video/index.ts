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
    const { message, voiceRecording, theme } = await req.json()
    console.log('Generating video with:', { message, theme })

    const response = await fetch('https://api.runwayml.com/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RUNWAY_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Create a beautiful video with text animation for the message: ${message}`,
        theme: theme,
        audio: voiceRecording,
      }),
    })

    const data = await response.json()
    console.log('Runway ML response:', data)
    
    return new Response(
      JSON.stringify({ videoUrl: data.output.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating video:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})