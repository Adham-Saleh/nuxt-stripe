<template lang="pug">
  .container.vh-100.bg-dark
    .row.flex.h-100.items-center
      .header.font-bold.text-center.justify-center(class="lg:text-[72px] md:text-[62px]")
        h2.gradient-text The Easiest Nuxt-stripe Integration handle fullstack nuxt payments
        p.mt-2.text-secondary(class="lg:text-[36px] md:text-[16px]") An approcable and effortless way to learn nuxt-stripe
        .flex.gap-2.justify-center.mt-2.flex-wrap
          button.btn.btn-primary.rounded-full Get Started ->
          button.btn.btn-primary.rounded-full(@click="navigateTo('/stripe-checkout')") Stripe Checkout ->
          button.btn.btn-primary.rounded-full Payment Intent ->
          button.btn.btn-outline-primary.rounded-full Nuxt-stripe ->


</template>

<script setup lang="ts"></script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #27c92f, #0642db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
