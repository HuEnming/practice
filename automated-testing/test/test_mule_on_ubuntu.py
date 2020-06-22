from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select
import pickle
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import json

def test_setup():
    global driver
    driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")
    driver.implicitly_wait(5)
    # driver.maximize_window()


def test_login_with_cookie():
    
    load_cookie(driver,"common/cookie/cookie.pkl")
    driver.get("https://localhost/")
    driver.refresh()
    try:
        driver.find_element_by_xpath("/html/body/div[4]/div[1]/div/span")
    except:
        print("-----------not found")
        #login_with_request()


def login_with_request():
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
    save_cookie(driver,"common/cookie/cookie.pkl")
    time.sleep(2)


def test_setting_language():
    actions = ActionChains(driver)
    actions.move_to_element(
        driver.find_element_by_xpath("/html/body/div[3]/div/ul/li[5]/div")
    ).perform()
    driver.find_elements_by_css_selector(
        "#osjs-context-menu > ul:nth-child(1) > li:nth-child(5) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1)"
    )[0].click()

    driver.find_element_by_xpath(
        "/html/body/div[5]/div/div[2]/div/div[1]/div/div[1]/div[4]"
    ).click()

    language_select = Select(
        driver.find_elements_by_xpath(
            "/html/body/div[5]/div/div[2]/div/div[1]/div/div[2]/div[4]/div/div[2]/div/select"
        )[0]
    )
    language_select.select_by_value("zh_CN")
    driver.find_element_by_xpath(
        "/html/body/div[5]/div/div[2]/div/div[2]/div/div/button"
    ).click()
    driver.refresh()
    assert driver.find_element_by_xpath("/html/body/div[4]/div[1]/div/span").text == "菜单"


def qtest_about():
    driver.find_elements_by_css_selector(".osjs-panel-item--clickable")[0].click()
    # driver.find_element_by_xpath('/html/body/div[3]/div/ul/li[4]/div').click()
    actions = ActionChains(driver)
    actions.move_to_element(
        driver.find_element_by_xpath("/html/body/div[3]/div/ul/li[4]/div")
    ).perform()

    driver.find_element_by_xpath(
        "/html/body/div[3]/div/ul/li[4]/div/ul/li[1]/div"
    ).click()
    assert (
        driver.find_element_by_xpath("/html/body/div[5]/div/div[1]").text == "About MULE"
    )


def save_cookie(driver, path):
    with open(path, "w") as cookief:
        cookief.write(json.dumps(driver.get_cookies()))

def load_cookie(driver, path):
    cookies = json.loads(open(path).read())
    for cookie in cookies:
        print(cookie)
        driver.add_cookie(cookie)
    # driver.get("https://localhost/")
    # driver.delete_all_cookies()
    # with open("common/cookie/cookie.pkl", "r") as cookief:
    #     # 使用json读取cookies 注意读取的是文件 所以用load而不是loads
    #     cookieslist = json.load(cookief)
    #     # 方法1 将expiry类型变为int
    #     for cookie in cookieslist:
    #         # 并不是所有cookie都含有expiry 所以要用dict的get方法来获取
    #         #if isinstance(cookie.get("expiry"), float):
    #         #    cookie["expiry"] = int(cookie["expiry"])
    #         driver.add_cookie(cookie)

        # 方法2删除该字段
        # for cookie in cookieslist:
        #     #该字段有问题所以删除就可以  浏览器打开后记得刷新页面 有的网页注入cookie后仍需要刷新一下
        #     if 'expiry' in cookie:
        #         del cookie['expiry']
        #     driver.add_cookie(cookie)

def test_teardown():
    time.sleep(2)
    title = driver.title
    assert title == "OS.js"
    driver.close()
    driver.quit()
