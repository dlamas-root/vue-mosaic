
<script setup lang="ts">
import VmIcon from '../VmIcon/VmIcon.vue';

defineOptions ({
    name: "VmBtn"
})

defineProps({
    label:{
        type: String,
        default: "button"
    },
    type: {
        type: String,
        default: "solid",
    }, //icon, flat, outlined, icon w/text, rounded, default is solid
    size: String,
    rounded: Boolean,
    icon: {
        type: String,
        default: '',
    },
    iconColor: {
        type: String,
        default: '',
    },
})

</script>

<template>
    <button v-if="type === 'icon'" class="vm-btn-icon" >
        <!-- <icon  /> -->icon
    </button>
    <button v-else :class="`vm-btn-${type}`" :rounded="rounded" >
        Button
    </button>
</template>

<style lang="scss">
button{
    padding: 8px 20px;
    font-size: 16px;
    text-transform: capitalize;
    border: none;
    border-radius: 4px;
    transition: all ease-in-out 0.2s;
    &:has(button.btn-rounded){
        border-radius: 50px;
    }
}
.vm-btn-solid{
    background-color: #BA4933;
    color: white,
}
.vm-btn-solid:hover{
    background-color: #9a3521;
}
.vm-btn-icon{
    background-color: #BA4933;
    color: white;
    border-radius: 30px;
}
.vm-btn-flat{
    background-color: rgba(255, 255, 255, 0);
    color: #BA4933,
}
.vm-btn-flat:hover{
    background-color: #ba493325;
}
.vm-btn-outlined{
    color: #BA4933;
    font-weight: 500;
    border: 2px solid #BA4933;
    background-color: rgba(255, 255, 255, 0);
}
.vm-btn-outlined:hover{
    background-color: #ba493325;
}
</style>