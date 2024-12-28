import requests
url = "http://your_domain_or_IP/translate/en2ar"
headers = {"Authorization": "Basic base64-encoded-credentials"}
payload = {"text": "hello"}
response = requests.post(url, json=payload, headers=headers)
print(response.status_code, response.json())
