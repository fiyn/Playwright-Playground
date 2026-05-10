import {test, expect} from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

test.describe('W6: Page Object Model Tests', () => {
    let loginPage;
    let productsPage;
    let cartPage;

    test.beforeEach(async ({page}) => {
        //initialize page objects
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        //Navigate and login
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Add multiple products to cart using POM', async ({page}) => {
        // Add Products
        await productsPage.addProductToCart('sauce-labs-backpack');
        await productsPage.addProductToCart('sauce-labs-bike-light');
        await productsPage.addProductToCart('sauce-labs-bolt-t-shirt');

        //Verify cart count
        const cartCount = await productsPage.getCartItemCount();
        expect(cartCount).toBe(3);

        //Go to cart
        await productsPage.goToCart();

        //Verify items in cart
        const itemsInCart = await cartPage.getCartItemCount();
        expect(itemsInCart).toBe(3);
    });

    test('Remove product from cart using POM', async ({page}) => {
        // Add Product
        await productsPage.addProductToCart('sauce-labs-backpack');
        await productsPage.goToCart();

        // Remove Product
        await cartPage.removeItem('sauce-labs-backpack');

        // Verify cart is empty
        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBe(true);
    });

    test('Sort products and verify order using POM', async ({page}) => {
        // Sort products low to high
        await productsPage.sortProducts('lohi');

        // Get product prices and verify order
        const prices = await productsPage.getAllProductPrices();

        // Verify prices are in ascending order
        for (let i = 0; i < prices.length - 1; i++) {
            if (i > 0) {
                console.log(`Comparing ${prices[i - 1]} <= ${prices[i]}`);
                expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
            }
        }
    });

    test('End-to-end test: Add to cart, checkout, and verify order summary using POM', async ({page}) => {
        // Step 1: Add products
        await productsPage.addProductToCart('sauce-labs-backpack');
        await productsPage.addProductToCart('sauce-labs-bike-light');

        // Step 2: Verify cart badge
        expect(await productsPage.getCartItemCount()).toBe(2);

        // Step 3: Go to cart
        await productsPage.goToCart();

        // Step 4: Verify items
        const itemsInCart = await cartPage.getCartItemCount();
        expect(itemsInCart).toBe(2);

        // Step 5: Remove one item
        await cartPage.removeItem('sauce-labs-bike-light');

        // Step 6: Verify remaining item
        expect(await cartPage.getCartItemCount()).toBe(1);

        // Step 7: Proceed to checkout
        await cartPage.proceedToCheckout();
    });
});