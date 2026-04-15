import os
import sys

# Flask
from flask import Flask, redirect, url_for, request, render_template, Response, jsonify
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# Preprocessing utilities
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Model building
from tensorflow.keras import layers
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import Sequential
from tensorflow.keras.applications import DenseNet121
from keras.callbacks import Callback, ModelCheckpoint

from PIL import Image
from models.model import build_model, preprocess_image

# Utilities
import numpy as np
from utils import base64_to_pil


# Create Flask application
app = Flask(__name__)

# Model path
MODEL_PATH = './models/pretrained/model.h5'

# Load trained model
model = build_model()
model.load_weights(MODEL_PATH)
print('Model loaded. Start serving...')


def model_predict(img, model):
    """
    Predict DR severity from retinal image
    """

    # Preprocess image
    x_val = np.empty((1, 224, 224, 3), dtype=np.uint8)

    img = img.resize((224, 224), resample=Image.LANCZOS)
    x_val[0, :, :, :] = img

    preds = model.predict(x_val)

    return preds


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Convert base64 image to PIL
        img = base64_to_pil(request.json)

        # Predict
        preds = model_predict(img, model)

        # Get highest probability
        max_prob = np.amax(preds)
        pred_class = np.argmax(np.squeeze(preds))

        # Threshold validation (for non-fundus images)
        if max_prob < 0.50:
            return jsonify(
                result="Error: Uploaded image is not a retinal fundus image. Please upload a valid fundus image.",
                probability="0"
            )

        diagnosis = ["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"]

        result = diagnosis[pred_class]
        pred_proba = "{:.3f}".format(max_prob)

        return jsonify(
            result=result,
            probability=pred_proba
        )

    except Exception as e:
        return jsonify(
            result="Error processing image. Please upload a valid retinal fundus image.",
            probability="0"
        )


if __name__ == '__main__':
    port = 5000
    print(f"http://localhost:{port}")

    http_server = WSGIServer(('0.0.0.0', port), app)
    http_server.serve_forever()