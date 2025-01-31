
<script setup lang="ts">
import { onMounted, ref } from 'vue';


defineOptions ({
    name: "VmBtn"
})

const props = defineProps({
    label:{
        type: String,
        default: "button"
    },
    type: {
        type: String,
        default: "solid",
    },
    size: {
        type: String || Number,
        default: 16,
    },
    rounded: {
        type: Boolean || String || Number,
        default: 30,
    },
    icon: String,
    color: String,
    iconSize: {
        type: Number || String,
        default: '18px'
    },
})

const iconColor = ref('');

onMounted(() => {
    if(props.type === 'flat' || props.type === 'outlined'){
        iconColor.value = '#BA4933';
    } else {
        iconColor.value = 'white';
    }
})

</script>

<template>
    <button v-if="icon" class="vm-btn-icon ripple" :class="`vm-btn-icon-${type}`" ref="tiBtn" v-on:click="animateRipple" >
        <span
            class="material-symbols-outlined"
            style="align-self: center"
            :style="{ fontSize: `${iconSize}px`, color: iconColor}"
        >
            {{ icon }}
        </span>
    </button>
    <button v-else :class="`vm-btn-${type} ripple`" :style="`border-radius: ${rounded}px; font-size: ${size}px;`" >
        {{ label }}
    </button>
</template>

<style lang="scss">
button{
    padding: 8px 20px;
    text-transform: capitalize;
    border: none;
    transition: all ease-in-out 0.2s;

    &:has(span){
        border-radius: 100px;
    }
}
.vm-btn-solid{
    background-color: #BA4933;
    color: white;

    &:hover{
        background-color: #9a3521;
    }
}


// ICON BTN
.vm-btn-icon{
    background-color: #BA4933;
    color: white;
    border-radius: 40px;
    padding: 0.3rem 0.5rem;

    &:hover{
        background-color: #9a3521;
    }
}
.vm-btn-icon-flat{
    color: #BA4933;
    background-color: rgba(255, 255, 255, 0) !important;

    &:hover{
        background-color: #ba493325 !important;
    }
}
.vm-btn-icon-outlined{
    color: #BA4933;
    font-weight: 500;
    border: 2px solid #BA4933;
    background-color: rgba(255, 255, 255, 0) !important;

    &:hover{
        background-color: #ba493325 !important;
    }
}


// FLAT BTN
.vm-btn-flat{
    background-color: rgba(255, 255, 255, 0);

    &:hover{
        background-color: #ba493325;
    }
}


// OUTLINED BTN
.vm-btn-outlined{
    color: #BA4933;
    font-weight: 500;
    border: 2px solid #BA4933;
    background-color: rgba(255, 255, 255, 0);

    &:hover{
        background-color: #ba493325;
    }
}

//RIPPLE EFFECT
.ripple {
    background-position: center;
    transition: background 0.8s;
    &:hover {
        background: #ba493325 radial-gradient(circle, transparent 1%, #ba49334f 1%) center/15000%;
    }
    &:active {
        background-color: #d77c6a;
        background-size: 100%;
        transition: background 0s;
    }

    &:has(.vm-btn-outlined, .vm-btn-flat){
        &:hover {
            background: #ba493325 radial-gradient(circle, transparent 1%, #ba49334f 1%) center/15000%;
        }
        &:active {
            background-color: #efab9e;
            background-size: 100%;
            transition: background 0s;
        }

    }
}
</style>