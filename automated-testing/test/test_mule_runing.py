from selenium import webdriver
import time
import pickle
import json


def test_setup():
    global driver
    driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")
    #driver = webdriver.Chrome(executable_path="common/web_driver/chromedriver")
    driver.implicitly_wait(5)


def test_gitlab():
    #driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")
    driver.get("https://gitlab.cs.nuim.ie/users/sign_in")
    driver.find_element_by_id("username").send_keys("")
    driver.find_element_by_id("password").send_keys("")
    driver.find_element_by_id("new_ldap_user").submit()
    save_cookie_json(driver, "common/cookie/cookie.pkl")
    time.sleep(2)



def qtest_gitlab_cookie():
    driver.get("https://gitlab.cs.nuim.ie/")
    load_cookie_json(driver, "common/cookie/cookie.pkl")
    #time.sleep(8)
    driver.refresh()
    #driver.get("https://gitlab.cs.nuim.ie/")

    try: 
        driver.find_element_by_xpath("/html/body/div[2]/div/div[3]/div/div/div[1]/h1")
    except:
        print("__________not found")
        #qtest_gitlab()


def qtest_login():
    driver.get("https://localhost/")
    load_cookie_with(driver, "common/cookie/cookie.pkl")
    driver.refresh()
    try:
        driver.find_element_by_xpath("/html/body/div[4]/div[1]/div/span")
    except:
        send_request()
    title = driver.title
    assert title == "OS.js"


def send_request():
    driver.get(
        "file:///usr/local/home/u200601/Code/CS440/mule-system2/bin/login-test.html"
    )
    driver.find_element_by_id("data").clear()
    driver.find_element_by_id("data").send_keys(
        '{targetURL: "https://localhost/login", secret: "test_LTI_SECRET",oauth_consumer_key: "test_LTI_KEY",user_id: "1000",context_id: "1000",         lis_person_contact_email_primary: "some.user@email.ie", context_title: "Test Course Space (2018-19)",roles: "Instructor", tool_consumer_instance_guid: "2019.localhost", lis_person_name_full: "Some User", custom_role: "lecturer"} '
    )
    driver.find_element_by_id("testbutton").click()
    driver.find_element_by_xpath("/html/body/button[2]").click()
    driver.refresh()
    save_cookie_json(driver, "common/cookie/cookie.pkl")


def save_cookie_json(driver, path):
    open(path, "w").write(json.dumps(driver.get_cookies()))

def load_cookie_json(driver, path):
    cookies = json.loads(open(path).read())
    for cookie in cookies:
        print(cookie)
        driver.add_cookie(cookie)

#not work for "wb" parameter
def save_cookie_pickle(driver, path):
    pickle.dump(driver.get_cookies(), open(path, "wb"))

#not work for "wb" parameter
def load_cookie_pickle(driver, path):
    cookies = pickle.load(open(path, "rb"))
    for cookie in cookies:
        driver.add_cookie(cookie)

#no erro
def save_cookie_with(driver, path):
    with open(path, 'w') as filehandler:
        pickle.dump(driver.get_cookies(), filehandler)

#"rb" is necessary
def load_cookie_with(driver, path):
     with open(path, 'rb') as cookiesfile:
         cookies = pickle.load(cookiesfile)
         for cookie in cookies:
             driver.add_cookie(cookie)
  


def test_teardown():
    time.sleep(2)
    driver.close()
    driver.quit()


def qq_mail():
    driver.get(
        "https://mail.qq.com/cgi-bin/frame_html?sid=YxNdnqKCHO20MQFf&r=bc43edd3eddf67f03a7dec2952097f10"
    )
    driver.find_elements_by_id("u").send_keys("")
    driver.find_elements_by_id("p").send_keys("")
    driver.find_elements_by_id("login_button").click()
    time.sleep(5000)
    save_cookie_json(driver, "common/cookie/cookie.txt")
    load_cookie_json(driver, "common/cookie/cookie.txt")
    driver.refresh()
