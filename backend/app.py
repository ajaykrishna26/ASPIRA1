from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # To handle CORS (Cross-Origin Resource Sharing)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Example API endpoint
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python backend!"})

# Example POST endpoint
@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json  # Get data sent from the frontend
    print("Received data:", data)
    return jsonify({"status": "success", "received_data": data})

# Run the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)