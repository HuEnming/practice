from selenium import webdriver
from selenium.webdriver.common.by import By
import time


def workbook_in_zh(driver):
    # open workbook
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div").click()
    driver.find_element(By.XPATH, "/html/body/div[3]/div/ul/li[1]/div").click()
    time.sleep(1)
    driver.find_element(
        By.XPATH, "/html/body/div[3]/div/ul/li[1]/div/ul/li[5]/div"
    ).click()

    driver.save_screenshot("report/screenshot/workbook-new.png")
    # try:
    #     driver.switch_to.alert.accept()
    #     driver.save_screenshot("report/screenshot/workbook-new-after-alert.png")
    #     print("there is an alert!")  
    # except:
    #     driver.save_screenshot("report/screenshot/workbook-new.png")

