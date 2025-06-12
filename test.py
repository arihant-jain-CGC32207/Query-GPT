import openai

# Set your OpenAI API key here
openai.api_key = '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'

try:
    # Make a test API call using the new method
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Use the desired model (or "gpt-3.5-turbo")
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say hello, world!"}
        ],
        temperature=0.2
    )

    print("API Key is valid!")
    print("Response:", response['choices'][0]['message']['content'])

except Exception as e:
    print("Error with API key:", e)
