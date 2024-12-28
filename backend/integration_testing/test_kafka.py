from kafka import KafkaProducer, KafkaConsumer

# Producer Test
producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('translation-requests', b'{"text": "hello"}')
print("Producer test passed!")

# Consumer Test
consumer = KafkaConsumer('translation-requests', bootstrap_servers='localhost:9092')
for message in consumer:
    print(f"Consumer test passed: {message.value.decode('utf-8')}")
    break
