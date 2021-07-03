from flask import Flask, request, Response

from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import T5ForConditionalGeneration, T5Tokenizer
def get_transcript(id):
    str_transcript = ""
    transcript = YouTubeTranscriptApi.get_transcript(id,languages=['en-IN','en'])
    for detail in transcript:
        str_transcript+=detail['text']+" "
    temp = str_transcript.split('\n')
    str_transcript =' '
    for word in temp:
        str_transcript+=word + ' '
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
    min_length=100, 
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True)
    return(tokenizer.decode(outputs[0]))

app = Flask(__name__)

# define your resource endpoints
@app.route('/')
def index_page():
    return "Hello world"

@app.route('/api/summarize', methods=['GET'])
def get_():
    url = request.args.get('youtube_url')
    temp = url.split('=')
    video_id = temp[1]
    transcript = get_transcript(video_id)
    return Response(abs_summarizer(transcript),status=201)

# server the app when this file is run
if __name__ == '__main__':
    app.run()



# url = "https://www.youtube.com/watch?v=OY2jMXKVhIw"
# temp = url.split('=')
# video_id = temp[1]
# transcript = get_transcript(video_id)
# print(abs_summarizer(transcript))