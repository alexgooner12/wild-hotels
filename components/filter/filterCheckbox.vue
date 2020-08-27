<template>
    <div 
        class="filter-checkbox d-flex justify-content-between">
        <label :for="model.label" v-html="model.label" />
        <input class="pl-2 checkbox cursor-pointer" type="checkbox" :checked="checked" @click="change(model)" />
    </div>
</template>

<script>

export default {
    name: "FilterCheckbox",
    props: ['model', 'checked', 'filterName'],

    mounted() {
    },

    methods: {
        change(m) {
            this.$emit('getSelectedValues', { value: m, filterName: this.filterName });
        }
    }
}

</script>

<style lang="scss">
.filter-checkbox {
    & .checkbox {
        height: 20px;
    }
}
</style>