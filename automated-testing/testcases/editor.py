from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.keys import Keys
from setting_language import setting_language
from initialize_driver import init_driver
from initialize_driver import login_mule


def editor_in_zh(driver):
    # open editor
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div").click()
    driver.find_element(By.XPATH, "/html/body/div[3]/div/ul/li[1]/div").click()
    time.sleep(1)
    driver.find_element(
        By.XPATH, "/html/body/div[3]/div/ul/li[1]/div/ul/li[1]/div"
    ).click()

    # check locolization on title and main manue
    assert (
        driver.find_element(By.XPATH, "/html/body/div[5]/div/div[1]/div[2]").text
        == "未命名文件"
    )
    assert (
        driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").text
        == "文件"
    )
    assert (
        driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[2]").text
        == "编辑"
    )
    assert (
        driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[3]").text
        == "代码"
    )

    # new
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[1]"
    ).click()
    driver.save_screenshot("report/screenshot/editor-new.png")

    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()

    # check the file submanue
    assert (
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[1]/span"
        ).text
        == "新建"
    )
    assert (
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[2]/span"
        ).text
        == "打开"
    )
    assert (
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[3]/span"
        ).text
        == "保存"
    )
    assert (
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[4]/span"
        ).text
        == "另存为"
    )
    assert (
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[5]/span"
        ).text
        == "关闭"
    )

    # open
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[2]"
    ).click()
    driver.save_screenshot("report/screenshot/editor-open.png")
    # driver.find_element(
    #     By.XPATH, "/html/body/div[7]/div/div[2]/div/div[4]/div[2]/button"
    # ).click()
    # driver.find_element(By.TAG_NAME, "cancel").click()

    # save
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[3]"
    ).click()
    driver.save_screenshot("report/screenshot/editor-save.png")
    driver.find_element(
        By.XPATH, "/html/body/div[7]/div/div[2]/div/div[4]/div[2]/button"
    ).click()

    # save as
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[4]"
    ).click()
    driver.save_screenshot("report/screenshot/editor-saveas.png")
    driver.find_element(
        By.XPATH, "/html/body/div[7]/div/div[2]/div/div[4]/div[2]/button"
    ).click()

    # close
    driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
    driver.find_element(
        By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[5]"
    ).click()
    driver.save_screenshot("report/screenshot/editor-close.png")

    
