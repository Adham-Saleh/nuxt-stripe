<template lang="pug">
    .container.bg-dark.vh-100.w-100.text-primary
        .row.px-5
            .flex.justify-content-end.p-5
                NuxtLink.btn.btn-primary.rounded-full(to="/stripe-checkout/create-product") Add product         
        .row.gap-5.justify-center.align-center
            .col-lg-3.col-md-4.bg-light.rounded-3.py-3.px-4(v-for="product in products?.products" :key="product?.name")
                span Name 
                p.ms-3.font-bold {{product?.name}}
                span price 
                p.ms-3.font-bold {{product?.price}}$
                button.btn.btn-primary.me-1.mt-2 add to cart
                button.btn.btn-outline-primary.mt-2(@click.prevent="handleCheckout(product)" :disabled="loading")
                  | {{loading ? 'loading..' : 'buy now'}}


</template>

<script setup lang="ts">
import type { ProductType } from "@/types/productsType";

const loading = ref<boolean>(false);

const { data: products, error } = useAsyncData("getProducts", async () => {
  const res = await $fetch("/api/products");
  return res;
});

const handleCheckout = async function (product: ProductType) {
  const line_items = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name, // Dynamic product name
        },
        unit_amount: product?.price * 100, // Amount in cents0
      },
      quantity: 1,
    },
  ];
  const { data: checkout, error } = await useAsyncData("checkout", async () => {
    const res = await $fetch("/api", {
      method: "POST",
      body: {
        cart: line_items,
      },
    });
    return res;
  });
  await navigateTo(checkout.value?.url, {
    external: true,
  });
};
</script>

<style scoped></style>
