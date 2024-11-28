from flask import Flask, jsonify
from flask_cors import CORS 
import json
import requests

app = Flask(__name__)
CORS(app)

# JSON dosyasını yükleme
with open('products.json') as f:
    products = json.load(f)

# Altın fiyatını almak için fonksiyon
def get_gold_price():
    try:
        # Open Exchange Rates API URL ve Key
        api_url = "https://openexchangerates.org/api/latest.json"
        api_key = "be7a4d2920464ea6ba63ad4d93b79cb4"  # Sizin API Key'iniz
        params = {"app_id": api_key}

        # API'den döviz verilerini al
        response = requests.get(api_url, params=params)
        
        # HTTP durum kodunu kontrol et
        if response.status_code != 200:
            print(f"API Hatası: HTTP {response.status_code}")
            return None

        data = response.json()

        # 'rates' ve 'TRY' anahtarlarını kontrol et
        if 'rates' not in data or 'TRY' not in data['rates']:
            print("API yanıtında 'rates' veya 'TRY' anahtarı bulunamadı.")
            return None

        # USD/TRY kurunu alın
        usd_to_try = data['rates']['TRY']

        # 1 ons altın fiyatını belirle (örnek: 1900 USD)
        gold_price_per_ounce_usd = 1900.0  # Sabit bir altın ons fiyatı

        # Gram altın fiyatını hesapla
        gold_price_per_gram_try = (gold_price_per_ounce_usd / 31.1035) * usd_to_try
        return round(gold_price_per_gram_try, 2)
    except Exception as e:
        print(f"Altın fiyatı alınamadı: {e}")
        return None

# Ürünleri listeleyen endpoint
@app.route('/products', methods=['GET'])
def get_products():
    gold_price = get_gold_price()
    if gold_price is None:
        return jsonify({"error": "Altın fiyatı alınamadı"}), 500

    updated_products = []
    for product in products:
        # Ürün fiyatını hesapla
        product['price'] = round((product['popularityScore'] + 1) * product['weight'] * gold_price, 2)
        updated_products.append(product)
    return jsonify(updated_products)

# Flask uygulamasını çalıştırma
if __name__ == '__main__':
    app.run(debug=True)
