from flask import Flask
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi

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

# print(get_transcript("ezlG2DyiXM0"))