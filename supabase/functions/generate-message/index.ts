import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { relationship } = await req.json()
    console.log('Generating message for relationship:', relationship)

    if (!relationship) {
      throw new Error('Relationship is required')
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error('OpenAI API key not found')
      throw new Error('OpenAI API key not configured')
    }

    console.log('Making request to OpenAI API...')
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates heartfelt messages for different types of relationships. Keep messages under 100 words and make them personal and emotional.'
          },
          {
            role: 'user',
            content: `Generate a heartfelt message for my ${relationship}. Make it personal and emotional, but keep it under 100 words.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      
      // Check for quota exceeded error
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI service is currently unavailable. Please try writing your own message.' }),
          { 
            status: 503,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`)
    }

    const data = await response.json()
    console.log('OpenAI response:', data)

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response structure:', data)
      throw new Error('Invalid response structure from OpenAI')
    }

    return new Response(
      JSON.stringify({ message: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-message function:', error)
    
    // Provide a more user-friendly error message
    const errorMessage = error.message.includes('insufficient_quota')
      ? 'AI service is currently unavailable. Please try writing your own message.'
      : 'Failed to generate message. Please try again.'
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})