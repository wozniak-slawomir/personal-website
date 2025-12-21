<script setup lang="ts">
import CalculatorContainer from '~/components/calculator/CalculatorContainer.vue';

useHead({
    title: 'Kalkulator Subskrypcji & Zombie-Check | Sławomir Woźniak',
    meta: [
        {
            name: 'description',
            content: 'Sprawdź, ile pieniędzy tracisz na nieużywanych subskrypcjach. Wykonaj darmowy audyt "Zombie-Check" i odzyskaj kontrolę nad finansami firmy.',
        },
    ],
});
</script>

<template>
    <div class="min-h-screen bg-[#1a1a1a] pt-32 pb-12">
        <CalculatorContainer />
    </div>
</template>
