import os
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client['linkvault_db']
bookmarks_col = db['bookmarks']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/bookmarks', methods=['GET'])
def get_bookmarks():
    tag = request.args.get('tag')
    query = {}
    if tag:
        query = {'tags': tag}
    
    bookmarks = list(bookmarks_col.find(query).sort('created_at', -1))
    for b in bookmarks:
        b['_id'] = str(b['_id'])
    return jsonify(bookmarks)

@app.route('/api/bookmarks', methods=['POST'])
def add_bookmark():
    data = request.json
    url = data.get('url')
    title = data.get('title', url)
    tags = data.get('tags', [])
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
        
    new_bookmark = {
        'url': url,
        'title': title,
        'tags': [tag.strip().lower() for tag in tags if tag.strip()],
        'created_at': datetime.utcnow()
    }
    
    result = bookmarks_col.insert_one(new_bookmark)
    new_bookmark['_id'] = str(result.inserted_id)
    return jsonify(new_bookmark), 201

@app.route('/api/bookmarks/<id>', methods=['DELETE'])
def delete_bookmark(id):
    result = bookmarks_col.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return jsonify({'message': 'Deleted successfully'})
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/tags', methods=['GET'])
def get_tags():
    tags = bookmarks_col.distinct('tags')
    return jsonify(tags)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
