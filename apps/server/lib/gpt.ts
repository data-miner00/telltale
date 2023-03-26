import axios from 'axios';

export const OPENAI_BASE_URL = 'https://api.openai.com/v1';
export const OPENAI_COMPLETION_URL = OPENAI_BASE_URL + '/chat/completions';
export enum GPT_MODEL {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
}

export type CompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
  error: {
    code: number;
    message: string;
    param: string;
    type: string;
  };
};

export async function completion(prompt: string, apiToken: string) {
  try {
    const { data } = await axios.post<CompletionResponse>(
      OPENAI_COMPLETION_URL,
      {
        model: GPT_MODEL.GPT_3_5_TURBO,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    const { error } = data;
    const response = data?.choices?.map((choice) => ({
      content: choice.message.content,
    }));

    return error
      ? { data: null, error }
      : response
      ? { data: response, error: null }
      : { data: null, error: 'Unable to make request.' };
  } catch (e) {
    console.log(e);
    return { data: null, error: 'Unable to make request.' };
  }
}
