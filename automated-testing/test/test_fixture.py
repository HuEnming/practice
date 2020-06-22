from selenium import webdriver
import pytest

@pytest.fixture(scope='module')
def test_setup():
    global driver
    driver = webdriver.Firefox(executable_path='/usr/local/home/u200601/Code/CS440/mule-system2/mule-test/common/web_driver/geckodriver')
    #driver = webdriver.Firefox(executable_path='/home/enming/Code/VsCodeWorkspace/CS440/mule-system2/mule-test/common/web_driver/geckodriver')
    driver.implicitly_wait(5)
    #driver.maximize_window()
    yield
    driver.close()
    driver.quit()

def test_login():
    driver.get('file:///usr/local/home/u200601/Code/CS440/mule-system2/bin/login-test.html')
    #driver.get('file:///home/enming/Code/CS440/mule-system2/bin/login-test.html')
    driver.find_element_by_id('data').send_keys('')
    driver.find_element_by_id('data').send_keys('{targetURL: "https://localhost/login", secret: "test_LTI_SECRET",oauth_consumer_key: "test_LTI_KEY",user_id: "1000",context_id: "1000",         lis_person_contact_email_primary: "some.user@email.ie", context_title: "Test Course Space (2018-19)",roles: "Instructor", tool_consumer_instance_guid: "2019.localhost", lis_person_name_full: "Some User", custom_role: "lecturer"} ')
    driver.find_element_by_id('testbutton').click()
    title = driver.title
    assert title == 'OS.js'





#driver = webdriver.Firefox(executable_path='../common/web_driver/geckodriver')

#driver.get('https://localhost/')