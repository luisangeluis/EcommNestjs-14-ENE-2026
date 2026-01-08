# **Ecommerce**

---

## **DESCRIPTIÓN.**

Main suffix: **"/v1"**

## **ENDPOINTS**

### **CART**

### 🔹**GET** /cart

Get user cart.

- Method: GET
  -Route:
- Auth: true
- Params: N/A
- Body: N/A

### 🔹**POST** /cart/add-item

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
