from kafka import KafkaConsumer

consumer = KafkaConsumer('translation-responses', bootstrap_servers='localhost:9092')
for message in consumer:
    print(f"Received: {message.value.decode('utf-8')}")
#comment 