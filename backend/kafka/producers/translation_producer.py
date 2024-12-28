from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('translation-requests', b'{"text": "Hello, world!", "lang": "en-ar"}')
print("Message sent!")
producer.close()
