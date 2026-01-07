# **Ecommerce**

---

## DESCRIPTIÓN.

**Main suffix: "/v1"**

## ENDPOINTS

### CART

📌 Get /cart

Get the user cart.

- Auth: true
- Params: N/A
- Body: N/A

📌 Post /cart/add-item

Add product to cart.

- Auth: true
- Params: N/A
- Body:
  ```ts
  productId: string;
  quantity: number;
  ```

📌 Delete /cart

Clean the user cart.

- Auth: true
- Params: N/A
- Body: N/A

📌 Delete /cart/remove-item:cartItemId

Remove a cart item.

- Auth: true
- Params:

```ts
cartItemId: string;
```

- Body: N/A
