
<script setup lang="ts">
import { onMounted, ref } from 'vue';


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
    }, // flat, outlined, icon w/text, rounded, default is solid
    size: String,
    rounded: Boolean,
    icon: String,
    color: String,
    iconSize: {
        type: Number || String,
        default: '18px'
    },
})

const iconColor = ref('');

onMounted(() => {
    if(type === 'flat' || type === 'outlined'){
        iconColor.value = '#BA4933';
    } else {
        iconColor.value = 'white';
    }
})

</script>

<template>
    <button v-if="icon" class="vm-btn-icon" :class="`vm-btn-icon-${type}`" >
        <span
            class="material-symbols-outlined"
            style="align-self: center"
            :style="{ fontSize: `${iconSize}px`, color: iconColor}"
        >
            {{ icon }}
        </span>
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
    &:has(span){
        border-radius: 100px;
    }
}
.vm-btn-solid{
    background-color: #BA4933;
    color: white,
}
.vm-btn-solid:hover{
    background-color: #9a3521;
}


// ICON BTN
.vm-btn-icon{
    background-color: #BA4933;
    color: white;
    border-radius: 40px;
    padding: 0.3rem 0.5rem;
}
.vm-btn-icon:hover{
    background-color: #9a3521;
}
.vm-btn-icon-flat{
    color: #BA4933;
    background-color: rgba(255, 255, 255, 0) !important;
}
.vm-btn-icon-flat:hover{
    background-color: #ba493325 !important;
}
.vm-btn-icon-outlined{
    color: #BA4933;
    font-weight: 500;
    border: 2px solid #BA4933;
    background-color: rgba(255, 255, 255, 0) !important;
}
.vm-btn-icon-outlined:hover{
    background-color: #ba493325 !important;
}


// FLAT BTN
.vm-btn-flat{
    background-color: rgba(255, 255, 255, 0);
}
.vm-btn-flat:hover{
    background-color: #ba493325;
}


// OUTLINED BTN
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