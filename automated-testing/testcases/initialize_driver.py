import selenium.webdriver
from selenium.webdriver.common.by import By


def init_driver():
    return selenium.webdriver.Firefox(executable_path="common/web_driver/geckodriver")


def login_mule(driver):
    driver.implicitly_wait(5)
    driver.get(
        "file:///usr/local/home/u200601/Code/CS440/mule-system2/bin/login-test.html"
    )
    # driver.get("file:///home/enming/Code/CS440/mule-system2/bin/login-test.html")
    driver.find_element(By.ID, "data").clear()
    driver.find_element(By.ID, "data").send_keys(
        '{targetURL: "https://localhost/login", secret: "test_LTI_SECRET",oauth_consumer_key: "test_LTI_KEY",user_id: "1000",context_id: "1000",         lis_person_contact_email_primary: "some.user@email.ie", context_title: "Test Course Space (2018-19)",roles: "Instructor", tool_consumer_instance_guid: "2019.localhost", lis_person_name_full: "Some User", custom_role: "lecturer"} '
    )
    driver.find_element(By.ID, "testbutton").click()
    driver.find_element(By.XPATH, "/html/body/button[2]").click()
    driver.refresh()

