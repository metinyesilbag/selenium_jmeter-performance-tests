package uitests;


import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pageObjects.*;

import static pageObjects.BasePage.driver;

public class EightArticleTest {

    MenuObject menuObject;
    Article article;
    ArticleEight articleEight;

    @BeforeClass
    public void checkinURL() {
        if (!loggedin) {
            MenuObject menuObject = new MenuObject(driver);
            menuObject.assertSearchButtonVisible();
        }
    }

    @BeforeMethod
    public void setUp() {
        menuObject = new MenuObject(driver);
        article = new Article(driver);
        articleEight = new ArticleEight(driver);
    }

    @Test
    public void testStep1FormFilling(String search) {

        menuObject.clickSearchButton();
        menuObject.enterKesfetInput("İstanbul");
        article.clickEighthArticle();
        articleEight.verifyPageTitle("İletişim – 2N Haber");

    }
}
