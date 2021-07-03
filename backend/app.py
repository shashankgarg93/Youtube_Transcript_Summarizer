from flask import Flask
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import T5ForConditionalGeneration, T5Tokenizer

# define a variable to hold you app
# app = Flask(__name__)

# # define your resource endpoints
# app.route('/')
# def index_page():
#     return "Hello world"

# app.route('/time', methods=['GET'])
# def get_time():
#     return str(datetime.datetime.now())

# # server the app when this file is run
# if __name__ == '__main__':
#     app.run()

def get_transcript(id):
    str_transcript = ""
    transcript = YouTubeTranscriptApi.get_transcript(id,languages=['en-IN','en'])
    for detail in transcript:
        str_transcript+=detail['text']+" "
    return str_transcript

def abs_summarizer(transcript):
    # initialize the model architecture and weights
    model = T5ForConditionalGeneration.from_pretrained("t5-base")
    # initialize the model tokenizer
    tokenizer = T5Tokenizer.from_pretrained("t5-base")
    inputs = tokenizer.encode("summarize: " + transcript, return_tensors="pt", max_length=1024, truncation=True)
    outputs = model.generate(
    inputs, 
    max_length=300, 
    min_length=50, 
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True)
# just for debugging
    print(outputs)
    print(tokenizer.decode(outputs[0]))

#idontknow
(abs_summarizer(get_transcript("ezlG2DyiXM0")))