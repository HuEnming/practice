import pickle
import selenium.webdriver
import time

driver = selenium.webdriver.Firefox(executable_path="common/web_driver/geckodriver")
driver.get("file:///usr/local/home/u200601/Code/CS440/mule-system2/bin/login-test.html")
# driver.get("file:///home/enming/Code/CS440/mule-system2/bin/login-test.html")
driver.find_element_by_id("data").clear()
driver.find_element_by_id("data").send_keys(
    '{targetURL: "https://localhost/login", secret: "test_LTI_SECRET",oauth_consumer_key: "test_LTI_KEY",user_id: "1000",context_id: "1000",         lis_person_contact_email_primary: "some.user@email.ie", context_title: "Test Course Space (2018-19)",roles: "Instructor", tool_consumer_instance_guid: "2019.localhost", lis_person_name_full: "Some User", custom_role: "lecturer"} '
)
driver.find_element_by_id("testbutton").click()
driver.find_element_by_xpath("/html/body/button[2]").click()

driver.refresh()

print(driver.get_cookies())
print("--------")
pickle.dump( driver.get_cookies() , open("common/cookie/testcookie.pkl","wb"))#3cookies
#time.sleep(60)
driver.quit()

driver = selenium.webdriver.Firefox(executable_path="common/web_driver/geckodriver")
driver.get("https://localhost") #2cookies
driver.delete_all_cookies()#1cookie
#driver.add_cookie({'name': 'connect.sid', 'value': 's%3A_7iZuFhNaDVwKuYrEOia8VLbf1Yvaiqo.gUsgjd9AKcDyKvm%2FbgoqUWoVjW5PPnWBBxrjL%2FgZgtQ', 'path': '/', 'domain': 'localhost', 'secure': True, 'httpOnly': True, 'expiry': 1583217214})
cookies = pickle.load(open("common/cookie/testcookie.pkl", "rb"))
for cookie in cookies: 
    print("*****")
    print(cookie)
    driver.add_cookie(cookie)
    driver.add_cookie(cookie)
# time.sleep(3)
driver.get("https://localhost") 