# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies and update SSL certificates
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && apt-get clean

# Upgrade pip and install dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir --timeout=300 --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org -r requirements.txt

# Expose port 8000 (or your chosen port)
EXPOSE 8000

# Define the command to run your app (if applicable)
CMD ["python", "your_app.py"]
