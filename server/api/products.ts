import { ProductType } from "../../types/productsType";

let products = [] as ProductType[];

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    return {
      products,
    };
  }

  if (method === "POST") {
    const { product } = await readBody(event);
    products.push({ ...product, productId: "prod_ReEDT52atUNToG" });
    return {
      success: true,
      message: "product added successfully",
      product,
    };
  }

  if (method === "DELETE") {
    const { productName } = await readBody(event);
    products = products.filter((product) => product.name !== productName);
    return {
      success: true,
      message: "product deleted successfully",
    };
  }
});
