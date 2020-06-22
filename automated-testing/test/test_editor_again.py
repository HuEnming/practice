from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.keys import Keys
from setting_language import setting_language
from initialize_driver import init_driver
from initialize_driver import login_mule
from send_email import send_email


class Test_editor_running:
    def setup(self):
        self.driver = init_driver()
        login_mule(self.driver)
        setting_language(self.driver)

    # check running code
    def test_editor(self):
        driver = self.driver

        driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div").click()
        driver.find_element(By.XPATH, "/html/body/div[3]/div/ul/li[1]/div").click()
        time.sleep(1)
        driver.find_element(
            By.XPATH, "/html/body/div[3]/div/ul/li[1]/div/ul/li[1]/div"
        ).click()
        #/html/body/div[8]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span
        #/html/body/div[8]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span
        element = driver.find_element_by_xpath(
            "/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span"
        )
        driver.execute_script(
            "arguments[0].setAttribute('class', 'mtk1')",
            element,
        )
        driver.execute_script(
            "arguments[0].innerText = 'class HelloWorld { public static void main( String []args ) { System.out.println( \"Hello World!\" );}}'",
            element,
        )
        time.sleep(2)