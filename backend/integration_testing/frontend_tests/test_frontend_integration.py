from selenium import webdriver

driver = webdriver.Chrome()
driver.get("http://frontend-url")
assert "Translation" in driver.title
# Add interaction tests
