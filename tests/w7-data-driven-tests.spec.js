import {test, expect} from '@playwright/test';
import TestDataHelper from '../utils/TestDataHelper';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';

test.describe('W7: Data-Driven Tests', () => {
    let loginPage;
    let productsPage;

    test.beforeEach(async ({page}) => {
        // intialize page objects
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        //navigate to login page
        await loginPage.navigate();
    });

    test('Login with different valid users', async ({page}) => {
        const userTypes = ['standard', 'problem', 'performance'];
        const standardUser = TestDataHelper.getValidUser(userTypes[0]);
        await loginPage.login(standardUser.username, standardUser.password);
        await expect(productsPage.pageTitle).toHaveText('Products');
    });

    TestDataHelper.getInvalidUsers().forEach((invalidUser) => {
        test(`Login fails with invalid user: ${invalidUser.username || 'Empty username'} `, async ({page}) => {
            await loginPage.login(invalidUser.username, invalidUser.password);

            //verify error message is displayed
            const isErrorVisible = await loginPage.isErrorDisplayed();
            expect(isErrorVisible).toBe(true);

            //verify error message content
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain(invalidUser.expectedError);
        });
    });

    test('Add a random product from test data', async ({page}) => {
        const standardUser = await TestDataHelper.getValidUser('standard');
        await loginPage.login(standardUser.username, standardUser.password);
        await expect(productsPage.pageTitle).toHaveText('Products');

        const randomProduct1 = TestDataHelper.getRandomProduct();
        const randomProduct2 = TestDataHelper.getRandomProduct();
        const randomProduct3 = TestDataHelper.getRandomProduct();

        await productsPage.addProductToCart(randomProduct1.dataTestId);
        await productsPage.addProductToCart(randomProduct2.dataTestId);
        await productsPage.addProductToCart(randomProduct3.dataTestId);   

        const cartItemsCount = await productsPage.getCartItemCount();
        expect(cartItemsCount).toBe(3);
    });

    test('Verify all products from test data are displayed', async ({page}) => {
        const standardUser = await TestDataHelper.getValidUser('standard');
        await loginPage.login(standardUser.username, standardUser.password);
        await expect(productsPage.pageTitle).toHaveText('Products');

        const expectedProducts = TestDataHelper.getProducts();
        const displayedProducts = await productsPage.getAllProductNames();

        // verify all expected products are displayed
        expectedProducts.forEach(product => {
            console.log(`Checking if product is displayed: ${product.name} - Displayed products: ${displayedProducts.join(', ')}`);
            expect(displayedProducts).toContain(product.name);
        });
    });

});