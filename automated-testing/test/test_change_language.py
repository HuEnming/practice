import os, sys
import selenium.webdriver

#sys.path.append(os.getcwd)
#print(os.getcwd)
from testcases.base.initialize_driver import init_driver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select


def setup():
    global driver
    driver = selenium.webdriver.Firefox(executable_path="common/web_driver/geckodriver")


def test_change_language():
    actions = ActionChains(driver)
    actions.move_to_element(
        driver.find_element(By.XPATH, "/html/body/div[3]/div/ul/li[5]/div")
    ).perform()
    driver.find_element(
        By.CSS_SELECTOR,
        "#osjs-context-menu > ul:nth-child(1) > li:nth-child(5) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1)",
    ).click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/div[1]/div/div[1]/div[4]"
    ).click()
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
    assert driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/span").text == "菜单"

