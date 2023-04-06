import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from 'openai'

type Feedback = {
    country: string,
}

const openai = new OpenAIApi(
  new Configuration({
    apiKey: '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',
  })
)

export async function POST(request: Request) {
    const data: Feedback = await request.json()
    console.log('data: ', data)

    const { country } = data
    console.log('country: ', country);

    let chatRes: string = 'no res yet';

    await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Greet me in a language native to ${country}`,
          },
        ],
      })
      .then((res) => {
        console.log('res: ', res)
        chatRes = res?.data?.choices[0]?.message?.content || ''
      })


    return NextResponse.json({ chatRes })
}
