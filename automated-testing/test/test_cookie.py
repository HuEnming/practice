import pickle
import pprint
import time
from selenium import webdriver


def save_cookies(driver, location):
    print(driver.get_cookies())
    pickle.dump(driver.get_cookies(), open(location, "wb"))


def load_cookies(driver, location, url=None):

    cookies = pickle.load(open(location, "rb"))
    driver.delete_all_cookies()
    # have to be on a page before you can add any cookies, any page - does not matter which
    driver.get("https://www.hackerrank.com/" if url is None else url)
    for cookie in cookies:
        driver.add_cookie(cookie)
    print("---------------finished")


def delete_cookies(driver, domains=None):

    if domains is not None:
        cookies = driver.get_cookies()
        original_len = len(cookies)
        for cookie in cookies:
            if str(cookie["domain"]) in domains:
                cookies.remove(cookie)
        if len(cookies) < original_len:  # if cookies changed, we will update them
            # deleting everything and adding the modified cookie object
            driver.delete_all_cookies()
            for cookie in cookies:
                driver.add_cookie(cookie)
    else:
        driver.delete_all_cookies()


# Path where you want to save/load cookies to/from aka C:\my\fav\directory\cookies.txt
cookies_location = "common/cookie/testcookie.txt"

# Initial load of the domain that we want to save cookies for
chrome = webdriver.Chrome()
chrome.get("https://www.hackerrank.com/login")
chrome.find_element_by_xpath("//input[@id='input-1']").send_keys("infunig1986")
chrome.find_element_by_xpath("//*[@id=\"input-2\"]").send_keys("TestUserAccount")
chrome.find_element_by_xpath("//*[@id=\"content\"]/div/div/div[2]/div[2]/div/div/div[2]/div/div/div[2]/div[1]/form/div[4]/button/div/span").click()
save_cookies(chrome, cookies_location)
chrome.quit()

# Load of the page you cant access without cookies, this one will fail
# chrome = webdriver.Chrome(executable_path="common/web_driver/chromedriver")
# chrome.get("https://www.hackerrank.com/settings/profile")


# Load of the page you cant access without cookies, this one will go through
chrome = webdriver.Chrome()
load_cookies(chrome, cookies_location)
chrome.get("https://www.hackerrank.com/settings/profile")
chrome.refresh()

# chrome = webdriver.Chrome()
# chrome.get("https://google.com")
# time.sleep(2)
# pprint.pprint(chrome.get_cookies())
# print "=========================\n"
#
# delete_cookies(chrome, domains=["www.google.com"])
# pprint.pprint(chrome.get_cookies())
# print "=========================\n"
#
# delete_cookies(chrome)
# pprint.pprint(chrome.get_cookies())
