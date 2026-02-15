<script setup lang="ts">
import CalculatorContainer from '~/components/calculator/CalculatorContainer.vue';

useHead({
    title: 'Kalkulator Strat Subskrypcyjnych | Sławomir Woźniak',
    meta: [
        {
            name: 'description',
            content: 'Sprawdź, ile Twoja firma traci na nieużywanych subskrypcjach. Wykonaj darmowy audyt kosztów i odzyskaj kontrolę nad finansami.',
        },
    ],
});
</script>

<template>
    <div class="min-h-screen pt-32 pb-12">
        <CalculatorContainer />
    </div>
</template>
