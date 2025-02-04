from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from model import answer

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/parse', methods=['POST'])
def process_json():
    try:
        input_data = request.get_json()
        if "message" not in input_data:  # Match frontend key "message"
            return jsonify({"error": "Missing 'message' key in request JSON"}), 400

        query = input_data["message"]
        print(f"Received query: {query}")

        response = answer(query)  # Get response from model

        return jsonify({"output": response})  # Ensure frontend expects "output"

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
