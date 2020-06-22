from selenium import webdriver
from selenium.webdriver.common.by import By
import time


def monacoreact_in_zh(driver):
    # open monacoreact
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div").click()
    driver.find_element(By.XPATH, "/html/body/div[3]/div/ul/li[1]/div").click()
    time.sleep(1)
    driver.find_element(
        By.XPATH, "/html/body/div[3]/div/ul/li[1]/div/ul/li[2]/div"
    ).click()

    # new
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[1]"
    ).click()
    #driver.save_screenshot("report/screenshot/monacoreact-new.png")
    try:
        driver.switch_to.alert.accept()
        driver.save_screenshot("report/screenshot/monacoreact-new-after-alert.png")
        print("there is an alert!")  
        #driver.save_screenshot("report/screenshot/monacoreact-new.png")
    except:
        driver.save_screenshot("report/screenshot/monacoreact-new.png")
         
    #     driver.save_screenshot("report/screenshot/monacoreact-new-after-alert.png")
    #driver.save_screenshot("report/screenshot/monacoreact-new-after-alert.png")

    # open
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[2]"
    ).click()
    # try:
    #     driver.switch_to.alert.accept()
    #     driver.save_screenshot("report/screenshot/monacoreact-open-after-alert.png")
    #     print("there is an alert!") 
    # except:
    #     driver.save_screenshot("report/screenshot/monacoreact-open.png")
    driver.save_screenshot("report/screenshot/monacoreact-open.png")

    # save
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[3]"
    ).click()
    # try:
    #     driver.switch_to.alert.accept()
    #     driver.save_screenshot("report/screenshot/monacoreact-save-after-alert.png")
    #     print("there is an alert!") 
    # except:
    #     driver.save_screenshot("report/screenshot/monacoreact-save.png")
    driver.save_screenshot("report/screenshot/monacoreact-save.png")
    
    # save as
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[4]"
    ).click()
    # try:
    #     driver.switch_to.alert.accept()
    #     driver.save_screenshot("report/screenshot/monacoreact-saveas-after-alert.png")
    #     print("there is an alert!") 
    # except:
    #     driver.save_screenshot("report/screenshot/monacoreact-saveas.png")
    driver.save_screenshot("report/screenshot/monacoreact-saveas.png")

    # save as
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[5]"
    ).click()
    # try:
    #     driver.switch_to.alert.accept()
    #     driver.save_screenshot("report/screenshot/monacoreact-saveas-after-close.png")
    #     print("there is an alert!") 
    # except:
    #     driver.save_screenshot("report/screenshot/monacoreact-close.png")
    driver.save_screenshot("report/screenshot/monacoreact-close.png")

    # if driver.switch_to.alert:
    #     print("there is an alert!")
    #     driver.switch_to.alert.accept().accept()
    # else:
    #     driver.save_screenshot("report/screenshot/monacoreact-save.png")
    # driver.save_screenshot("report/screenshot/monacoreact-save-after-alert.png")

    # except RuntimeError:
    #     print("can not find element")
    # driver.save_screenshot("report/screenshot/monacoreact-open.png")
