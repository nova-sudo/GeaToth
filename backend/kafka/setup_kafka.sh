#!/bin/bash
kafka-topics.sh --create --topic translation-requests --bootstrap-server localhost:9092
kafka-topics.sh --create --topic translation-responses --bootstrap-server localhost:9092
kafka-topics.sh --create --topic summarization-requests --bootstrap-server localhost:9092
kafka-topics.sh --create --topic summarization-responses --bootstrap-server localhost:9092
