<template lang="pug">
    .container.bg-dark.text-primary.vh-100
        .row.flex.justify-center.pt-5
            .col-lg-4
                form(@submit.prevent="handleFormSubmit")
                    label.form-label Product name
                    input.form-control.rounded-full(placeholder="Name" v-model="name")
                    label.form-label.mt-2 Product price
                    input.form-control.rounded-full(placeholder="Price" v-model="price")
                    button.mt-2.btn.btn-primary.rounded-full(type="submit") Add product
</template>

<script setup lang="ts">
const name = ref<string>("");
const price = ref<number>();

const handleFormSubmit = async function () {
  const { data, error } = await useAsyncData("createdProduct", async () => {
    const res = await $fetch("/api/products", {
      method: "POST",
      body: {
        product: {
          name: name.value,
          price: price.value,
        },
      },
    });
    console.log(res);
    return res;
  });
  await navigateTo("/stripe-checkout");
};
</script>

<style scoped></style>
