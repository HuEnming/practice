from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select
import time


def setting_language(driver):
    # initialize
    #driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")
    # login
    #driver.get(
    #    "file:///usr/local/home/u200601/Code/CS440/mule-system2/bin/login-test.html"
    #)
    # driver.get("file:///home/enming/Code/CS440/mule-system2/bin/login-test.html")
    #driver.find_element(By.ID, "data").clear()
    #driver.find_element(By.ID, "data").send_keys(
    #    '{targetURL: "https://localhost/login", secret: "test_LTI_SECRET",oauth_consumer_key: "test_LTI_KEY",user_id: "1000",context_id: "1000",         lis_person_contact_email_primary: "some.user@email.ie", context_title: "Test Course Space (2018-19)",roles: "Instructor", tool_consumer_instance_guid: "2019.localhost", lis_person_name_full: "Some User", custom_role: "lecturer"} '
    #)
    #driver.find_element(By.ID, "testbutton").click()
    #driver.find_element(By.XPATH, "/html/body/button[2]").click()
    #driver.refresh()
    
    # setting language
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div").click()  # menu
    driver.find_element(
        By.XPATH, '//*[@id="osjs-context-menu"]/ul/li[5]/div'
    ).click()  # utilities
    time.sleep(1)
    driver.find_element(
        By.XPATH, "/html/body/div[3]/div/ul/li[5]/div/ul/li[2]/div"
    ).click()  # settings

    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/div[1]/div/div[1]/div[4]"
    ).click()  # local
    language_select = Select(
        driver.find_element(
            By.XPATH,
            "/html/body/div[5]/div/div[2]/div/div[1]/div/div[2]/div[4]/div/div[2]/div/select",
        )
    )
    language_select.select_by_value("zh_CN")
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/div[2]/div/div/button"
    ).click()
    driver.refresh()
    assert driver.find_element_by_xpath("/html/body/div[4]/div[1]/div/span").text == "菜单"

# setTimeout(function(){debugger},3000)
