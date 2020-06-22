from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.keys import Keys
from setting_language import setting_language
from initialize_driver import init_driver
from initialize_driver import login_mule
from send_email_by_office import send_email_by_office


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

        # text = driver.find_element(
        #     By.XPATH,
        #     "/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span",
        # )

        element = driver.find_element_by_xpath(
            "/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span"
        )
        driver.execute_script(
            "arguments[0].innerText = 'class HelloWorld { public static void main( String []args ) { System.out.println( \"Hello World!\" );}}'",
            element,
        )
        time.sleep(2)
        #element.send_keys(Keys.CONTROL, "s")

        driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]").click()
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[1]/ul/li[3]"
        ).click()
        driver.find_element(
            By.XPATH, "/html/body/div[7]/div/div[2]/div/div[3]/input"
        ).send_keys("testHelloWorld.java")
        driver.find_element(
            By.XPATH, "/html/body/div[7]/div/div[2]/div/div[4]/div[1]/button"
        ).click()
        driver.find_element(By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[3]").click()
        driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[2]/div/ul/li[3]/ul/li[1]"
        ).click()
        # driver.find_element(By.XPATH, "/html/body/div[7]/div/div[2]/div/div/div/div[2]/canvas[4]").click()
        # #driver.find_element(By.XPATH, "/html/body/div[7]/div/div[2]/div/div/div/div[2]/canvas[4]").send_keys(Keys.SPACE)
        # time.sleep(2)
        # driver.find_element(By.XPATH, "//html/body/div[7]/div/div[1]/div[5]").click()
        send_email_by_office()

    def teardown__class(self):
        
        self.driver.close()
        



# driver.switch_to.frame('iframe')
# text.send_keys('Hello world again!')
# driver.execute_script(
#     text,"arguments[0].innerHTML = '<h1>Heading</h1>Yi Zeng'" ,
# )
# "arguments[0].value = 'class HelloWorld { public static void main( String []args ) { System.out.println( \"Hello World!\" );}}';",
# time.sleep(2)
# driver.find_element_by_xpath('/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span').send_keys('Hello world again!')
# print(str)
# js = "document.getElementsByClassName(\"view-line\")[0].innerHTML=\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\""
# "\"class HelloWorld { public static void main( String []args ) { System.out.println( \"Hello World!\" );}}\""
# driver.execute_script(js)
#
# print(
#     driver.find_element(
#         By.XPATH,
#         "/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span",
#     ).text
# )
# driver.find_element(
#     By.XPATH,"/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span",
#     #"/html/body/div[5]/div/div[2]/div/div/div/div",
#     #"/html/body/div[5]/div/div[2]/div/div/div",
#     #"/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]",
#     # "/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span",
# ).send_keys(
#     'class HelloWorld { public static void main( String []args ) { System.out.println( "Hello World!" );}}'
# )
# driver.find_element(By.CLASS_NAME, "view-line").send_keys(
#     'class HelloWorld { public static void main( String []args ) { System.out.println( "Hello World!" );}}'
# )
# driver.find_element(
#     By.XPATH,
#     "/html/body/div[5]/div/div[2]/div/div/div/div/div[1]/div[2]/div[1]/div[4]/div/span/span",
# ).send_keys(Keys.CONTROL, "c")

