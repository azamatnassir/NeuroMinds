from transformers import GPTNeoForCausalLM, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("EleutherAI/gpt-neo-2.7B")
model = GPTNeoForCausalLM.from_pretrained("EleutherAI/gpt-neo-2.7B")

input_text = "Как ты?"
inputs = tokenizer(input_text, return_tensors="pt")

outputs = model.generate(inputs["input_ids"], max_length=50)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))