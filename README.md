# **Ecommerce**

---

## 📌 **DESCRIPTIÓN.**

Main suffix: **"/v1"**

## 📌 **ENDPOINTS**

### **CART**

### ⚪ **GET** /cart

- **Description**: Get user cart. 📝
  - Method: GET
  - Route: /cart
  - Auth: true
  - Params: N/A
  - Body: N/A

### ⚪ **POST** /cart/add-item

- **Description**: Add product to cart. 📝
  - Method: POST
  - Route: /cart/add-item
  - Auth: true
  - Params: N/A
  - Body:
  ```ts
  productId: string;
  quantity: number;
  ```

### ⚪ **DELETE** /cart

- **Description**: Clean the user cart. 📝
  - Method: DELETE
  - Route: /cart
  - Auth: true
  - Params: N/A
  - Body: N/A

### ⚪ **DELETE** /cart/remove-item:cartItemId

- **Description**: Remove a cart item. 📝
  - Method: DELETE
  - Route: /cart/remove-item:cartItemId
  - Auth: true
  - Params:

  ```ts
  cartItemId: string;
  ```

  - Body: N/A
