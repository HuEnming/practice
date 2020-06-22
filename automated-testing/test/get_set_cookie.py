import pickle
import selenium.webdriver
import time

driver = selenium.webdriver.Firefox(executable_path="common/web_driver/geckodriver")
driver.get("https://www.hackerrank.com/login")
driver.find_element_by_xpath("//input[@id='input-1']").send_keys("infunig1986")
driver.find_element_by_xpath("//*[@id=\"input-2\"]").send_keys("TestUserAccount")
driver.find_element_by_xpath("//*[@id=\"content\"]/div/div/div[2]/div[2]/div/div/div[2]/div/div/div[2]/div[1]/form/div[4]/button/div/span").click()
print(driver.get_cookies())
print("-----------------")
pickle.dump( driver.get_cookies() , open("common/cookie/testcookie.pkl","wb"))#3cookies
#time.sleep(60)
driver.quit()

driver = selenium.webdriver.Firefox(executable_path="common/web_driver/geckodriver")
driver.get("https://www.hackerrank.com/settings/profile") #2cookies
driver.delete_all_cookies()#1cookie
cookies = pickle.load(open("common/cookie/testcookie.pkl", "rb"))
for cookie in cookies: 
    print("*****")
    print(cookie)
    driver.add_cookie(cookie)
# time.sleep(3)
driver.get("https://www.hackerrank.com/settings/profile") 